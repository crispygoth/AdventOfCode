use regex::Regex;

pub fn part1(input: &str) -> u32 {
    let mut result = 0;

    let re = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();
    for (_, [a,b]) in re.captures_iter(input).map(|c| c.extract()) {
        result += a.parse::<u32>().unwrap() * b.parse::<u32>().unwrap();
    }

    return result;
}

pub fn part2(input: &str) -> u32 {
    let mut result = 0;
    let mut enabled = true;

    let re = Regex::new(r"(?<instr>do\(\)|don't\(\)|mul\((?<mul_a>\d{1,3}),(?<mul_b>\d{1,3})\))").unwrap();
    for cap in re.captures_iter(input) {
        let (instr,rest) = cap.name("instr").unwrap().as_str().split_once('(').unwrap();
        println!("{} {}", instr, rest);
        match instr {
            "do" => enabled = true,
            "don't" => enabled = false,
            "mul" => if enabled { 
                result += 
                    cap.name("mul_a").unwrap().as_str().parse::<u32>().unwrap()
                    * cap.name("mul_b").unwrap().as_str().parse::<u32>().unwrap()
                },
            _ => panic!("unknown instruction {instr}")
        }
    }

    return result;
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT_1: &str = "\
        xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const TEST_INPUT_2: &str = "\
        xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT_1);
        assert_eq!(161, result);
    }

    #[test]
    fn part2_test_input() {
        let result: u32 = part2(TEST_INPUT_2);
        assert_eq!(48, result);
    }
}