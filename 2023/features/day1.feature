Feature: day1

  Scenario: part1
    Given the input data
    """
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet
    """
    When the day1 part1 is run
    Then the command exits successfully
    And the result is 142

  Scenario: part2
    Given the input data
    """
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
    """
    When the day1 part2 is run
    Then the command exits successfully
    And the result is 281