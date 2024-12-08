use pathfinding::prelude::dfs;

struct Equation {
    result: usize,
    numbers: Vec<usize>
}

pub fn part1(input: &str) -> String {
    let mut result = 0;

    let equations = parse_input(input);

    for eq in equations {
        let search = dfs(
            (0, eq.numbers[0]),
            |(i, value)| -> Vec<(usize,usize)> {
                if (*i + 1) == eq.numbers.len() { vec![] }
                else {
                    vec![
                        (*i + 1, *value + eq.numbers[i + 1]),
                        (*i + 1, *value * eq.numbers[i + 1])
                    ]
                }
            },
            |(_, value)| { *value == eq.result }
        );
        if search.is_some() {
            result += eq.result;
        }
    }

    return result.to_string();
}

pub fn part2(input: &str) -> String {
    let mut result = 0;

    let equations = parse_input(input);

    for eq in equations {
        let search = dfs(
            (0, eq.numbers[0]),
            |(i, value)| -> Vec<(usize,usize)> {
                if (*i + 1) == eq.numbers.len() { vec![] }
                else {
                    vec![
                        (*i + 1, *value + eq.numbers[i + 1]),
                        (*i + 1, *value * eq.numbers[i + 1]),
                        (*i + 1, format!("{}{}", *value, eq.numbers[i + 1]).parse().unwrap())
                    ]
                }
            },
            |(i, value)| { (*i + 1) == eq.numbers.len() && *value == eq.result }
        );
        if search.is_some() {
            result += eq.result;
        }
    }

    return result.to_string();
}

fn parse_input(input: &str) -> Vec<Equation> {
    input.lines()
        .map(|line| {
            match line.split_once(":") {
                Some((result, numbers)) => {
                    Equation {
                        result: result.parse::<usize>().unwrap(),
                        numbers: numbers.split_whitespace().map(|s| s.parse().unwrap()).collect()
                    } 
                }
                _ => panic!("unable to parse line '{line}'")
            }
        }).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("3749", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("11387", result);
    }
}