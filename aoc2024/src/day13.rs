use indicatif::ProgressIterator;
use crate::helpers::Point;

struct ClawMachine {
    button_a: Point<i128>,
    button_b: Point<i128>,
    prize_pos: Point<i128>,
}

fn parse_pos(string: &str) -> Option<Point<i128>> {
    let re = regex::Regex::new(r"^X[+=](\d+), Y[+=](\d+)$").unwrap();

    if let Some(cap) = re.captures(&string.trim()) {
        Some(Point::from_tuple((cap[1].parse::<i128>().unwrap(), cap[2].parse::<i128>().unwrap())))
    } else {
        None
    }
}

impl ClawMachine {
    fn from_str(string: &str) -> ClawMachine {
        let mut button_a = "";
        let mut button_b = "";
        let mut prize_pos = "";

        for line in string.lines() {
            match line.split_once(':') {
                Some(("Button A", pos)) => button_a = pos,
                Some(("Button B", pos)) => button_b = pos,
                Some(("Prize", pos)) => prize_pos = pos,
                _ => panic!("unable to parse line: {line}")
            }
        }

        ClawMachine {
            button_a: parse_pos(button_a).unwrap(),
            button_b: parse_pos(button_b).unwrap(),
            prize_pos: parse_pos(prize_pos).unwrap()
        }
    }

    fn get_prize(&self) -> Option<i128> {
        let det = (self.button_a.x * self.button_b.y) - (self.button_a.y * self.button_b.x);
        
        if det == 0 {
            return None;
        }

        let (a, a_rem) = num::integer::div_rem(self.button_b.y * self.prize_pos.x - self.button_b.x * self.prize_pos.y, det);
        let (b, b_rem) = num::integer::div_rem(-self.button_a.y * self.prize_pos.x + self.button_a.x * self.prize_pos.y, det);

        if a_rem != 0 || b_rem != 0 {
            None
        } else {
            Some((3 * a) + b)
        }
    } 
}

fn parse_input(input: &str) -> Vec<ClawMachine> {
    input.split("\n\n").map(ClawMachine::from_str).collect()
}

pub fn part1(input: &str) -> String {
    let machines = parse_input(input);
    
    machines
        .iter()
        .filter_map(|m| m.get_prize())
        .sum::<i128>()
        .to_string()
}

pub fn part2(input: &str) -> String {
    let machines = parse_input(input);

    machines
        .iter()
        .map(|m| ClawMachine { 
            button_a: m.button_a, 
            button_b: m.button_b, 
            prize_pos: m.prize_pos + Point::from_tuple((10000000000000, 10000000000000)) 
        })
        .progress()
        .filter_map(|m| m.get_prize())
        .sum::<i128>()
        .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("480", result);
    }
}