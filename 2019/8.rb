#!/usr/bin/env ruby
#
# Advent of Code day 8 part 1
# https://adventofcode.com/2019/day/8

require_relative 'lib/space_image'

img = SpaceImage.new(25,6)
img.read(File.read('8.input'))

check_layer = img.layers.min_by do |layer|
	layer.reduce(0) { |memo, line| memo + line.count(0) }
end

puts (check_layer.reduce(0) { |memo, line| memo + line.count(1) }) * (check_layer.reduce(0) { |memo, line| memo + line.count(2) })
