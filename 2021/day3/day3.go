package day3

import (
	"errors"
	"strconv"
	"strings"

	"github.com/crispygoth/AdventOfCode/2021/common"
)

func countBits(input []string, bitNum int) (int, int) {
	ones := 0
	zeros := 0
	for _, line := range input {
		if line[bitNum] == '0' {
			zeros++
		} else {
			ones++
		}
	}
	return zeros, ones
}

func Step1(filename string) (int, error) {
	input, err := common.ReadFile(filename)
	if err != nil {
		return 0, err
	}

	var mostCommon strings.Builder
	var leastCommon strings.Builder

	for bitNum := 0; bitNum < len(input[0]); bitNum++ {
		zeros, ones := countBits(input, bitNum)
		if (zeros > ones) {
			mostCommon.WriteRune('0')
			leastCommon.WriteRune('1')
		} else {
			mostCommon.WriteRune('1')
			leastCommon.WriteRune('0')
		}
	}

	gamma, err := strconv.ParseInt(mostCommon.String(), 2, 64)
	if (err != nil) {
		return 0, err
	}
	epsilon, err := strconv.ParseInt(leastCommon.String(), 2, 64)
	if (err != nil) {
		return 0, err
	}

	return int(gamma * epsilon), nil
}

func remove(s []int, i int) []int {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

func Step2(filename string) (int, error) {
	input, err := common.ReadFile(filename)
	if err != nil {
		return 0, err
	}

	oxygen := make([]string, len(input))
	co2 := make([]string, len(input))
	copy(oxygen, input)
	copy(co2, input)

	for bitNum := 0; len(oxygen) + len(co2) > 2; bitNum++ {
		if bitNum == len(input[0]) {
			return 0, errors.New("ran out of input before reducing oxygen/co2 values")
		}
		if (len(oxygen) > 1) {
			zeros, ones := countBits(oxygen, bitNum)
			n := 0
			for _, val := range oxygen {
				if ((zeros > ones && val[bitNum] == '0') || (zeros <= ones && val[bitNum] == '1')) {
					oxygen[n] = val
					n++
				}
			}
			oxygen = oxygen[:n]
		}
		if (len(co2) > 1) {
			zeros, ones := countBits(co2, bitNum)
			n := 0
			for _, val := range co2 {
				if ((zeros <= ones && val[bitNum] == '0') || (zeros > ones && val[bitNum] == '1')) {
					co2[n] = val
					n++
				}
			}
			co2 = co2[:n]
		}
	}

	gamma, err := strconv.ParseInt(oxygen[0], 2, 64)
	if (err != nil) {
		return 0, err
	}
	epsilon, err := strconv.ParseInt(co2[0], 2, 64)
	if (err != nil) {
		return 0, err
	}

	return int(gamma * epsilon), nil
}
