use std::collections::HashMap;
use indicatif::ProgressIterator;
use ndarray::{Array2, Ix};
use pathfinding::prelude::astar;
use crate::helpers::{find_char_in_map, parse_char_map, print_char_map, Point};

pub fn part1(input: &str) -> String {
    let paths = find_all_paths(input,2);
    paths.iter().fold(0, |acc, (&score, &n)| { acc + if score >= 100 { n } else { 0 } }).to_string()
}

pub fn part2(input: &str) -> String {
    todo!()
}

fn manhattan_dist(p1: Point<Ix>, p2: Point<Ix>) -> Ix {
    p1.x.abs_diff(p2.x) + p1.y.abs_diff(p2.y)
}

fn successors(pos: Point<Ix>, map: &Array2<char>, cheat: Option<(Point<Ix>, Point<Ix>)>) -> Vec<(Point<Ix>, Ix)> {
    if cheat.is_some() && pos == cheat.unwrap().0 {
        vec![(cheat.unwrap().1,1)]
    } else {
        pos.neighbours().into_iter().filter_map(|p| {
            if *map.get(p.to_tuple()).unwrap_or(&'#') != '#'
                || (cheat.is_some() && cheat.unwrap().0 == p)
                || (cheat.is_some() && cheat.unwrap().1 == p) {
                Some((p, 1))
            } else {
                None
            }
        }).collect()
    }
}

fn find_all_paths(input: &str, cheat_len: usize) -> HashMap<usize,usize> {
    let map = parse_char_map(input);
    let start_pos = find_char_in_map(&map, 'S');
    let end_pos = find_char_in_map(&map, 'E');
    
    let (full_path, full_score) = astar(
        &start_pos,
        |p| successors(*p, &map, None),
        |p| manhattan_dist(*p, end_pos),
        |p| *p == end_pos
    ).expect("no path found");
    
    let mut successful_cheats: HashMap<(Point<Ix>,Point<Ix>),usize> = HashMap::new();
    for pos in full_path.iter().progress() {
        let possible_cheats: Vec<_> = pos.neighbours().into_iter().flat_map(|c_start| {
            if map[c_start.to_tuple()] == '#' {
                c_start.neighbours().into_iter().filter_map(|c_end| {
                    if *map.get(c_end.to_tuple()).unwrap_or(&'#') != '#' {
                        Some((c_start,c_end))
                    } else {
                        None
                    }
                }).collect()
            } else {
                vec![]
            }
        }).collect();
        
        for cheat in possible_cheats {
            let cheat_path = astar(
                &start_pos,
                |p| successors(*p, &map, Some((cheat,cheat_len))),
                |p| manhattan_dist(*p, end_pos),
                |p| *p == end_pos
            );
            let cheat_score = cheat_path.unwrap_or((vec![], full_score)).1;
            if cheat_score < full_score {
                let diff = full_score - cheat_score;
                //let mut cmap = map.clone();
                //cmap[cheat.0.to_tuple()] = '1';
                //cmap[cheat.1.to_tuple()] = '2';
                //print_char_map(&cmap);
                successful_cheats.insert(cheat, diff);
            }
        }
    }
    
    let mut result: HashMap<usize,usize> = HashMap::new();
    for (_, score) in successful_cheats.iter() {
        result.insert(*score, result.get(score).unwrap_or(&0) + 1);
    }
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############";

    #[test]
    fn part1_test_input() {
        let result = find_all_paths(TEST_INPUT, 2);
        let mut expected: HashMap<usize,usize> = HashMap::new();
        
        for (key, value) in 
            vec![ 2, 4, 6, 8, 10, 12, 20, 36, 38, 40, 64 ].into_iter().zip(
                vec![ 14, 14, 2, 4, 2, 3, 1, 1, 1, 1, 1 ].into_iter()
            ) {
            expected.insert(key, value);
        }
        
        assert_eq!(expected, result);
    }

    #[ignore]
    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("", result);
    }
}