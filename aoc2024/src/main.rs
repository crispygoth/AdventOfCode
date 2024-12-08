use std::env;
use std::fs::File;
use std::io::Read;
use std::time::Instant;

pub mod helpers;
pub mod day1;
pub mod day2;
pub mod day3;
pub mod day4;
pub mod day5;
pub mod day6;
pub mod day7;
pub mod day8;

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut input: String = String::new();

    let mut file: File = File::open(&args[3]).expect("cannot open");
    file.read_to_string(&mut input).expect("unable to read input file");

    let result: String;

    let start = Instant::now();

    match (&args[1][..], &args[2][..]) {
        ("day1", "part1") => { result = day1::part1(&input).to_string(); },
        ("day1", "part2") => { result = day1::part2(&input).to_string(); },
        ("day2", "part1") => { result = day2::part1(&input).to_string(); },
        ("day2", "part2") => { result = day2::part2(&input).to_string(); },
        ("day3", "part1") => { result = day3::part1(&input).to_string(); },
        ("day3", "part2") => { result = day3::part2(&input).to_string(); },
        ("day4", "part1") => { result = day4::part1(&input).to_string(); },
        ("day4", "part2") => { result = day4::part2(&input).to_string(); },
        ("day5", "part1") => { result = day5::part1(&input).to_string(); },
        ("day5", "part2") => { result = day5::part2(&input).to_string(); },
        ("day6", "part1") => { result = day6::part1(&input).to_string(); },
        ("day6", "part2") => { result = day6::part2(&input).to_string(); },
        ("day7", "part1") => { result = day7::part1(&input); },
        ("day7", "part2") => { result = day7::part2(&input); },
        ("day8", "part1") => { result = day8::part1(&input); },
        ("day8", "part2") => { result = day8::part2(&input); },
        _ => panic!("unknown args")
    }
    let duration = start.elapsed();

    println!("result: {}", result);
    println!("took {:?}", duration);
}
