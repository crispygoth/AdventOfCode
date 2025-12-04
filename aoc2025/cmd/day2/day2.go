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

type IdRange struct {
	start int
	end   int
}

func ParseInput(input string) []IdRange {
	var idranges []IdRange

	for _, ids := range strings.Split(strings.Trim(input, "\r\n"), ",") {
		bounds := strings.Split(ids, "-")

		start, err := strconv.ParseInt(bounds[0], 10, 0)
		check(err)
		end, err := strconv.ParseInt(bounds[1], 10, 0)
		check(err)

		idranges = append(idranges, IdRange{start: int(start), end: int(end)})
	}
	return idranges
}

func Part1(input string) string {
	result := 0
	for _, r := range ParseInput(input) {
		for n := r.start; n <= r.end; n++ {
			ns := strconv.FormatInt(int64(n), 10)
			firstHalf := ns[:len(ns)/2]
			secondHalf := ns[len(ns)/2:]
			if firstHalf == secondHalf {
				result += n
			}
		}
	}

	return strconv.FormatInt(int64(result), 10)
}
func Part2(input string) string {
	result := 0
	for _, r := range ParseInput(input) {
		for n := r.start; n <= r.end; n++ {
			ns := strconv.FormatInt(int64(n), 10)
			for ln := 1; ln <= len(ns)/2; ln++ {
				if len(ns)%ln != 0 {
					continue
				}
				match := true
				check := ns[:ln]
				for start := ln; start < len(ns); start += ln {
					if ns[start:start+ln] != check {
						match = false
						break
					}
				}
				if match {
					result += n
					break
				}
			}
		}
	}

	return strconv.FormatInt(int64(result), 10)
}
