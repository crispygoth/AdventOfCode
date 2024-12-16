use ndarray::Array2;

pub fn parse_char_map(input: &str) -> Array2<char> {
    return Array2::from_shape_vec(
        (input.lines().count(), input.lines().nth(0).unwrap().len()),
        input.chars().filter(|c| !c.is_whitespace()).collect(),
    ).expect("unable to parse input");
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, Hash)]
pub struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T>
where
    isize: TryFrom<T>,
    T: Clone,
    T: TryFrom<isize>,
{
    pub(crate) fn to_tuple(self) -> (T, T) {
        (self.x, self.y)
    }
    pub(crate) fn from_tuple(from: (T, T)) -> Self {
        Self {
            x: from.0,
            y: from.1,
        }
    }
    pub(crate) fn move_direction(&self, dir: &Direction) -> Option<Self> {
        let x = isize::try_from(self.x.clone()).ok();
        let y = isize::try_from(self.y.clone()).ok();
        let new_x = T::try_from(x.unwrap() + dir.to_tuple().0);
        let new_y = T::try_from(y.unwrap() + dir.to_tuple().1);

        match (new_x, new_y) {
            (Ok(x), Ok(y)) => Some(Self { x, y }),
            _ => None,
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, Hash)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

impl Direction {
    pub(crate) fn turn_left(&self) -> Self {
        match self {
            Direction::Up => Direction::Left,
            Direction::Left => Direction::Down,
            Direction::Down => Direction::Right,
            Direction::Right => Direction::Up,
        }
    }

    pub(crate) fn turn_right(&self) -> Self {
        match self {
            Direction::Up => Direction::Right,
            Direction::Right => Direction::Down,
            Direction::Down => Direction::Left,
            Direction::Left => Direction::Up,
        }
    }

    fn to_tuple(&self) -> (isize, isize) {
        match self {
            Direction::Up => (-1, 0),
            Direction::Right => (0, 1),
            Direction::Down => (1, 0),
            Direction::Left => (0, -1),
        }
    }
}