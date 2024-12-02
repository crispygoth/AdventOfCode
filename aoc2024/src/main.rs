use std::env;
use std::fs::File;
use std::io::Read;

pub mod day1;
pub mod day2;

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut input: String = String::new();

    let mut file: File = File::open(&args[3]).expect("cannot open");
    file.read_to_string(&mut input).expect("unable to read input file");

    let result: u32;

    match (&args[1][..], &args[2][..]) {
        ("day1", "part1") => { result = day1::part1(&input); },
        ("day1", "part2") => { result = day1::part2(&input); },
        ("day2", "part1") => { result = day2::part1(&input); },
        ("day2", "part2") => { result = day2::part2(&input); },
        _ => panic!("unknown args")
    }

    println!("{}", result);
}
