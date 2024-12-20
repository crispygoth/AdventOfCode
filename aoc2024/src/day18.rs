use crate::helpers::{Direction, Point};
use pathfinding::prelude::astar;
use std::collections::HashSet;
use std::iter::Take;
use std::str::Lines;

pub fn part1(input: &str) -> String {
    part1_impl(input.lines().take(1024), (70, 70)).to_string()
}
pub fn part2(input: &str) -> String {
    part2_impl(input, 1024, (70, 70)).to_string()
}

fn part1_impl(input: Take<Lines>, shape: (usize, usize)) -> usize {
    let corrupt_locations = parse_input(input);
    find_path(corrupt_locations, shape).unwrap().0.len() - 1
}

fn part2_impl(input: &str, start: usize, shape: (usize, usize)) -> Point<usize> {
    let mut corrupt_locations = parse_input(input.lines().take(start));

    for next in input.lines().skip(start) {
        let next= Point::from_str(next);
        corrupt_locations.push(next);
        if find_path(corrupt_locations.clone(), shape).is_none() {
            return next;
        }
    }

    panic!("ran out of inputs");
}

fn find_path(corrupt_locations: Vec<Point<usize>>, shape: (usize,usize)) -> Option<(Vec<Point<usize>>, usize)> {
    let corrupt_set: HashSet<_> = corrupt_locations.iter().collect();

    astar(
        &Point { x:0, y:0 },
        |point| {
            Direction::iter()
                .filter_map(|d| point.move_direction(&d))
                .filter(|p| {
                    p.x <= shape.0
                        && p.y <= shape.1
                        && !corrupt_set.contains(p)
                })
                .map(|s| {
                    (s, 1)
                })
                .collect::<Vec<_>>()
        },
        |p| (shape.0 - p.x) + (shape.1 - p.y),
        |p| p.to_tuple() == shape,
    )

}
fn parse_input(input: Take<Lines>) -> Vec<Point<usize>> {
    input
        .map(|l| l.split_once(",").unwrap())
        .map(|(x, y)| Point {
            x: x.parse().unwrap(),
            y: y.parse().unwrap(),
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0";

    #[test]
    fn part1_test_input() {
        let result = part1_impl(TEST_INPUT.lines().take(12), (6, 6));
        assert_eq!(22, result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2_impl(TEST_INPUT, 12, (6,6));
        assert_eq!(Point { x: 6, y: 1 }, result);
    }
}