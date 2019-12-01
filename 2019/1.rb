#!/usr/bin/env ruby
#
# Advent of Code part 1
# https://adventofcode.com/2019/day/1

puts File.new('1.input', :chomp => true).readlines.map { |line| (Integer(line) / 3).floor - 2 }.reduce(0, :+)
