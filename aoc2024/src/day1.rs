pub fn part1(input: &str) -> u32 {
    let (mut list_a, mut list_b) = parse_input(input);

    list_a.sort();
    list_b.sort();

    let mut total = 0;
    for (i, entry) in list_a.iter().enumerate() {
        total += entry.abs_diff(list_b[i]);
    }

    return total;
}

pub fn part2(input: &str) -> u32 {
    let (list_a, list_b) = parse_input(input);
    
    let mut total = 0;
    for entry in list_a.iter() {
        let list_b_occur = list_b.iter().filter(|&n| *n == *entry).count();
        total += entry * (list_b_occur as u32);
    }
    return total;
}

fn parse_input(input: &str) -> (Vec<u32>, Vec<u32>) {
    let mut list_a: Vec<u32> = vec![];
    let mut list_b: Vec<u32> = vec![];

    for line in input.lines() {
        let ids: Vec<u32> = line
            .split_whitespace()
            .map(str::parse::<u32>)
            .map(Result::unwrap)
            .collect();

        list_a.push(ids[0]);
        list_b.push(ids[1]);
    }

    return (list_a,list_b);
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "3   4
4   3
2   5
1   3
3   9
3   3";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!(11, result);
    }

    #[test]
    fn part2_test_input() {
        let result: u32 = part2(TEST_INPUT);
        assert_eq!(31, result);
    }
}