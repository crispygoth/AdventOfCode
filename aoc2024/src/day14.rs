use std::ops::Range;
use regex::Regex;
use crate::helpers::Point;

#[derive(Debug,Eq,PartialEq,Copy, Clone)]
struct Robot {
    position: Point<isize>,
    velocity: (isize,isize),
    map_size: (isize,isize)
}

impl Robot {
    fn from_str(s: &str, map_size: (isize,isize)) -> Self {
        let re = Regex::new(r"^p=([-\d]+),([-\d]+) v=([-\d]+),([-\d]+)$").unwrap();
        let cap = re.captures(s);
        let (_, [px, py, vx, vy]) = cap
            .expect(&format!("unable to parse line: {}", s))
            .extract();
        Robot {
            position: Point { x: px.parse().unwrap(), y: py.parse().unwrap() },
            velocity: (vx.parse().unwrap(), vy.parse().unwrap()),
            map_size
        }
    }

    fn step(&mut self) {
        self.position.x = (self.position.x + self.velocity.0) % self.map_size.0;
        if self.position.x < 0 {
            self.position.x += self.map_size.0
        }
        self.position.y = (self.position.y + self.velocity.1) % self.map_size.1;
        if self.position.y < 0 {
            self.position.y += self.map_size.1
        }
    }

    fn in_quadrant(&self, quadrant: &(Range<isize>, Range<isize>)) -> bool {
        quadrant.0.contains(&self.position.x)
        && quadrant.1.contains(&self.position.y)
    }
}

pub fn part1(input: &str) -> String {
   part1_impl(input, (101,103))
}

fn parse_input(input: &str, map_size: (isize,isize)) -> Vec<Robot> {
    input.lines().map(|s| Robot::from_str(s, map_size)).collect()
}

fn part1_impl(input: &str, map_size: (isize,isize)) -> String {
    let mut robots = parse_input(input, map_size);
    for _ in 0..100 {
        robots.iter_mut().for_each(|r| r.step());
    }

    let quadrants = [
        (0..(map_size.0 - 1)/2, 0..(map_size.1 - 1) / 2),
        (((map_size.0 - 1)/2) + 1..map_size.0, 0..(map_size.1 - 1) / 2),
        (0..(map_size.0 - 1)/2, ((map_size.1 - 1) / 2) + 1..map_size.1),
        (((map_size.0 - 1)/2) + 1..map_size.0, ((map_size.1 - 1) / 2) + 1..map_size.1),
    ];

    quadrants
        .map(|q| robots.iter().filter(|r| r.in_quadrant(&q)).count())
        .iter()
        .map(|&count| count as isize)
        .reduce(|acc, count| acc * count)
        .unwrap()
        .to_string()
}

pub fn part2(input: &str) -> String {
    let mut robots = parse_input(input, (101,103));
    let mut steps = 0;
    for _ in 0..(101*103) {
        steps += 1;
        robots.iter_mut().for_each(|r| r.step());
        
        for x in 0..101 {
            let mut row_bots: Vec<_> = robots
                .iter()
                .filter_map(|r|
                    if r.position.x == x as isize { Some(r.position.y) } else { None }
                )
                .collect();
 
            row_bots.sort();
            let mut longest_run = 0;
            let mut current_run = 1;

            for i in 1..row_bots.len() {
                if row_bots[i] == row_bots[i - 1] + 1 {
                    current_run += 1;
                } else {
                    if current_run > longest_run {
                        longest_run = current_run;
                    }
                    current_run = 1;
                }
            }

            if current_run > longest_run {
                longest_run = current_run;
            }

            if longest_run >= 10 {
                print_result(steps, &robots);
            }
        }
    }
    
    "".to_string()
}

fn print_result(steps: i32, robots: &Vec<Robot>) {
    let r_pos: Vec<(isize,isize)> = robots.iter().map(|r| r.position.to_tuple()).collect();
    
    println!("steps: {}", steps);
    for x in 0..101 {
        print!("\n");
        for y in 0..103 {
            print!("{}", if r_pos.contains(&(x,y)) { '#' } else { '.' });
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3";

    #[test]
    fn part1_test_input() {
        let result = part1_impl(TEST_INPUT, (11,7));
        assert_eq!("12", result);
    }
}