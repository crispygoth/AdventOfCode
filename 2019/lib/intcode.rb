# Advent of Code day 2 part 1
# https://adventofcode.com/2019/day/2

class Intcode
	attr_reader :ram

	def initialize(program)
		@ram = program
		@pc = 0
	end

	def run
		while @pc < @ram.length
			case @ram[@pc]
			when 1		# add
				input1pos = @ram[@pc + 1]
				input2pos = @ram[@pc + 2]
				destpos = @ram[@pc + 3]
				
				@ram[destpos] = @ram[input1pos] + @ram[input2pos]
				@pc += 4
			when 2		# multiply
				input1pos = @ram[@pc + 1]
				input2pos = @ram[@pc + 2]
				destpos = @ram[@pc + 3]
				
				@ram[destpos] = @ram[input1pos] * @ram[input2pos]
				@pc += 4
			when 99		# fin
				return
			end
		end
	end	
end
