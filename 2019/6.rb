#!/usr/bin/env ruby
#
# Advent of Code day 2 part 1
# https://adventofcode.com/2019/day/2

require_relative 'lib/orbit_map'

map = OrbitMap.new(File.new('6.input').readlines.map(&:chomp))
puts map.total_orbits
