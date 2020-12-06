using System;
using System.Linq;

namespace AoC
{
    class Day5 : IPuzzle
    {
        public string Part1(string[] input)
        {
            return input
                .Select(sc => DecodeSeatLocation(sc))
                .Max()
                .ToString();
        }

        public string Part2(string[] input)
        {
            var takenSeats = input.Select(sc => DecodeSeatLocation(sc));
            
            for (int row = 0; row < 128; row++)
            {
                for (int column = 0; column < 8; column++)
                {
                    int seatID = (row * 8) + column;

                    if (!takenSeats.Contains(seatID) && takenSeats.Contains(seatID + 1) && takenSeats.Contains(seatID - 1))
                    {
                        return seatID.ToString();
                    }
                }
            }

            throw new InvalidOperationException("Unable to find an empty seat");
        }

        public static int DecodeSeatLocation(string seatCode)
        {
            return (8 * BSPToInt(seatCode.Substring(0,7), 'F', 'B')) + BSPToInt(seatCode.Substring(7), 'L', 'R');
        }

        private static int BSPToInt(string input, char lower, char higher)
        {
            int min = 0,
                max = (int)(Math.Pow(2, input.Length) - 1);

            foreach (char ch in input)
            {
                int range = (max - min) + 1;

                if (ch == lower)
                {
                    max -= range / 2;
                }
                else if (ch == higher)
                {
                    min += range / 2;
                }
                else
                {
                    throw new ArgumentException($"{ch} is not a valid character", "input");
                }
            }

            return min;
        }
    }
}