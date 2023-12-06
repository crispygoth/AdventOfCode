Feature: day3

  Scenario: part1
    Given the input data
    """
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
    """
    When the day3 part1 is run
    Then the command exits successfully
    And the result is 4361

  Scenario: part2
    Given the input data
    """
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
    """
    When the day3 part2 is run
    Then the command exits successfully
    And the result is 467835