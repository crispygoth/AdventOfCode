class HullPainter
	attr_reader :hull

	def initialize(start_colour = 0)
		@hull = {0 => { 0 => start_colour }}
		@robot_x = 0
		@robot_y = 0
		@heading = 0     # 0 = up, 1 = right, 2 = down, 3 = left
	end

	def paint(input, output)
		loop do
			# populate the @hull array for this position if not already set
			@hull[@robot_x] ||= {}
			@hull[@robot_x][@robot_y] ||= nil

			# tell our brain what colour we're on
			input << (@hull[@robot_x][@robot_y] || 0)

			# now we should be told what to paint here, or if the brain is done we'll get nil
			paint = output.pop
			break if paint.nil?

			@hull[@robot_x][@robot_y] = paint

			# and now where to go
			if output.pop == 1 then
				@heading = (@heading + 1) % 4
			else
				@heading = (@heading - 1) % 4
			end

			case @heading
			when 0 then
				@robot_y -= 1
			when 1 then
				@robot_x += 1
			when 2 then
				@robot_y += 1
			when 3 then
				@robot_x -= 1
			end
		end

		self
	end

	def num_panels_painted
		@hull.values.map(&:values).flatten.compact.length
	end

	def to_s
		s = ''

		x_range = @hull.keys.minmax
		y_range = @hull.values.map(&:keys).flatten.minmax

		Range.new(*y_range).reduce('') { |s, y|
			s << Range.new(*x_range).reduce('') { |r, x|
				value = @hull[x].fetch(y, 0)
				r << ((value.nil? || value == 0) ? ' ' : '█')
			}
		       	s << "\n"
		}
	end
end
