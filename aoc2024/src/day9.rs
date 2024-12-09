use pathfinding::num_traits::ToPrimitive;
use indicatif::ProgressBar;

pub fn part1(input: &str) -> String {
    let (mut disk, _, _) = parse_input(input);
    disk = compact(disk);

    return checksum(disk).to_string();
}

pub fn part2(input: &str) -> String {
    let (mut disk, empty_blocks, file_blocks) = parse_input(input);
    disk = defrag(disk, empty_blocks, file_blocks);

    return checksum(disk).to_string();
}

fn parse_input(input: &str) -> (Vec<Option<usize>>, Vec<(usize,usize)>, Vec<usize>) {
    let mut file_id = 0;
    let mut result: Vec<Option<usize>> = vec![];
    let mut empty_blocks: Vec<(usize,usize)> = vec![];
    let mut file_blocks: Vec<usize> = vec![];
    let mut is_file = true;

    for c in input.chars() {
        let capacity = c.to_digit(10).unwrap_or_else(|| panic!("invalid input value: {}", c)).to_usize().unwrap();
        let mut append: Vec<Option<usize>> = Vec::with_capacity(capacity);
        if is_file {
            append.resize(capacity, Some(file_id));
            file_blocks.push(result.len());
            file_id += 1;
        } else {
            append.resize(capacity, None);
            empty_blocks.push((result.len(), capacity));
        }
        result.extend(append.iter());

        is_file = !is_file;
    }

    (result, empty_blocks, file_blocks)
}

fn compact(mut disk: Vec<Option<usize>>) -> Vec<Option<usize>> {
    let mut rdisk = disk.clone();
    rdisk.reverse();

    for (n, block) in rdisk.iter().enumerate() {
        if block.is_some() {
            let new_pos = disk.iter().position(|b| b.is_none());
            let old_pos = disk.len() - n - 1;
            if new_pos.unwrap() >= old_pos {
                break;
            }
            disk.swap(old_pos, new_pos.unwrap());
        }
    }

    disk
}

fn defrag(mut disk: Vec<Option<usize>>, mut empty_blocks: Vec<(usize,usize)>, file_blocks: Vec<usize>) -> Vec<Option<usize>> {
    let max_id = file_blocks.len() - 1;
    let bar = ProgressBar::new(max_id.to_u64().unwrap());

    for file_id in (0..=max_id).rev() {
        bar.inc(1);

        let file_size = disk.iter().filter(|i| **i == Some(file_id)).count();
        if let Some((empty_index, (mut new_pos, _))) = empty_blocks.iter().enumerate().find(|(_, (_, size))| *size >= file_size) {
            if new_pos >= file_blocks[file_id] {
                continue;
            }

            for old_pos in file_blocks[file_id]..file_blocks[file_id]+file_size {
                disk.swap(old_pos, new_pos);
                new_pos += 1;
            }

            empty_blocks[empty_index].0 += file_size;
            empty_blocks[empty_index].1 -= file_size;
        }
    }

    bar.finish();
    disk
}

fn checksum(disk: Vec<Option<usize>>) -> usize {
    disk
        .iter()
        .enumerate()
        .map(|(index, id)| {index * id.unwrap_or(0)})
        .sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "2333133121414131402";

    #[test]
    fn part1_test_input() {
        let result = part1(TEST_INPUT);
        assert_eq!("1928", result);
    }

    #[test]
    fn part2_test_input() {
        let result = part2(TEST_INPUT);
        assert_eq!("2858", result);
    }
}