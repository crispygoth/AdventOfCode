require "intcode"

describe Intcode do
	[
		{:program => [1,9,10,3,2,3,11,0,99,30,40,50], :final_ram => [3500,9,10,70,2,3,11,0,99,30,40,50], :input => [], :output => []},
		{:program => [1,0,0,0,99], :final_ram => [2,0,0,0,99], :input => [], :output => []},
		{:program => [2,3,0,3,99], :final_ram => [2,3,0,6,99], :input => [], :output => []},
		{:program => [2,4,4,5,99,0], :final_ram => [2,4,4,5,99,9801], :input => [], :output => []},
		{:program => [1,1,1,4,99,5,6,0,99], :final_ram => [30,1,1,4,2,5,6,0,99], :input => [], :output => []},
		{:program => [3,3,99], :input => [1], :output => [], :final_ram => [3,3,99,1]},
		{:program => [4,0,99], :input => [], :output => [4], :final_ram => [4,0,99]},
		{:program => [3,0,4,0,99], :input => [1], :output => [1], :final_ram => [1,0,4,0,99]},
		{:program => [1002,4,3,4,33], :input => [], :output => [], :final_ram => [1002,4,3,4,99]},
		{:program => [1101,100,-1,4,0], :input => [], :output => [], :final_ram => [1101,100,-1,4,99]},
		# Using position mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
		{:program => [3,9,8,9,10,9,4,9,99,-1,8], :input => [8], :output => [1], :final_ram => nil},
		{:program => [3,9,8,9,10,9,4,9,99,-1,8], :input => [7], :output => [0], :final_ram => nil},
		# Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
		{:program => [3,9,7,9,10,9,4,9,99,-1,8], :input => [8], :output => [0], :final_ram => nil},
		{:program => [3,9,7,9,10,9,4,9,99,-1,8], :input => [7], :output => [1], :final_ram => nil},
		# Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
		{:program => [3,3,1108,-1,8,3,4,3,99], :input => [8], :output => [1], :final_ram => nil},
		{:program => [3,3,1108,-1,8,3,4,3,99], :input => [9], :output => [0], :final_ram => nil},
		# Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
		{:program => [3,3,1107,-1,8,3,4,3,99], :input => [8], :output => [0], :final_ram => nil},
		{:program => [3,3,1107,-1,8,3,4,3,99], :input => [6], :output => [1], :final_ram => nil},
		# Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero:
		{:program => [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], :input => [0], :output => [0], :final_ram => nil}, # (using position mode)
		{:program => [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], :input => [2], :output => [1], :final_ram => nil}, # (using position mode)
		{:program => [3,3,1105,-1,9,1101,0,0,12,4,12,99,1], :input => [0], :output => [0], :final_ram => nil},      # (using immediate mode)
		{:program => [3,3,1105,-1,9,1101,0,0,12,4,12,99,1], :input => [99], :output => [1], :final_ram => nil},     # (using immediate mode)
		# Output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8.
		{
			:program => [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],
			:input => [4], :output => [999], :final_ram => nil,
		},
		{
			:program => [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],
			:input => [8], :output => [1000], :final_ram => nil,
		},
		{
			:program => [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],
			:input => [14], :output => [1001], :final_ram => nil,
		},
	].each do |test|
		describe "given #{test[:program]} and input #{test[:input]}" do
			it "finishes with ram state #{test[:final_ram]} and output #{test[:output]}" do
				ic = Intcode.new(test[:program], test[:input])
				ic.run
				unless test[:final_ram].nil? then
					expect(ic.ram).to eq(test[:final_ram])
				end
				expect(ic.output).to eq(test[:output])
			end
		end
	end
end
