package day2

import (
	"strconv"
	"strings"

	"github.com/crispygoth/AdventOfCode/2021/common"
)

func Step1(filename string) (int, error) {
	input, err := common.ReadFile(filename)
	if err != nil {
		return 0, err
	}

	hpos := 0
	depth := 0

	for _, line := range input {
		command := strings.Fields(line)
		param, err := strconv.Atoi(command[1])
		if err != nil {
			return 0, err
		}
		switch command[0] {
		case "forward":
			hpos += param
		case "down":
			depth += param
		case "up":
			depth -= param
		}
	}
	return (hpos * depth), nil
}

func Step2(filename string) (int, error) {
	input, err := common.ReadFile(filename)
	if err != nil {
		return 0, err
	}

	hpos := 0
	depth := 0
	aim := 0

	for _, line := range input {
		command := strings.Fields(line)
		param, err := strconv.Atoi(command[1])
		if err != nil {
			return 0, err
		}
		switch command[0] {
		case "forward":
			hpos += param
			depth += aim * param
		case "down":
			aim += param
		case "up":
			aim -= param
		}
	}
	return (hpos * depth), nil
}
