#!/usr/bin/env ruby
#
# Advent of Code part 1
# https://adventofcode.com/2019/day/1

puts File.new('1.input', :chomp => true).readlines.map { |line|
	fuel = (Integer(line) / 3).floor - 2
	mass = fuel

	loop do
		fuelfuel = (mass / 3).floor - 2
		break unless fuelfuel > 0
		fuel += fuelfuel
		mass = fuelfuel
	end

	fuel
}.reduce(0, :+)
