struct Report {
    report: Vec<u32>
}

impl Report {
    fn parse(s: &str) -> Self {
        Report {
            report: s
                .split_whitespace()
                .map(|n| n.parse().expect("invalid line: {s}"))
                .collect(),
        }
    }
    fn is_safe(&self, skip: Option<usize>) -> bool {
        let report: Vec<u32>;

        if skip.is_none() {
            report = self.report.clone();
        } else {
            report = self
                .report
                .iter()
                .enumerate()
                .filter_map(|(n, val)| {
                    if skip.is_none() || skip.unwrap() != n {
                        Some(*val)
                    } else {
                        None
                    }
                })
                .collect();
        }

        let mut lastval = report[0];
        let mut incr: Option<bool> = None;

        for n in &report[1..] {
            if incr.is_none() {
                incr = Some(n > &lastval);
            } else {
                if (incr.unwrap() && n <= &lastval) || (!incr.unwrap() && n >= &lastval) {
                    return false;
                }
            }
            let diff = lastval.abs_diff(*n);
            if diff < 1 || diff > 3 {
                return false;
            }
            lastval = *n;
        }
        return true;
    }
}

pub fn part1(input: &str) -> u32 {
    let reports = parse_input(input);

    return reports
        .iter()
        .filter(|r| r.is_safe(None))
        .count()
        .try_into()
        .unwrap();
}

pub fn part2(input: &str) -> u32 {
    let reports = parse_input(input);

    return reports
        .iter()
        .filter(|r| {
            if r.is_safe(None) {
                return true;
            } else {
                for skip in 0..r.report.len() {
                    if r.is_safe(Some(skip)) {
                        return true;
                    }
                }
            }
            return false;
        })
        .count()
        .try_into()
        .unwrap();
}

fn parse_input(input: &str) -> Vec<Report> {
    return input.lines().map(Report::parse).collect();
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!(2, result);
    }

    #[test]
    fn part2_test_input() {
        let result: u32 = part2(TEST_INPUT);
        assert_eq!(4, result);
    }
}
