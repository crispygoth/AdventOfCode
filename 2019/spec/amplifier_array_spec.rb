require 'amplifier_array'

describe AmplifierArray do
	[
		{ :feedback_loop => false, :program => [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0], :phase_setting => [4,3,2,1,0], :output => 43210 },
		{ :feedback_loop => false, :program => [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0], :phase_setting => [0,1,2,3,4], :output => 54321 },
		{ :feedback_loop => false, :program => [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0], :phase_setting => [1,0,4,3,2], :output => 65210 },

		{ :feedback_loop => true,  :program => [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5], :phase_setting => [9,8,7,6,5], :output => 139629729 },
		{
			:feedback_loop => true,
			:program => [
				3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
				-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
				53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10
			],
			:phase_setting => [9,7,8,5,6],
			:output => 18216,
		},
	].each do |test|
		describe "program #{test[:program]} with phase settings #{test[:phase_setting]}" do
		       it "returns #{test[:output]}" do
			       aa = AmplifierArray.new(test[:program], test[:phase_setting], test[:feedback_loop])
			       aa.run
			       expect(aa.output.pop).to eq(test[:output])
		       end

		       it "finds the best phase setting" do
			       result = AmplifierArray.find_best_phase_setting(test[:program], test[:feedback_loop])
			       test.delete(:program)
			       test.delete(:feedback_loop)
			       expect(result).to eq(test)
		       end
		end
	end
end
