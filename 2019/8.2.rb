#!/usr/bin/env ruby
#
# Advent of Code day 8 part 1
# https://adventofcode.com/2019/day/8

require_relative 'lib/space_image'

img = SpaceImage.new(25,6)
img.read(File.read('8.input'))

img.flatten.each do |line|
	puts line.map { |pixel| (pixel == 1) ? '█' : ' ' }.join('')
end
