use ndarray::Array2;

pub fn parse_char_map(input: &str) -> Array2<char> {
    return Array2::from_shape_vec(
        (input.lines().count(), input.lines().nth(0).unwrap().len()),
        input.chars().filter(|c| !c.is_whitespace()).collect(),
    ).expect("unable to parse input");
}