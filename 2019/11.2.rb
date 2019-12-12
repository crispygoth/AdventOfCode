#!/usr/bin/env ruby
#
# Advent of Code day 11 part 2
# https://adventofcode.com/2019/day/11

require_relative 'lib/intcode'
require_relative 'lib/hull_painter'

brain = Intcode.load_from_file '11.input'
Thread.new { brain.run; brain.output.close }

hp = HullPainter.new(1)
hp.paint(brain.input, brain.output)

puts hp.to_s
