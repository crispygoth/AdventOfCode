use std::cmp::Ordering::*;

struct OrderingRules {
    rules: Vec<(u32,u32)>,
}

impl OrderingRules {
    fn compare(&self, a: &u32, b: &u32) -> std::cmp::Ordering {
        if self.rules.contains(&(*a,*b)) { Less }
        else if self.rules.contains(&(*b,*a)) { Greater }
        else { Equal }
    }
}

pub fn part1(input: &str) -> u32 {
    let mut result = 0;
    let (rules, paths) = parse_input(input);

    for path in paths {
        let mut sorted_path = path.clone();

        sorted_path.sort_by(|a,b| rules.compare(a, b));

        if sorted_path == path {
            result += path[((path.len() as f64) / 2.).floor() as usize];
        }
    }

    return result;
}

pub fn part2(input: &str) -> u32 {
    let mut result = 0;
    let (rules, paths) = parse_input(input);

    for path in paths {
        let mut sorted_path = path.clone();

        sorted_path.sort_by(|a,b| rules.compare(a, b));

        if sorted_path != path {
            result += sorted_path[((sorted_path.len() as f64) / 2.).floor() as usize];
        }
    }

    return result;
}

fn parse_input(input: &str) -> (OrderingRules, Vec<Vec<u32>>) {
    let mut rules: Vec<(u32,u32)> = vec![];
    let mut lines = input.lines();

    for line in lines.by_ref() {
        if line.is_empty() {
            break;
        }
        let (a, b) = line.split_once('|').expect("unable to parse line: {line}");
        rules.push((a.parse::<u32>().unwrap(),b.parse::<u32>().unwrap()));
    }
    let paths = lines
        .map(|line|
            line
                .split(',')
                .map(|s|
                    s
                    .parse()
                    .unwrap()
                )
                .collect()
            )
            .collect();

    return (OrderingRules{ rules }, paths);
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!(143, result);
    }

    #[test]
    fn part2_test_input() {        
        let result: u32 = part2(TEST_INPUT);
        assert_eq!(123, result);
    }
}