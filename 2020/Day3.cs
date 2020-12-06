using System;

namespace AoC
{
    class Day3 : IPuzzle
    {
        private bool[,] map;

        public string Part1(string[] input)
        {
            ParseInput(input);

            return TraverseMap(3,1).ToString();
        }

        public string Part2(string[] input)
        {
            ParseInput(input);

            return (
                TraverseMap(1,1)
                * TraverseMap(3,1)
                * TraverseMap(5,1)
                * TraverseMap(7,1)
                * TraverseMap(1,2)
            ).ToString();
        }

        private void ParseInput(string[] input)
        {
            map = new bool[input[0].Length, input.Length];

            for (int y = 0; y < input.Length; y++)
            {
                for (int x = 0; x < input[y].Length; x++)
                {
                    map[x,y] = input[y][x] == '#';
                }
            }
        }
        private int TraverseMap(int right, int down)
        {
            int treeCount = 0;
            int x = 0;
            int y = 0;

            while (y < map.GetLength(1))
            {
                if (map[x, y])
                {
                    treeCount++;
                }
                y += down;
                x = (x + right) % map.GetLength(0);
            }

            return treeCount;
        }
    }
}