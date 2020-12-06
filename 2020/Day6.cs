using System;
using System.Collections.Generic;
using System.Linq;

namespace AoC
{
    class Day6 : IPuzzle
    {
        private List<HashSet<char>> groups;

        public string Part1(string[] input)
        {
            ParseInput(input);

            return groups.Select(group => group.Count).Sum().ToString();
        }

        public string Part2(string[] input)
        {
            ParseInput(input, true);

            return groups.Select(group => group.Count).Sum().ToString();
        }

        private void ParseInput(string[] input, bool all = false)
        {
            groups = new List<HashSet<char>>();

            HashSet<char> group = new HashSet<char>();
            bool firstOfGroup = true;

            foreach (string line in input)
            {
                if (line == "")
                {
                    groups.Add(group);
                    group = new HashSet<char>();
                    firstOfGroup = true;
                }
                else
                {
                    if (all && !firstOfGroup)
                    {
                        group.IntersectWith(line);
                    }
                    else
                    {
                        group.UnionWith(line);
                    }
                    firstOfGroup = false;
                }
            }

            if (group.Count > 0)
            {
                groups.Add(group);
            }
        }
    }
}