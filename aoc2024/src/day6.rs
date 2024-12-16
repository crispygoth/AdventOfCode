use crate::helpers;
use itertools::Itertools;
use ndarray::Array2;
use indicatif::ParallelProgressIterator;
use rayon::iter::{IntoParallelRefIterator, ParallelIterator};
use crate::helpers::{Direction, Point};

pub fn part1(input: &str) -> u32 {
    let map = helpers::parse_char_map(input);

    let path = guard_patrol(map).expect("found a loop in part 1!");

    return u32::try_from(path.into_iter().map(|(p, _)| p).unique().count()).unwrap();
}

pub fn part2(input: &str) -> u32 {
    let map = helpers::parse_char_map(input);
    let positions: Vec<((usize, usize), &char)> = map.indexed_iter().collect();

    return positions.par_iter().progress().filter(|(i, val)| -> bool {
        if **val != '.' {
            return false;
        }

        let mut new_map = map.clone();
        new_map[*i] = '#';
        return guard_patrol(new_map).is_none();
    }).count() as u32;
}

fn guard_patrol(map: Array2<char>) -> Option<Vec<(Point<usize>, Direction)>> {
    let mut pos = map
        .indexed_iter()
        .filter_map(|(p, c)| {
            if *c == '^' {
                Some(Point::from_tuple(p))
            } else {
                None
            }
        })
        .nth(0)
        .expect("unable to find initial location");
    let mut facing = Direction::Up;
    let mut path: Vec<(Point<usize>, Direction)> = vec![(pos.clone(), Direction::Up)];

    loop {
        //        print!("\r{},{} {:?}                           ", &pos.to_tuple().0,&pos.to_tuple().1, &facing);
        let new_pos = pos.move_direction(&facing);
        if new_pos.is_some() {
            if path.contains(&(new_pos.unwrap(), facing)) {
                return None;
            }

            path.push((pos, facing));

            let new_val = map.get(new_pos.unwrap().to_tuple());
            match new_val {
                Some('.') | Some('^') => pos = new_pos.unwrap(),
                Some('#') => facing = facing.turn_right(),
                Some(c) => panic!("unknown map character {c}"),
                None => {
                    return Some(path);
                }
            }
        } else {
            return Some(path);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!(41, result);
    }

    #[test]
    fn part2_test_input() {
        let result: u32 = part2(TEST_INPUT);
        assert_eq!(6, result);
    }
}
