use ndarray::Array2;

pub fn part1(input: &str) -> u32 {
    let mut result: u32 = 0;

    let grid = parse_input(input);

    let filter_fn =
        |a: Vec<&char>| -> bool { a == [&'X', &'M', &'A', &'S'] || a == [&'S', &'A', &'M', &'X'] };

    result += grid
        .windows((1, 4))
        .into_iter()
        .filter(|w| filter_fn(w.into_iter().collect()))
        .count() as u32;

    result += grid
        .clone()
        .reversed_axes()
        .windows((1, 4))
        .into_iter()
        .filter(|w| filter_fn(w.into_iter().collect()))
        .count() as u32;

    result += grid
        .windows((4, 4))
        .into_iter()
        .filter(|w| filter_fn(vec![&w[(0, 0)], &w[(1, 1)], &w[(2, 2)], &w[(3, 3)]]))
        .count() as u32;

    result += grid
        .windows((4, 4))
        .into_iter()
        .filter(|w| filter_fn(vec![&w[(3, 0)], &w[(2, 1)], &w[(1, 2)], &w[(0, 3)]]))
        .count() as u32;

    return result;
}

pub fn part2(input: &str) -> u32 {
    let mut result = 0;
    let grid = parse_input(input);

    let correct = [
        vec![&'M',&'A',&'S'],
        vec![&'S',&'A',&'M'],
    ];

    result += grid
        .windows((3, 3))
        .into_iter()
        .filter(|w| {
            correct.contains(&vec![&w[(0,0)],&w[(1,1)],&w[(2,2)]])
            && correct.contains(&vec![&w[(0,2)],&w[(1,1)],&w[(2,0)]])
        })
        .count() as u32;

    return result;
}

fn parse_input(input: &str) -> Array2<char> {
    return Array2::from_shape_vec(
        (input.lines().count(), input.lines().nth(0).unwrap().len()),
        input.chars().filter(|c| !c.is_whitespace()).collect(),
    ).expect("unable to parse input");
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!(18, result);
    }

    #[test]
    fn part2_test_input() {
        let result: u32 = part2(TEST_INPUT);
        assert_eq!(9, result);
    }
}
