#!/usr/bin/env ruby
#
# Advent of Code day 13 part 1
# https://adventofcode.com/2019/day/13

require_relative 'lib/intcode'

brain = Intcode.load_from_file '13.input'
brain.ram[0] = 2
Thread.new { brain.run; brain.output.close }

score = nil
ball_x = nil
paddle_x = nil
display = []
move = false

loop do
	x = brain.output.pop
	y = brain.output.pop
	tile = brain.output.pop
puts [x,y,tile].to_s
	break if x.nil?

	if x == -1 and y == 0 then
		score = tile
	else
		paddle_x = x if tile == 3
		ball_x = x if tile == 4

		display[x] ||= []
		display[x][y] = tile
	end

	# score is set last after the initial display state is set
	next if score.nil?

	# move paddle towards ball
	unless ball_x.nil? or paddle_x.nil? then
		joystick_pos = (ball_x <=> paddle_x)
		brain.input << joystick_pos
		ball_x = nil
		paddle_x = nil unless joystick_pos == 0
	end
	break if brain.output.closed? and brain.output.empty?
end

puts display.map(&:to_s).join("\n")

puts score
