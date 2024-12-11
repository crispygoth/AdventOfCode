use crate::helpers::parse_char_map;
use pathfinding::prelude::count_paths;

pub fn part1(input: &str) -> String {
    let result = find_paths(input, false);

    result.to_string()
}

fn find_paths(input: &str, all_paths: bool) -> usize {
    let map = parse_char_map(input);
    let mut result = 0;

    for (th_pos, _) in map.indexed_iter().filter(|(_, th)| **th == '0') {
        let mut nines: Vec<(usize, usize)> = vec![];
        let paths = count_paths(
            th_pos,
            |&(x, y)| {
                let n = map[(x, y)].to_digit(10).unwrap();
                //dbg!((x, y));
                //dbg!(n);
                return if n == 9 {
                    vec![]
                } else {
                    let succ = vec![
                        (x.checked_sub(1), Some(y)),
                        (x.checked_add(1), Some(y)),
                        (Some(x), y.checked_sub(1)),
                        (Some(x), y.checked_add(1))
                    ].into_iter().filter_map(|p| {
                        if let (Some(px), Some(py)) = p {
                            if map.get((px, py)) == Some(&char::from_digit(n + 1, 10).unwrap()) {
                                return Some((px, py));
                            }
                        }
                        None
                    }).collect();
                    //dbg!(succ)
                    succ
                }
            },
            |p| {
                return if map[*p] == '9' && !nines.contains(p) {
                    //dbg!(p);
                    nines.push(*p);
                    true
                } else {
                    false
                }
            },
        );
        println!(
            "th_pos: {:?}, paths: {}, nines.len: {}",
            th_pos,
            paths,
            nines.len()
        );
        result += if all_paths { paths } else { nines.len() };
    }
    
    result
}

pub fn part2(input: &str) -> String {
    let result = find_paths(input, true);

    result.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732";
    
    #[test]
    fn part1_example1() {
        let result = part1("...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9");
        assert_eq!(
            "2",
            result);
    }
    
    #[test]
    fn part1_example2()
    {
        let result = part1("..90..9
...1.98
...2..7
6543456
765.987
876....
987....");
        assert_eq!( "4", result );
    }

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("36", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("81", result);
    }
}