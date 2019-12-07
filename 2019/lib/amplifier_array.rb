require_relative 'intcode'

class AmplifierArray
	def self.find_best_phase_setting(program, feedback_loop = false)
		all_phase_settings = (feedback_loop ? (5..9) : (0..4)).to_a.permutation

		all_phase_settings.map { |phase_setting|
			aa = self.new(program, phase_setting, feedback_loop)
			aa.run
			{ :phase_setting => phase_setting, :output => aa.output.pop }
		}.max_by { |result| result[:output] }
	end

	def initialize(program, phase_setting, feedback_loop = false)
		last_output = []

		@amplifiers = phase_setting.collect do |phase|
			last_output << phase

			ic = Intcode.new(program, last_output)
			last_output = ic.output
			ic
		end

		if feedback_loop then
			@amplifiers.last.output = @amplifiers.first.input
		end
	end

	def output
		@amplifiers.last.output
	end

	def run
		# initial input for first amplifier should be zero
		@amplifiers[0].input << 0

		@amplifiers.collect { |amp| Thread.new { amp.run } }.each(&:join)
	end
end
