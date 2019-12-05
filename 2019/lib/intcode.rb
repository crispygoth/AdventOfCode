# Advent of Code day 2 part 1
# https://adventofcode.com/2019/day/2

class Intcode
	attr_reader :ram, :output

	def initialize(program, input = [])
		@ram = program
		@pc = 0
		@input = input
		@output = []
	end

	def run
		operations = [nil] # no operation zero

		# operation 1: add
		operations << Operation.new(2, 1, &:+)

		# operation 2: multiply
		operations << Operation.new(2, 1, &:*)

		# operation 3: takes a single integer as input and saves it to the position given by its only parameter
		operations << Operation.new(0, 1) { @input.shift }

	        # operation 4 outputs the value of its only parameter
		operations << Operation.new(1, 0) { |val| @output << val }

		# operation 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
		operations << Operation.new(2, 0) { |test, dest| @pc = dest if test != 0 }

		# operation 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
		operations << Operation.new(2, 0) { |test, dest| @pc = dest if test == 0 }

		# operation 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
		operations << Operation.new(2, 1) { |a, b| if a < b then 1 else 0 end }

		# operation 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
		operations << Operation.new(2, 1) { |a, b| if a == b then 1 else 0 end }

		# operation 99: halt
		operations[99] = Operation.new(0, 0) { return }

		while @pc < @ram.length
			opcode = @ram[@pc] % 100
			param_modes = @ram[@pc] / 100
			operation = operations[opcode]
			@pc += 1

			in_param_values = (1..operation.in_params).collect do
				case param_modes % 10
				when 0		# position mode: contents of ram points to memory location
					val = @ram[@ram[@pc]]
				when 1		# immediate mode: contents of ram is the param
					val = @ram[@pc]
				else
					raise 'invalid input param mode %i' % (param_modes % 10)
				end
				param_modes /= 10
				@pc += 1
				val
			end
			out_positions = (1..operation.out_params).collect do
				case param_modes % 10
				when 0		# position mode: contents of ram are the memory location to write to
					pos = @ram[@pc]
				else
					raise 'invalid output param mode %i' % (param_modes % 10)
				end
				param_modes /= 10
				@pc += 1
				pos
			end

			op_output = Array(operation.proc.call(*in_param_values))
			if op_output.length < out_positions.length then
				raise 'too few outputs for %i, expected %i, got %s' % [opcode, operation.out_params, op_output.to_s]
			end

			out_positions.each do |pos|
				@ram[pos] = op_output.shift
			end
		end
	end
end

class Operation
	attr_reader :in_params, :out_params, :proc

	def initialize(in_params, out_params, &block)
		@in_params = in_params
		@out_params = out_params
		@proc = block
	end
end
