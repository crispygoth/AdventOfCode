package main

import (
	"fmt"
	"os"
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
	zeros := 0
	dial := int64(50)

	for line := range strings.Lines(input) {
		n, err := strconv.ParseInt(strings.Trim(line[1:], "\r\n"), 10, 64)
		check(err)

		switch line[0] {
		case 'L':
			dial -= n
			for dial < 0 {
				dial += 100
			}
		case 'R':
			dial = (dial + n) % 100
		}
		if dial == 0 {
			zeros++
		}
	}
	return strconv.FormatInt(int64(zeros), 10)
}
func Part2(input string) string {
	zeros := 0
	dial := int64(50)

	for line := range strings.Lines(input) {
		n, err := strconv.ParseInt(strings.Trim(line[1:], "\r\n"), 10, 64)
		check(err)

		for n > 0 {
			n--
			switch line[0] {
			case 'L':
				dial--
			case 'R':
				dial++
			}
			switch dial {
			case 0:
				zeros++
			case -1:
				dial = 99
			case 100:
				dial = 0
				zeros++
			}
		}
	}
	return strconv.FormatInt(int64(zeros), 10)
}
