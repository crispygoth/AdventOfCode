package day1

import (
	"strconv"

	"github.com/crispygoth/AdventOfCode/2021/common"
)

func Step1(filename string) (int, error) {
	last := 0
	result := -1
	input, err := common.ReadFile(filename)
	if err != nil {
		return 0, err
	}

	for _, line := range input {
		n, err := strconv.Atoi(line)
		if (err != nil) {
			return 0, err
		}
		if (n > last) {
			result++
		}
		last = n
	}
	return result, nil
}

func Step2(filename string) (int, error) {
	input, err := common.ReadFile(filename)
	if err != nil {
		return 0, err
	}

	last := 0
	result := -1

	for lineNo := 0; lineNo < len(input) - 2; lineNo++ {
		window := 0
		for offset := 0; offset < 3; offset++ {
			n, err := strconv.Atoi(input[lineNo+offset])
			if (err != nil) {
				return 0, err
			}
			window += n
		}
		if (window > last) {
			result++
		}
		last = window
	}
	return result, nil
}
