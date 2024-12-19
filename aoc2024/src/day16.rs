use itertools::Itertools;
use ndarray::{Array2, Ix};
use pathfinding::prelude::{dijkstra, yen};
use crate::helpers::{find_char_in_map, parse_char_map, Direction, Point};

pub fn part1(input: &str) -> String {
    let map = parse_char_map(input);
    let reindeer_pos = find_char_in_map(&map, 'S');

    dijkstra(
        &(reindeer_pos, Direction::Right),
        |(pos, dir)| generate_moves(pos, dir, &map),
        |(pos,_)| { map[pos.to_tuple()] == 'E' }
    ).expect("no path found").1.to_string()
}
fn generate_moves(pos: &Point<Ix>, dir: &Direction, map: &Array2<char>) -> Vec<((Point<Ix>, Direction), usize)> {
    vec![
        ((pos.move_direction(dir), dir), 1),
        ((Some(*pos), &dir.turn_right()), 1000),
        ((Some(*pos), &dir.turn_right().turn_right()), 2000),
        ((Some(*pos), &dir.turn_left()), 1000),
    ].into_iter().filter_map(
        |((p, d),c)| {
            if p.is_some() && map[p.unwrap().to_tuple()] != '#' {
                Some(((p.unwrap(), *d), c))
            } else {
                None
            }
        }
    ).collect::<Vec<_>>()
}
pub fn part2(input: &str) -> String {
    let map = parse_char_map(input);
    let reindeer_pos = find_char_in_map(&map, 'S');

    let paths = yen(
        &(reindeer_pos, Direction::Right),
        |(pos, dir)| generate_moves(pos, dir, &map),
        |(pos,_)| { map[pos.to_tuple()] == 'E' },
        100
    );
    let lowest_cost = paths.first().unwrap().1;
    
    paths
        .iter()
        .filter(|(_ ,c)| *c == lowest_cost)
        .flat_map(|path| path.0.iter().map(|(p,_)| p))
        .unique()
        .count()
        .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT_1: &str = "\
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############";
    const TEST_INPUT_2: &str = "\
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################";

    #[test]
    fn part1_test_input_1() {
        let result = part1(TEST_INPUT_1);
        assert_eq!("7036", result);
    }
    #[test]
    fn part1_test_input_2() {
        let result = part1(TEST_INPUT_2);
        assert_eq!("11048", result);
    }

    #[test]
    fn part2_test_input1() {
        let result = part2(TEST_INPUT_1);
        assert_eq!("45", result);
    }
    #[test]
    fn part2_test_input2() {
        let result = part2(TEST_INPUT_2);
        assert_eq!("64", result);
    }
}