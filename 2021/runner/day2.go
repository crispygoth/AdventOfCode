package main

import (
	"fmt"
	"log"

	"github.com/crispygoth/AdventOfCode/2021/day2"
)

func main() {
	// there has to be a better way of doing this but it's already 10pm and I'm out of brain
	log.SetPrefix("day2: ")
	log.SetFlags(0)

	result, err := day2.Step1("input2.txt")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)

	result, err = day2.Step2("input2.txt")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)
}

