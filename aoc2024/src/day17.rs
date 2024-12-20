#[derive(Debug, Eq, PartialEq, Clone)]
struct Computer {
    program: Vec<u8>,
    output: Vec<u8>,
    inst_p: usize,
    reg_a: isize,
    reg_b: isize,
    reg_c: isize,
}

impl Computer {
    fn from_str(s: &str) -> Self {
        let mut program = vec![];
        let mut reg_a = 0;
        let mut reg_b = 0;
        let mut reg_c = 0;

        for l in s.lines() {
            match l.split_once(':') {
                Some(("Register A", v)) => reg_a = v.trim().parse().unwrap(),
                Some(("Register B", v)) => reg_b = v.trim().parse().unwrap(),
                Some(("Register C", v)) => reg_c = v.trim().parse().unwrap(),
                Some(("Program", v)) => {
                    program = v
                        .trim()
                        .split(',')
                        .map(|c|
                            c.parse::<u8>().expect(format!("unexpected char {}",c).as_str())
                        ).collect()
                }
                None => {}
                _ => panic!("unable to parse line: {l}"),
            }
        }

        Computer {
            program,
            reg_a,
            reg_b,
            reg_c,
            inst_p: 0,
            output: vec![],
        }
    }

    fn combo_operand(&self, operand: u8) -> isize {
        match operand {
            0..=3 => operand as isize,
            4 => self.reg_a,
            5 => self.reg_b,
            6 => self.reg_c,
            _ => panic!("unrecognised combo operand {operand}"),
        }
    }

    fn run(&mut self) -> String {
        loop {
            let opcode = self.program[self.inst_p];
            let operand = self.program[self.inst_p + 1];

            let adv_inst_p = match opcode {
                0 => self.adv(operand),
                1 => self.bxl(operand),
                2 => self.bst(operand),
                3 => self.jnz(operand),
                4 => self.bxc(operand),
                5 => self.out(operand),
                6 => self.bdv(operand),
                7 => self.cdv(operand),
                _ => panic!("unrecognized instruction {opcode}"),
            };

            if adv_inst_p {
                self.inst_p += 2;
            }

            if self.inst_p >= self.program.len() {
                break;
            }
        }
        self.output
            .iter()
            .map(|&c| c.to_string())
            .collect::<Vec<String>>()
            .join(",")
    }


    fn bxl(&mut self, operand: u8) -> bool {
        self.reg_b ^= operand as isize;
        true
    }

    fn bst(&mut self, operand: u8) -> bool {
        self.reg_b = self.combo_operand(operand) % 8;
        true
    }

    fn jnz(&mut self, operand: u8) -> bool {
        if self.reg_a != 0 {
            self.inst_p = operand as usize;
            false
        } else {
            true
        }
    }

    fn bxc(&mut self, _operand: u8) -> bool {
        self.reg_b ^= self.reg_c;
        true
    }

    fn out(&mut self, operand: u8) -> bool {
        self.output.push((self.combo_operand(operand) % 8) as u8);
        true
    }

    fn adv(&mut self, operand: u8) -> bool {
        self.reg_a = self.xdv(operand);
        true
    }
    
    fn bdv(&mut self, operand: u8) -> bool {
        self.reg_b = self.xdv(operand);
        true
    }

    fn cdv(&mut self, operand: u8) -> bool {
        self.reg_c = self.xdv(operand);
        true
    }

    fn xdv(&mut self, operand: u8) -> isize {
        self.reg_a / 2isize.pow(self.combo_operand(operand) as u32)
    }

    fn get_best_input(&self, cursor: usize, curr_val: isize) -> Option<isize> {
        for i in 0..8 {
            let next_val = (curr_val * 8) + i;
            let mut c = self.clone();
            c.reg_a = next_val;
            let result = c.run();
            let expected_result = self.program[cursor..]
                .iter()
                .map(|&c| c.to_string())
                .collect::<Vec<String>>()
                .join(",");

            if result == expected_result {
                if cursor == 0 {
                    return Some(next_val);
                } else {
                    if let Some(res) = self.get_best_input(cursor - 1, next_val) {
                        return Some(res);
                    }
                }
            }
        }
        None
    }
    
}

pub fn part1(input: &str) -> String {
    let mut computer = Computer::from_str(input);
    computer.run()
}

pub fn part2(input: &str) -> String {
    let computer = Computer::from_str(input);
    let cursor = computer.program.len() - 1;
    let curr_val = 0;

    match computer.get_best_input(cursor, curr_val) {
        Some(best_input) => best_input.to_string(),
        None => panic!("No valid input found"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0";
    
    const TEST_INPUT_2: &str = "\
Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("4,6,3,5,6,3,5,2,1,0", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT_2);
        assert_eq!("117440", result);
    }

}
