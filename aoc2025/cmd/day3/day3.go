package main

import (
	"fmt"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
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


func Part1(input string) string {
	result := 0

	for line := range strings.Lines(input) {
		line = strings.Trim(line, "\r\n ")
		batteries := make([]int, len(line))
		for i, n := range strings.Split(line, "") {
			var err error
			batteries[i], err = strconv.Atoi(n)
			check(err)
		}
		tens := slices.Max(batteries[:len(batteries) - 1])
		tensIdx := slices.Index(batteries, tens)
		units := slices.Max(batteries[tensIdx + 1:])
		result += (tens * 10) + units
	}

	return strconv.FormatInt(int64(result), 10)
}
func Part2(input string) string {
	result := int64(0)

	for line := range strings.Lines(input) {
		line = strings.Trim(line, "\r\n ")
		batteries := make([]int, len(line))
		for i, n := range strings.Split(line, "") {
			var err error
			batteries[i], err = strconv.Atoi(n)
			check(err)
		}

		maxIdx := 0
		jolts := int64(0)
		for pos := 11; pos >= 0; pos-- {
			max := slices.Max(batteries[maxIdx:len(batteries) - pos])
			maxIdx = maxIdx + slices.Index(batteries[maxIdx:], max) + 1
			jolts += int64(math.Pow10(pos) * float64(max))
		}
		result += int64(jolts)
	}

	return strconv.FormatInt(int64(result), 10)
}
