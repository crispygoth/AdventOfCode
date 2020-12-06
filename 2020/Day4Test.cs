using System;
using NUnit.Framework;

namespace AoC.Tests
{
    [TestFixture]
    class Day4Test
    {
        public static readonly string[] INPUT = { 
            "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
            "byr:1937 iyr:2017 cid:147 hgt:183cm",
            "",
            "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
            "hcl:#cfa07d byr:1929",
            "",
            "hcl:#ae17e1 iyr:2013",
            "eyr:2024",
            "ecl:brn pid:760753108 byr:1931",
            "hgt:179cm",
            "",
            "hcl:#cfa07d eyr:2025 pid:166559648",
            "iyr:2011 ecl:brn hgt:59in",
            "",
            "eyr:2027", // added a couple more valid entries from the input file, verify that the last entry in the input is processed
            "hcl:#602927",
            "hgt:186cm byr:1939 iyr:2019 pid:552194973 ecl:hzl", 
            "",
            "pid:657988073 eyr:2020 byr:1996",
            "ecl:brn",
            "hcl:#866857 iyr:2015",
            "hgt:164cm",
        };

        private static readonly object[] FIELD_VALIDATION_INPUTS = {
            new object[] { "byr", "2002", true },
            new object[] { "byr", "2003", false },

            new object[] { "hgt", "60in", true },
            new object[] { "hgt", "190cm", true },
            new object[] { "hgt", "190in", false },
            new object[] { "hgt", "190", false },

            new object[] { "hcl", "#123abc", true },
            new object[] { "hcl", "#123abz", false },
            new object[] { "hcl", "123abc", false },

            new object[] { "ecl", "brn", true },
            new object[] { "ecl", "wat", false },

            new object[] { "pid", "000000001", true },
            new object[] { "pid", "0123456789", false },
        };

        private static readonly object[] PASSPORT_VALIDATION_INPUTS = {
            new object[] { "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926", false },
            new object[] { "iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946", false },
            new object[] { "hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277", false },
            new object[] { "hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007", false },

            new object[] { "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f", true },
            new object[] { "eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm", true },
            new object[] { "hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022", true },
            new object[] { "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719", true },
        };

        private IPuzzle puzzle;

        public Day4Test()
        {
            this.puzzle = new Day4();
        }

        [TestCase]
        public void TestPart1()
        {   
            Assert.AreEqual("4", this.puzzle.Part1(INPUT));
        }

        [TestCaseSource(nameof(FIELD_VALIDATION_INPUTS))]
        public void TestValueValidation(string key, string value, bool isValid)
        {
            Assert.AreEqual(isValid, Passport.IsValidValue(key, value));
        }

        [TestCaseSource(nameof(PASSPORT_VALIDATION_INPUTS))]
        public void TestPassportValidation(string passport, bool isValid)
        {
            Assert.AreEqual(isValid, new Passport(passport).IsValid(true));
        }
    }
}