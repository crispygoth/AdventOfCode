use indicatif::{MultiProgress, ProgressBar, ProgressIterator};
use std::collections::HashMap;

#[derive(Hash, Eq, PartialEq, Debug)]
struct Stone {
    n: usize
}
impl Stone {
    fn blink(&self) -> Vec<Self> {
        if self.n == 0 {
            vec![Stone { n: 1 }]
        } else if self.n.to_string().len() % 2 == 0 {
            let n = self.n.to_string();
            vec![
                Stone { n: n[0..(n.len() / 2)].parse().unwrap() },
                Stone { n: n[n.len() / 2..].parse().unwrap() }
            ]
        } else {
            vec![Stone { n: self.n * 2024 }]
        }
    }
}

pub fn part1(input: &str) -> String {
    let mut stones = parse_input(input);
    stones = (0..25).fold(stones, |stones, _| {
       stones.into_iter().flat_map(|s| s.blink()).collect() 
    });

    stones.len().to_string()
}

pub fn part2(input: &str) -> String {
    let mut stones = parse_input(input).into_iter().map(|s| (s, 1)).collect::<HashMap<Stone, usize>>();
    let mpb = MultiProgress::new();
    let pb1 = mpb.add(ProgressBar::new(75));
    for _ in (0..75).progress_with(pb1) {
        let pb2 = mpb.add(ProgressBar::new(stones.len() as u64));
        let mut new_stones = HashMap::<Stone,usize>::new();
        for (stone, num_stones) in stones.iter().progress_with(pb2) {
            for new_stone in stone.blink() {
                *new_stones.entry(new_stone).or_insert(0) += num_stones;
            }
        }
        stones = new_stones;
    }

    stones
        .values()
        .sum::<usize>()
        .to_string()
}

fn parse_input(input: &str) -> Vec<Stone> {
    input.split_whitespace().map(|s| Stone { n: s.parse().unwrap() }).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "125 17";

    #[test]
    fn part1_test_input1() {
        let result = part1(TEST_INPUT);
        assert_eq!("55312", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("", result);
    }
}