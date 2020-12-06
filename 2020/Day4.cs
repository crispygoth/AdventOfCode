using System;
using System.Collections.Generic;
using System.Linq;

namespace AoC
{
    class Day4 : IPuzzle
    {
        private List<Passport> passports = new List<Passport>();

        public string Part1(string[] input)
        {
            ParseInput(input);

            Console.WriteLine($"Found {passports.Count} passports in input file");

            return passports
                .Where(passport => passport.IsValid())
                .Count()
                .ToString();
        }

        public string Part2(string[] input)
        {
            ParseInput(input);

            Console.WriteLine($"Found {passports.Count} passports in input file");

            return passports
                .Where(passport => passport.IsValid(true))
                .Count()
                .ToString();
        }

        private void ParseInput(string[] input)
        {
            string passportEntry = "";

            // concatenate lines together until we get an empty line
            foreach (string line in input)
            {
                if (line == "")
                {
                    passports.Add(new Passport(passportEntry));
                    passportEntry = "";
                }
                else
                {
                    passportEntry += line + " ";  
                }
            }

            if (passportEntry != "")
            {
                passports.Add(new Passport(passportEntry));
            }
        }
    }
}