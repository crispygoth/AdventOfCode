package map2d

import (
	"iter"
	"strings"
)

type Map2D struct {
	Points [][]byte
	Height int
	Width  int
}

type Point2D struct {
	X int
	Y int
}

type Direction int

const (
	North Direction = iota
	NorthEast
	East
	SouthEast
	South
	SouthWest
	West
	NorthWest
)

func New(width int, height int) Map2D {
	m := Map2D{
		make([][]byte, width),
		height,
		width,
	}
	for i := range m.Points {
		m.Points[i] = make([]byte, height)
	}
	return m
}

func FromString(s string) Map2D {
	lines := strings.Split(strings.Trim(s,"\r\n "), "\n")
	height := len(lines)
	width := len(lines[0])

	points := make([][]byte, height)

	for x := range lines {
		points[x] = []byte(strings.Trim(lines[x], "\r\n "))
	}

	return Map2D{
		Points: points, Height: height, Width: width,
	}
}

func (m Map2D) Set(p Point2D, v byte) {
	if m.IsValid(p) {
		m.Points[p.X][p.Y] = v
	}
}

func (m Map2D) Get(p Point2D) byte {
	if !m.IsValid(p) {
		return 0
	}
	return m.Points[p.X][p.Y]
}

func (m Map2D) IsValid(p Point2D) bool {
	return p.X >= 0 && p.X < m.Height && p.Y >= 0 && p.Y < m.Width
}

func (d Direction) TurnLeft(steps int) Direction {
	left := map[Direction]Direction{
		North:     NorthWest,
		NorthWest: West,
		West:      SouthWest,
		SouthWest: South,
		South:     SouthEast,
		SouthEast: East,
		East:      NorthEast,
		NorthEast: North,
	}

	r := d
	for range steps {
		r = left[r]
	}
	return r
}
func (d Direction) TurnRight(steps int) Direction {
	right := map[Direction]Direction{
		North:     NorthEast,
		NorthEast: East,
		East:      SouthEast,
		SouthEast: South,
		South:     SouthWest,
		SouthWest: West,
		West:      NorthWest,
		NorthWest: North,
	}

	r := d
	for range steps {
		r = right[r]
	}
	return r
}

func (p Point2D) Move(dir Direction) Point2D {
	switch dir {
	case North:
		return Point2D{p.X, p.Y - 1}
	case NorthEast:
		return Point2D{p.X + 1, p.Y - 1}
	case East:
		return Point2D{p.X + 1, p.Y}
	case SouthEast:
		return Point2D{p.X + 1, p.Y + 1}
	case South:
		return Point2D{p.X, p.Y + 1}
	case SouthWest:
		return Point2D{p.X - 1, p.Y + 1}
	case West:
		return Point2D{p.X - 1, p.Y}
	case NorthWest:
		return Point2D{p.X - 1, p.Y - 1}
	}

	return p
}

func (p Point2D) Neighbours() iter.Seq[Point2D] {
	return func(yield func(Point2D) bool) {
		dirs := []Direction{North, NorthEast, East, SouthEast, South, SouthWest, West, NorthWest}

		for _, d := range dirs {
			if !yield(p.Move(d)) {
				return
			}
		}
	}
}

func (m Map2D) Neighbours(p Point2D) iter.Seq2[Point2D, byte] {
	return func(yield func(Point2D, byte) bool) {
		for d := range p.Neighbours() {
			if m.IsValid(d) {
				if !yield(d, m.Get(d)) {
					return
				}
			}
		}
	}
}

func (m Map2D) AllPoints() iter.Seq2[Point2D, byte] {
	return func(yield func(Point2D, byte) bool) {
		for x := range m.Height {
			for y := range m.Width {
				p := Point2D{x,y}
				if (!yield(p, m.Get(p))) {
					return
				}
			}
		}
	}
}
