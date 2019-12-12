#!/usr/bin/env ruby
#
# Advent of Code day 10 part 1
# https://adventofcode.com/2019/day/10

require_relative 'lib/asteroid_field'

puts AsteroidField.new(File.new('10.input').readlines.map(&:chomp)).max_visible
