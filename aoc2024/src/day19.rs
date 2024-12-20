use pathfinding::prelude::count_paths;
use regex::Regex;

pub fn part1(input: &str) -> String {
    let (patterns, designs) = parse_input(input);
    let re = Regex::new(format!("^({})+$", patterns.join("|")).as_str()).unwrap();

    designs.iter().filter(|s| re.is_match(s)).count().to_string()
}

pub fn part2(input: &str) -> String {
    let (patterns, designs) = parse_input(input);
    let mut result = 0;
    
    for design in designs {
        result += count_paths(
            "".to_string(),
            |s| {
                if s.len() == design.len() { vec![] }
                else {
                    patterns.iter().filter_map(|p| {
                        let ns = format!("{}{}", s, p);
                        
                        if design.starts_with(ns.as_str()) {
                            Some(ns)
                        } else {
                            None
                        }
                    }).collect()
                }
            },
            |s| *s == design
        );
    }
    
    result.to_string()
}

fn parse_input(input: &str) -> (Vec<&str>, Vec<&str>) {
    let mut lines = input.lines();

    (
        lines.next().unwrap().split(",").map(str::trim).collect(),
        lines.skip(1).collect()
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("6", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("16", result);
    }
}