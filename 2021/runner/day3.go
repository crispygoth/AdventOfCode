package main

import (
	"fmt"
	"log"

	"github.com/crispygoth/AdventOfCode/2021/day3"
)

func main() {
	// there has to be a better way of doing this but it's already 10pm and I'm out of brain
	log.SetPrefix("day3: ")
	log.SetFlags(0)

	result, err := day3.Step1("input3.txt")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)

	result, err = day3.Step2("input3.txt")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)
}

