using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace AoC
{
    class Day2 : IPuzzle
    {
        private const string PATTERN = @"^(\d+)-(\d+) (.): (.*)$";

        public string Part1(string[] input)
        {
            int count = 0;
            Regex re = new Regex(PATTERN, RegexOptions.Compiled);
            foreach (string passwordEntry in input)
            {
                Match match = re.Match(passwordEntry);

                int minOccurs = Int32.Parse(match.Groups[1].Value);
                int maxOccurs = Int32.Parse(match.Groups[2].Value);
                char requiredChar = match.Groups[3].Value[0];

                int occurs = match.Groups[4].Value.Count(c => c == requiredChar);

                if (occurs >= minOccurs && occurs <= maxOccurs)
                {
                    count++;
                }
            }
            return count.ToString();
        }

        public string Part2(string[] input)
        {
            int count = 0;
            Regex re = new Regex(PATTERN, RegexOptions.Compiled);
            foreach (string passwordEntry in input)
            {
                Match match = re.Match(passwordEntry);

                int pos1 = Int32.Parse(match.Groups[1].Value);
                int pos2 = Int32.Parse(match.Groups[2].Value);
                char requiredChar = match.Groups[3].Value[0];

                bool matchedPos1 = match.Groups[4].Value[pos1 - 1] == requiredChar;
                bool matchedPos2 = match.Groups[4].Value[pos2 - 1] == requiredChar;

                if (matchedPos1 ^ matchedPos2)
                {
                    count++;
                }
            }
            return count.ToString();
        }
    }
}