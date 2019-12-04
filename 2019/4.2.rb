#!/usr/bin/env ruby
#
# Advent of Code day 4 part 2
# https://adventofcode.com/2019/day/4

is_valid = lambda do |test|
	# there must be at least one number that appears exactly twice
	# the next check implicitly tests that they're consecutive
	return false unless (0..9).map { |n| test.to_s.each_char.count(n.to_s) }.include? 2

	test.to_s.each_char.reduce(0) do |prev, curr|
		# all numbers must be >= the previous one
		return false unless curr.to_i >= prev.to_i

		curr
	end

	true
end

puts "test cases: %s" % [112233, 123444, 111122].map(&is_valid).to_s

puts "puzzle input: %i" % (272091..815432).select(&is_valid).count
