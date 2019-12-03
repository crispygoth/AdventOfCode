# Determine the Manhatten Distance between the intersections of two crossed wires
class CrossedWires
	def initialize(input)
		@wires = input.map { |wire| wire.split(',') }
	end

	def paths
		@wires.map { |wire|
			path = WirePath.new
			wire.each { |move| path.move(move) }
			path
		}
	end

	def shortest_manhatten_distance
		points_visited = paths
		(points_visited[0] & points_visited[1]).map { |point|
			point[:x].abs + point[:y].abs
		}.min
	end

	def shortest_path
		points_visited = paths
		(points_visited[0] & points_visited[1]).map { |point|
			points_visited[0].index(point) + points_visited[1].index(point) + 2   # +2 because both arrays are off by one
		}.min
	end
end

class WirePath < Array
	attr_reader :x, :y

	def initialize
		@x = 0
		@y = 0
	end

	def move(move)
		x_dir = 0
		y_dir = 0

		case move[0]
		when 'U'
			y_dir = 1
		when 'D'
			y_dir = -1
		when 'R'
			x_dir = 1
		when 'L'
			x_dir = -1
		end

		Integer(move[1..-1]).times do
			@x += x_dir
			@y += y_dir

			self << { :x => @x, :y => @y }
		end
	end
end
