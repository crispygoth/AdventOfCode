import { IDay } from "../IDay";

interface PacketHeader {
    version: number,
    type: PacketTypes,
}

interface LiteralValuePacket extends PacketHeader {
    value: bigint,
}

interface OperatorPacket extends PacketHeader {
    subpackets: Packet[],
}

enum PacketTypes {
    SUM = 0,
    PRODUCT = 1,
    MINIMUM = 2,
    MAXIMUM = 3,
    LITERAL = 4,
    GREATER = 5,
    LESS = 6,
    EQUAL = 7
}

type Packet = LiteralValuePacket | OperatorPacket

type ParseInstructions = { numberToParse: number, lengthToParse: number }

export class BinaryReader {
    private _bitPosition = 0;
    private _bytePosition = 0;
    private _bit = 8;
    private buffer: Buffer;

    constructor(input: string) {
        this.buffer = Buffer.from(input.padEnd(Math.ceil(input.length / 2) * 2, '0'), 'hex');
    }

    public get position(): number {
        return this._bitPosition;
    }

    public get length(): number {
        return this.buffer.byteLength * 8;
    }

    public read(bits: number): number {
        if (bits > 8) {
            let out = 0;
            let n = bits & -8;
            let msb = bits - n;
            if (msb > 0) {
                out = this._read(msb);
            }
            while (n > 0) {
                out = ((out << 8) | this._read(8)) >>> 0;
                n -= 8;
            }
            return out;
        } else {
            return this._read(bits);
        }
    }

    private _read(wordSize: number): number {
        let l = this._bit - wordSize,
            out: number;
        if (l >= 0) {
            this._bit = l;
            out = (this.buffer.readUInt8(this._bytePosition) >>> l) & ((1 << wordSize) - 1);
            if (l === 0) {
                this._bytePosition++;
                this._bit = 8;
            }
        } else {
            out = (this.buffer.readUInt8(this._bytePosition++) & ((1 << this._bit) - 1)) << -l;
            this._bit = 8 + l;
            out = out | (this.buffer.readUInt8(this._bytePosition) >>> this._bit);
        }
        this._bitPosition += wordSize;
        return out;
    }

    public readStruct(fields: [string, number][]): any {
        return fields.reduce((acc: any, [id, word]) => {
            return (acc[id] = this.read(word)), acc;
        }, {});
    }
}

export class Day16 {
    private rootPacket: Packet;

    constructor(hexInput: string) {
        const reader = new BinaryReader(hexInput);

        const parsePackets = (pi: ParseInstructions): Packet[] => {
            let packetsParsed = 0;
            const startPos = reader.position;
            const result: Packet[] = [];
            while (
                reader.position < reader.length
                && packetsParsed < pi.numberToParse
                && (reader.position - startPos) < pi.lengthToParse
            ) {
                const header: PacketHeader = reader.readStruct([["version", 3], ["type", 3]]);
                let packet: Packet;
                if (header.type == PacketTypes.LITERAL) {
                    packet = <LiteralValuePacket>header;
                    const packetValue: bigint[] = [];
                    var valueWord: number;

                    do {
                        valueWord = reader.read(5);
                        packetValue.push(BigInt(valueWord));
                    } while (valueWord & 0x10);

                    packet.value = packetValue.reduce(
                        (out, val) => (
                            BigInt(out << BigInt(4)) | (val & BigInt(0b1111))
                        ),
                        BigInt(0)
                    );
                } else {
                    packet = <OperatorPacket>header;
                    if (reader.read(1) == 0) {
                        const subPacketLength = reader.read(15);
                        packet.subpackets = parsePackets({ lengthToParse: subPacketLength, numberToParse: Infinity });
                    } else {
                        const numSubPackets = reader.read(11);
                        packet.subpackets = parsePackets({ lengthToParse: Infinity, numberToParse: numSubPackets });
                    }
                }
                packetsParsed++;
                result.push(packet);
            }

            return result;
        }

        this.rootPacket = parsePackets({ lengthToParse: Infinity, numberToParse: 1 }).pop()!;
    }
    step1(): number {
        const sumVersions = (val: number, packet: Packet) => {
            if (packet.type != PacketTypes.LITERAL) {
                val += (<OperatorPacket>packet).subpackets.reduce(sumVersions, 0);
            }
            return val + packet.version;
        };
        return sumVersions(0, this.rootPacket);
    }
    step2(): bigint {
        const processPacket = (packet: Packet): bigint => {
            if (packet.type == PacketTypes.LITERAL) {
                return (<LiteralValuePacket>packet).value;
            }
            packet = <OperatorPacket>packet;
            const subPacketValues: bigint[] = packet.subpackets.map(processPacket);
            switch (packet.type) {
                case PacketTypes.MINIMUM:
                    return subPacketValues.reduce((out, val) => (out < val ? out : val));
                case PacketTypes.MAXIMUM:
                    return subPacketValues.reduce((out, val) => (out > val ? out : val));
                case PacketTypes.SUM:
                    return subPacketValues.reduce((acc, curr) => acc + curr, BigInt(0));
                case PacketTypes.PRODUCT:
                    return subPacketValues.reduce((acc, curr) => acc * curr, BigInt(1));
                case PacketTypes.GREATER:
                    return (subPacketValues[0] > subPacketValues[1]) ? BigInt(1) : BigInt(0);
                case PacketTypes.LESS:
                    return (subPacketValues[0] < subPacketValues[1]) ? BigInt(1) : BigInt(0);
                case PacketTypes.EQUAL:
                    return (subPacketValues[0] == subPacketValues[1]) ? BigInt(1) : BigInt(0);
            }

            throw new Error('unknown packet type ' + packet.type.toString());
        }

        return processPacket(this.rootPacket);
    }

}