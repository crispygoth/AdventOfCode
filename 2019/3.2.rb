#!/usr/bin/env ruby
#
# Advent of Code day 3 part 1
# https://adventofcode.com/2019/day/3

require_relative 'lib/crossed_wires'

puts CrossedWires.new(File.new('3.input', :chomp => true).readlines).shortest_path
