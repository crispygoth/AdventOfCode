#!/usr/bin/env ruby
#
# Advent of Code day 4 part 1
# https://adventofcode.com/2019/day/4

is_valid = lambda do |test|
	# must have at least one double
	return false unless test.to_s =~ /(\d)\1/

	test.to_s.each_char.reduce(0) do |prev, curr|
		# all numbers must be >= the previous one
		return false unless curr.to_i >= prev.to_i

		curr
	end

	true
end

puts "test cases: %s" % [111111, 223450, 123789].map(&is_valid).to_s

puts "puzzle input: %i" % (272091..815432).select(&is_valid).count
