use std::fmt::Display;
use std::ops::Add;
use itertools::Itertools;
use ndarray::{Array2, Ix};

pub fn parse_char_map(input: &str) -> Array2<char> {
    Array2::from_shape_vec(
        (input.lines().count(), input.lines().nth(0).unwrap().len()),
        input.chars().filter(|c| !c.is_whitespace()).collect(),
    ).expect("unable to parse input")
}

#[allow(dead_code)]
pub(crate) fn print_char_map(map: &Array2<char>) {
    println!("   0         1         2");
    println!("   012345678901234567890123456789");
    for (i, r) in map.rows().into_iter().enumerate() {
        println!("{:2} {}", i, r.iter().join(""));
    }
}
pub(crate) fn find_char_in_map(map: &Array2<char>, c: char) -> Point<Ix> {
    Point::from_tuple(
        map
            .indexed_iter()
            .find(|&(_, &v)| v == c)
            .map(|(idx, _)| idx)
            .expect("character position not found")
    )
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, Hash)]
pub struct Point<T> {
    pub x: T,
    pub y: T,
}

impl<T> Point<T>
where
    isize: TryFrom<T>,
    T: Clone + std::str::FromStr,
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
    pub(crate) fn from_str(from: &str) -> Self {
        let (x,y) = from.split_once(",").unwrap();
        Point {
            x: x.parse().ok().unwrap(),
            y: y.parse().ok().unwrap()
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

impl<T: Add<Output = T>> Add for Point<T> {
    type Output = Point<T>;

    fn add(self, rhs: Self) -> Self::Output {
        Point { 
            x: self.x + rhs.x,
            y: self.y + rhs.y,
        }
    }
}

impl<T: ToString> Display for Point<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [self.x.to_string(), self.y.to_string()].iter().join(","))
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
    #[allow(dead_code)]
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
    pub fn iter() -> impl Iterator<Item = Direction> {
        [Direction::Up, Direction::Right, Direction::Down, Direction::Left].iter().copied()
    }
}