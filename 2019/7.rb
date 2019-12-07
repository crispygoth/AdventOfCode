#!/usr/bin/env ruby
#
# Advent of Code day 7 part 1
# https://adventofcode.com/2019/day/7

require_relative 'lib/amplifier_array'

prog = File.new('7.input').gets.split(',').map(&:to_i)

puts AmplifierArray.find_best_phase_setting(prog)
