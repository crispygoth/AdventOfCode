#!/usr/bin/env ruby
#
# Advent of Code day 2 part 1
# https://adventofcode.com/2019/day/2

require_relative 'lib/intcode'

prog = File.new('5.input').gets.split(',').map(&:to_i)

ic = Intcode.new(prog, [5])
ic.run
puts ic.output.to_s
