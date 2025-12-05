package main

import (
	"fmt"
	"iter"
	"os"
	"strconv"

	map2d "github.com/crispygoth/AdventOfCode/aoc2025/internal"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	input, err := os.ReadFile(os.Args[1])
	check(err)

	fmt.Println(Part1(string(input)))
	fmt.Println(Part2(string(input)))
}

func removableRolls(m map2d.Map2D) iter.Seq[map2d.Point2D] {
	return func(yield func(map2d.Point2D) bool) {
		for p, pv := range m.AllPoints() {
			if pv != '@' {
				continue
			}
			occupied := 0
			for _, nv := range m.Neighbours(p) {
				if nv == '@' {
					occupied++
					if occupied == 4 {
						break
					} 
				}
			}
			if occupied < 4 {
				if !yield(p) {
					return
				}
			}
		}

	}
}

func Part1(input string) string {
	result := 0
	m := map2d.FromString(input)
	for range removableRolls(m) {
		result++
	}
	
	return strconv.FormatInt(int64(result), 10)
}
func Part2(input string) string {
	result := 0
	m := map2d.FromString(input)
	for {
		removed := 0
		for p := range removableRolls(m) {
			m.Set(p, 'x')
			removed++
			result++
		}
		if removed == 0 {
			break
		}
	}

	return strconv.FormatInt(int64(result), 10)
}
