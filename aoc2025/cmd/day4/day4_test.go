package main

import (
	"testing"
)

var input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

func TestPart1(t *testing.T) {
	actual := Part1(input)
	expected := "13"
	if actual != expected {
		t.Errorf(`Part1(input) = %q, want %q`, actual, expected)
	}
}
func TestPart2(t *testing.T) {
	actual := Part2(input)
	expected := "43"
	if actual != expected {
		t.Errorf(`Part2(input) = %q, want %q`, actual, expected)
	}
}
