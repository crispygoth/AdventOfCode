#!/usr/bin/env ruby
#
# Advent of Code day 13 part 1
# https://adventofcode.com/2019/day/13

require_relative 'lib/intcode'

brain = Intcode.load_from_file '13.input'
Thread.new { brain.run; brain.output.close }

display = []
loop do
	x = brain.output.pop
	break if x.nil?

	y = brain.output.pop
	tile = brain.output.pop

	display[x] ||= []
	display[x][y] = tile
end

puts display.map { |line| line.count(2) }.reduce(&:+)
