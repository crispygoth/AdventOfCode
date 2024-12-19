use itertools::Itertools;
use ndarray::{Array2, Ix};
use crate::helpers::{parse_char_map, Direction, Point};

fn find_robot(map: &Array2<char>) -> Point<Ix> {
    Point::from_tuple(
        map
            .indexed_iter()
            .find(|&(_, &v)| v == '@')
            .map(|(idx, _)| idx)
            .expect("robot position not found")
    )
}

pub fn part1(input: &str) -> String {
    let (mut map, moves) = parse_input(input);
    let mut robot_pos = find_robot(&map);

    for m in moves {
        robot_pos = try_move(&mut map, robot_pos, m).unwrap_or(robot_pos);
    }

    map
        .indexed_iter()
        .filter(|(_, c)| **c == 'O')
        .fold(0, |acc, (pos,_)| acc + (pos.0 * 100) + pos.1)
        .to_string()
}

fn try_move(map: &mut Array2<char>, from_pos: Point<Ix>, m: Direction) -> Option<Point<Ix>> {
    let new_pos = from_pos.move_direction(&m).unwrap();
    match map[new_pos.to_tuple()] {
        '.' => {
            map[new_pos.to_tuple()] = map[from_pos.to_tuple()];
            map[from_pos.to_tuple()] = '.';
            Some(new_pos)
        },
        'O' => try_move(map, new_pos, m).and_then(|_| {
            map[new_pos.to_tuple()] = map[from_pos.to_tuple()];
            map[from_pos.to_tuple()] = '.';
            Some(new_pos)
        }),
        '#' => None,
        c => panic!("unknown map char: {c}"),
    }
}

fn print_map(map: &Array2<char>) {
    println!("0         1         2");
    println!("   012345678901234567890123456789");
    for (i, r) in map.rows().into_iter().enumerate() {
        println!("{:2} {}", i, r.iter().join(""));
    }
}
pub fn part2(input: &str) -> String {
    let input = input
        .replace(".","..")
        .replace("#","##")
        .replace("O","[]")
        .replace("@","@.");

    let (mut map, moves) = parse_input(input.as_str());
    let mut robot_pos = find_robot(&map);

    for m in moves {
        //print_map(&map);
        robot_pos = try_move_2(&mut map, robot_pos, m).unwrap_or(robot_pos);
    }

    map
        .indexed_iter()
        .filter(|(_, c)| **c == '[')
        .fold(0, |acc, (pos,_)| acc + (pos.0 * 100) + pos.1)
        .to_string()
}

fn try_move_2(map: &mut Array2<char>, mut from_pos: Point<Ix>, m: Direction) -> Option<Point<Ix>> {
    let mut new_pos = from_pos.move_direction(&m).unwrap();
    let c = map[from_pos.to_tuple()];

    if m == Direction::Left || m == Direction::Right || c == '@' {
        match map[new_pos.to_tuple()] {
            '.' => {
                map[new_pos.to_tuple()] = map[from_pos.to_tuple()];
                map[from_pos.to_tuple()] = '.';
                Some(new_pos)
            },
            '[' | ']' => try_move_2(map, new_pos, m).and_then(|_| {
                map[new_pos.to_tuple()] = map[from_pos.to_tuple()];
                map[from_pos.to_tuple()] = '.';
                Some(new_pos)
            }),
            '#' => None,
            c => panic!("unknown map char: {c}"),
        }
    } else {
        let from_pos_2; 
        let new_pos_2;
        if c == '[' {
            from_pos_2 = from_pos.move_direction(&Direction::Right).unwrap();
            new_pos_2 = new_pos.move_direction(&Direction::Right).unwrap();
        } else {
            from_pos_2 = from_pos;
            from_pos = from_pos.move_direction(&Direction::Left).unwrap();
            new_pos_2 = new_pos;
            new_pos = new_pos.move_direction(&Direction::Left).unwrap();
        }
        
        let move_box = |map: &mut Array2<char>| {
            map[new_pos.to_tuple()] = map[from_pos.to_tuple()];
            map[from_pos.to_tuple()] = '.';
            map[new_pos_2.to_tuple()] = map[from_pos_2.to_tuple()];
            map[from_pos_2.to_tuple()] = '.';
            Some(new_pos)
        };

        match (map[new_pos.to_tuple()], map[new_pos_2.to_tuple()]) {
            ('.','.') => {
                map[new_pos.to_tuple()] = map[from_pos.to_tuple()];
                map[from_pos.to_tuple()] = '.';
                map[new_pos_2.to_tuple()] = map[from_pos_2.to_tuple()];
                map[from_pos_2.to_tuple()] = '.';
                Some(new_pos)
            },
            ('[',']') | ('[', '.') | (']','.') => try_move_2(map, new_pos, m).and_then(|_| move_box(map)),
            ('.','[') | ('.',']') => try_move_2(map, new_pos_2, m).and_then(|_| move_box(map)),
            (']','[') => {
                let mut new_map: Array2<char> = map.clone();
                if try_move_2(&mut new_map, new_pos, m).is_some() && try_move_2(&mut new_map, new_pos_2, m).is_some() {
                    *map = new_map;
                    move_box(map)
                } else {
                    None
                }
            },
            ('#',_) | (_,'#') => None,
            p => panic!("unknown map chars: {:?}", p),
        }
    }
}

fn parse_input(input: &str) -> (Array2<char>, Vec<Direction>) {
    let (map, moves) = input.split_once("\n\n").expect("unable to parse input");

    (
        parse_char_map(map),
        moves.chars().filter_map(|c| { match c {
            '^' => Some(Direction::Up),
            '>' => Some(Direction::Right),
            'v' => Some(Direction::Down),
            '<' => Some(Direction::Left),
            '\n' => None,
            _ => panic!("unrecognised char: {c}")
        }}).collect()
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT_1: &str = "\
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<";

    const TEST_INPUT_2: &str = "\
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^";

    const TEST_INPUT_3: &str = "\
#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^";

    #[test]
    fn part1_test_input1() {
        let result = part1(TEST_INPUT_1);
        assert_eq!("2028", result);
    }
    #[test]
    fn part1_test_input2() {
        let result = part1(TEST_INPUT_2);
        assert_eq!("10092", result);
    }

    #[test]
    fn part2_test_input2() {
        let result = part2(TEST_INPUT_2);
        assert_eq!("9021", result);
    }
    #[test]
    fn part2_test_input3() {
        let result = part2(TEST_INPUT_3);
        assert_eq!("618", result);
    }
}