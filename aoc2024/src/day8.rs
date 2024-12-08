use crate::helpers::parse_char_map;
use ndarray::Array2;
use pathfinding::num_traits::ToPrimitive;

pub fn part1(input: &str) -> String {
    let map = parse_char_map(input);
    let map_shape = map.shape();
    let mut antinodes = Array2::<usize>::zeros(map.raw_dim());

    for (pos, c) in map.indexed_iter() {
        if *c == '.' {
            continue;
        }

        for (other_pos, _) in map.indexed_iter().filter(|(_, other_c)| *c == **other_c) {
            if pos == other_pos {
                continue;
            }
            let pos_diff = (
                pos.0.to_isize().unwrap() - other_pos.0.to_isize().unwrap(),
                pos.1.to_isize().unwrap() - other_pos.1.to_isize().unwrap()
            );
            let antinode_pos = (
                pos.0.to_isize().unwrap() + pos_diff.0,
                pos.1.to_isize().unwrap() + pos_diff.1
            );
            if antinode_pos.0 < 0 || antinode_pos.1 < 0 {
                continue;
            }

            let antinode_pos = (antinode_pos.0.to_usize().unwrap(), antinode_pos.1.to_usize().unwrap());
            if antinode_pos.0.to_usize().unwrap() >= map_shape[0] || antinode_pos.1.to_usize().unwrap() >= map_shape[1] {
                continue;
            }

            antinodes[antinode_pos] = 1;
        }
    }

    return antinodes.sum().to_string();
}

pub fn part2(input: &str) -> String {
    let map = parse_char_map(input);
    let map_shape = map.shape();
    let mut antinodes = Array2::<usize>::zeros(map.raw_dim());

    for (pos, c) in map.indexed_iter() {
        if *c == '.' {
            continue;
        }

        for (other_pos, _) in map.indexed_iter().filter(|(_, other_c)| *c == **other_c) {
            if pos == other_pos {
                continue;
            }
            let pos_diff = (
                pos.0.to_isize().unwrap() - other_pos.0.to_isize().unwrap(),
                pos.1.to_isize().unwrap() - other_pos.1.to_isize().unwrap()
            );
            
            antinodes = find_antinodes2(pos, pos_diff, map_shape, antinodes);
            antinodes = find_antinodes2(pos, (pos_diff.0*-1,pos_diff.1*-1), map_shape, antinodes);
        }
    }

    return antinodes.sum().to_string();
}

fn find_antinodes2(mut pos: (usize, usize), pos_diff: (isize, isize), map_shape: &[usize], mut antinodes: Array2::<usize>) -> Array2::<usize> {
    loop {
        let antinode_pos = (
            pos.0.to_isize().unwrap() + pos_diff.0,
            pos.1.to_isize().unwrap() + pos_diff.1
        );
        if antinode_pos.0 < 0 || antinode_pos.1 < 0 {
            return antinodes;
        }
        let antinode_pos = (antinode_pos.0.to_usize().unwrap(), antinode_pos.1.to_usize().unwrap());
        if antinode_pos.0.to_usize().unwrap() >= map_shape[0] || antinode_pos.1.to_usize().unwrap() >= map_shape[1] {
            return antinodes;
        }
        antinodes[antinode_pos] = 1;
        pos = antinode_pos;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("14", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("34", result);
    }
}