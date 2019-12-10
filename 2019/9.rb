#!/usr/bin/env ruby
#
# Advent of Code day 9 part 1
# https://adventofcode.com/2019/day/9

require_relative 'lib/intcode'

prog = File.new('9.input').gets.split(',').map(&:to_i)

ic = Intcode.new(prog, [1])
ic.run
puts ic.output.to_s
