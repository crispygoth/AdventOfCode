class AsteroidField
	attr_reader :asteroids

	def initialize(map)
		@asteroids = map.map.with_index { |row, y|
			row.each_char.map.with_index do |char, x|
				if char == '#' then { :x => x, :y => y } else nil end
			end
		}.reduce(:+).compact

		@asteroids.each { |src|
			src[:paths] = @asteroids.map { |dst|
				if src != dst then
					[{ :x => dst[:x], :y => dst[:y] }, Math.atan2(dst[:y] - src[:y], dst[:x] - src[:x])]
				end
			}.compact.to_h

			src[:visible] = src[:paths].values.uniq.length
		}
	end

	def max_visible
		@asteroids.max_by { |a| a[:visible] }
	end

	def pew_pew_pew
		laser_location = max_visible
		laser_paths = laser_location[:paths].safe_invert

		laser_paths = laser_paths.map { |angle, asteroids|
			[angle, asteroids.sort_by { |asteroid| Math.hypot(asteroid[:x] - laser_location[:x], asteroid[:y] - laser_location[:y]) }]
		}.to_h


		# sort angles by when they will be hit by the laser
		hits = laser_paths.keys.sort_by { |angle|
			if angle >= -Math::PI/2 then   # -pi/2 is straight up
				angle + Math::PI/2
			else                           # -PI to -PI/2 quarter is hit last
				(2 * Math::PI) + (angle + Math::PI/2)
			end
		}

		vaporised = []

		until vaporised.length == @asteroids.length - 1 do
			hits.each do |angle|
				next if laser_paths[angle].empty?
				vaporised << laser_paths[angle].shift
			end

		end

		vaporised
	end

end

class Hash
	# like invert but not lossy
	# {"one"=>1,"two"=>2, "1"=>1, "2"=>2}.safe_invert => {1=>["one", "1"], 2=>["two", "2"]} 
	def safe_invert
		each_with_object({}) do |(key,value),out| 
			out[value] ||= []
			out[value] << key
		end
	end
end
