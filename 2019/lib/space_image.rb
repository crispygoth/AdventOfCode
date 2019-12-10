class SpaceImage
	attr_reader :width, :height, :layers

	def initialize(width, height)
		@width = width
		@height = height
		@layers = []
	end

	def read(str)
		lines = str.chars.map(&:to_i).each_slice(@width)

		loop do
			@layers << @height.times.map { lines.next }
		end
	end

	def flatten
		@layers.reduce(@height.times.map { @width.times.map { 2 } }) do |result, layer|
			layer.each_with_index do |line, x|
				line.each_with_index do |pixel, y|
					next if result[x][y] != 2

					result[x][y] = pixel
				end
			end

			result
		end
	end
end
