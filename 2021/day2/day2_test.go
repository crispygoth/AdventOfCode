package day2

import (
	"testing"
)

func TestStep1(t *testing.T) {
	input := "test.txt"
	expected := 150

	result, err := Step1(input)
	if result != expected || err != nil {
		t.Fatalf(`Step1(test1.txt) = %d, %v, expected %d, nil`, result, err, expected)
	}
}

/*func TestStep2(t *testing.T) {
	input := "test.txt"
	expected := 5

	result, err := Step2(input)
	if result != expected || err != nil {
		t.Fatalf(`Step2(test1.txt) = %d, %v, expected %d, nil`, result, err, expected)
	}
}*/
