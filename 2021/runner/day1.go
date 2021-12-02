package main

import (
	"fmt"
	"log"

	"github.com/crispygoth/AdventOfCode/2021/day1"
)

func main() {
	// Set properties of the predefined Logger, including
	// the log entry prefix and a flag to disable printing
	// the time, source file, and line number.
	log.SetPrefix("day1: ")
	log.SetFlags(0)

	result, err := day1.Step1("input1.txt")
	// If an error was returned, print it to the console and
	// exit the program.
	if err != nil {
		log.Fatal(err)
	}

	// If no error was returned, print the returned message
	// to the console.
	fmt.Println(result)

	result, err = day1.Step2("input1.txt")
	// If an error was returned, print it to the console and
	// exit the program.
	if err != nil {
		log.Fatal(err)
	}

	// If no error was returned, print the returned message
	// to the console.
	fmt.Println(result)
}

