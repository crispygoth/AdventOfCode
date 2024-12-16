use itertools::Itertools;
use ndarray::Array2;
use pathfinding::prelude::dfs_reach;
use crate::helpers::{parse_char_map, Direction, Point};

#[derive(Hash, Eq, PartialEq, Debug)]
struct Region<'a> {
    points: Vec<(usize,usize)>,
    map: &'a Array2<char>
}

impl Region<'_> {
    fn area(&self) -> usize {
        self.points.len()
    }

    fn perimeter(&self) -> usize {
        let my_plant = self.map.get(self.points[0]).unwrap();

        self.points.iter().fold(0, |acc, (x,y)| {
            acc + vec![
                (x.checked_sub(1), Some(*y)),
                (x.checked_add(1), Some(*y)),
                (Some(*x), y.checked_sub(1)),
                (Some(*x), y.checked_add(1))
            ].into_iter().fold(0, |acc2, p| {
                if let (Some(x), Some(y)) = p {
                    if self.map.get((x,y)) != Some(&my_plant) {
                        return acc2 + 1;
                    }
                } else {
                    return acc2 + 1;
                }

                acc2
            })
        })
    }
    
    fn sides(&self) -> usize {
        let my_plant = self.map.get(self.points[0]).unwrap();

        dbg!(self.points.iter().flat_map(|(x,y)| {
            vec![
                (x.checked_sub(1), Some(*y)),
                (x.checked_add(1), Some(*y)),
                (Some(*x), y.checked_sub(1)),
                (Some(*x), y.checked_add(1))
            ].into_iter().filter_map(|p| {
                if let (Some(x), Some(y)) = p {
                    if self.map.get((x,y)) != Some(&my_plant) {
                        return Some(p);
                    }
                } else {
                    return Some(p);
                }

                None
            })
        }).collect::<Vec<_>>());
        
        0
    }

    fn price1(&self) -> usize { self.area() * self.perimeter() }
    fn price2(&self) -> usize { self.area() * self.sides() }
}

pub fn part1(input: &str) -> String {
    let map = parse_char_map(input);
    let regions = find_regions(&map);

    for r in &regions {
        println!("{:?} {:?} {:?}", r.area(), r.perimeter(), r.price1());
    }
    regions.iter().fold(0, |acc, r| acc + r.price1()).to_string()
}

pub fn part2(input: &str) -> String {
    let map = parse_char_map(input);
    let regions = find_regions(&map);

    for r in &regions {
        println!("{:?} {:?} {:?} {:?}", map.get(r.points[0]), r.area(), r.sides(), r.price2());
    }
    regions.iter().fold(0, |acc, r| acc + r.price2()).to_string()
}

fn find_regions(map: &Array2<char>) -> Vec<Region> {
    let mut regions: Vec<Region> = vec![];

    for (pos, c) in map.indexed_iter() {
        if regions.iter().any(|r| r.points.contains(&pos)) {
            continue;
        }
        let points = dfs_reach(pos, |(x,y)| {
            vec![
                (x.checked_sub(1), Some(*y)),
                (x.checked_add(1), Some(*y)),
                (Some(*x), y.checked_sub(1)),
                (Some(*x), y.checked_add(1))
            ].into_iter().filter_map(|p| {
                if let (Some(x), Some(y)) = p {
                    if map.get((x,y)) == Some(c) {
                        return Some((x, y));
                    }
                }
                None
            })
        }).collect();
        regions.push(Region { points, map: &map });
    }

    regions
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT_1: &str = "\
AAAA
BBCD
BBCC
EEEC";

    const TEST_INPUT_2: &str = "\
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO";

    const TEST_INPUT_3: &str = "\
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE";

    const TEST_INPUT_4: &str = "\
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE";
    
    const TEST_INPUT_5: &str = "\
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA";
    
    #[test]
    fn part1_test_input_1() {
        let result = part1(TEST_INPUT_1);
        assert_eq!("140", result);
    }

    #[test]
    fn part1_test_input_2() {
        let result = part1(TEST_INPUT_2);
        assert_eq!("772", result);
    }

    #[test]
    fn part1_test_input_3() {
        let result = part1(TEST_INPUT_3);
        assert_eq!("1930", result);
    }

    #[ignore]
    #[test]
    fn part2_test_input_1() {
        let result = part2(TEST_INPUT_1);
        assert_eq!("80", result);
    }

    #[ignore]
    #[test]
    fn part2_test_input_2() {
        let result = part2(TEST_INPUT_2);
        assert_eq!("436", result);
    }

    #[ignore]
    #[test]
    fn part2_test_input_3() {
        let result = part2(TEST_INPUT_3);
        assert_eq!("1206", result);
    }
    #[ignore]
    #[test]
    fn part2_test_input_4() {
        let result = part2(TEST_INPUT_4);
        assert_eq!("236", result);
    }
    #[ignore]
    #[test]
    fn part2_test_input_5() {
        let result = part2(TEST_INPUT_5);
        assert_eq!("368", result);
    }
}