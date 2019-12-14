#!/usr/bin/env ruby
#
# Advent of Code day 12 part 1
# https://adventofcode.com/2019/day/12

require_relative 'lib/moon_tracker'

mt = MoonTracker.new(['<x=-6, y=2, z=-9>', '<x=12, y=-14, z=-4>', '<x=9, y=5, z=-6>', '<x=-1, y=-4, z=9>'])
1000.times { mt.time_step }

puts mt.total_energy
