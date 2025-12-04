package main

import (
	"testing"
)

var input = `987654321111111
811111111111119
234234234234278
818181911112111`

func TestPart1(t *testing.T) {
	actual := Part1(input)
	expected := "357"
	if actual != expected {
		t.Errorf(`Part1(input) = %q, want %q`, actual, expected)
	}
}
func TestPart2(t *testing.T) {
	actual := Part2(input)
	expected := "3121910778619"
	if actual != expected {
		t.Errorf(`Part2(input) = %q, want %q`, actual, expected)
	}
}
