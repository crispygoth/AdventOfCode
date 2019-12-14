class MoonTracker
	attr_reader :moons, :step

	def initialize(moons)
		@moons = moons.map { |moon| Moon.new(moon) }
		@step = 0
	end

	def time_step
		# apply gravity
		@moons.permutation(2) do |moonpair|
			moonpair[0].gravitate(moonpair[1])
		end

		# apply velocity
		@moons.each(&:move)

		@step += 1
	end

	def total_energy
		@moons.map(&:energy).reduce(&:+)
	end

	def find_repeat
		cycles = {}
		initial_moons = @moons.map(&:clone)

		while cycles.length < 3 do
			time_step

			(['x', 'y', 'z'] - cycles.keys).each do |dim|
				next if @moons.map(&"v#{dim}".to_sym).any? { |v| v != 0 }

				next unless @moons.each_with_index.all? { |moon, n| moon.send(dim.to_sym) == initial_moons[n].send(dim.to_sym) }

				cycles[dim] = @step
			end
		end

		cycles.values.reduce(&:lcm)
	end
end

class Moon
	attr_reader :x, :y, :z
	attr_reader :vx, :vy, :vz

	def initialize(moon)
		if moon.kind_of? String then
			if m = moon.match(/<x=([0-9-]+), y=([0-9-]+), z=([0-9-]+)>/) then 
				@x = m[1].to_i
				@y = m[2].to_i
				@z = m[3].to_i
			else
				raise "invalid moon string '#{moon}'"
			end
		else
			@x = moon[:x]
			@y = moon[:y]
			@z = moon[:z]
		end

		@vx = 0
		@vy = 0
		@vz = 0
	end

	def to_s
		"<x=%i, y=%i, z=%i>" % [@x, @y, @z]
	end

	def to_h
		{ :x => @x, :y => @y, :z => @z, :vx => @vx, :vy => @vy, :vz => @vz }
	end

	def hash
		to_h.hash
	end

	def gravitate(moon)
		@vx += moon.x <=> @x
		@vy += moon.y <=> @y
		@vz += moon.z <=> @z
		self
	end

	def move
		@x += @vx
		@y += @vy
		@z += @vz
	end

	def energy
		(@x.abs + @y.abs + @z.abs) * (@vx.abs + @vy.abs + @vz.abs)
	end
end
