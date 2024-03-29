module github.com/crispygoth/AdventOfCode/2021/runner

go 1.17

replace github.com/crispygoth/AdventOfCode/2021/day1 => ../day1

require (
	github.com/crispygoth/AdventOfCode/2021/day1 v0.0.0-00010101000000-000000000000
	github.com/crispygoth/AdventOfCode/2021/day2 v0.0.0-00010101000000-000000000000
	github.com/crispygoth/AdventOfCode/2021/day3 v0.0.0-00010101000000-000000000000
)

require github.com/crispygoth/AdventOfCode/2021/common v0.0.0-00010101000000-000000000000 // indirect

replace github.com/crispygoth/AdventOfCode/2021/common => ../common

replace github.com/crispygoth/AdventOfCode/2021/day2 => ../day2

replace github.com/crispygoth/AdventOfCode/2021/day3 => ../day3
