package main

import (
	"testing"
)

var input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

func TestPart1(t *testing.T) {
	actual := Part1(input)
	if actual != "3" {
		t.Errorf(`Part1(input) = %q, want 3`, actual)
	}
}

func TestPart2(t *testing.T) {
	actual := Part2(input)
	if actual != "6" {
		t.Errorf(`Part2(input) = %q, want 6`, actual)
	}
}