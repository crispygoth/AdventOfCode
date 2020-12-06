using System;
using NUnit.Framework;

namespace AoC.Tests
{
    [TestFixture]
    class Day3Test
    {
        public static readonly string[] INPUT = { 
            "..##.......",
            "#...#...#..",
            ".#....#..#.",
            "..#.#...#.#",
            ".#...##..#.",
            "..#.##.....",
            ".#.#.#....#",
            ".#........#",
            "#.##...#...",
            "#...##....#",
            ".#..#...#.#",
            "..........."    // added an extra line to weed out x/y confusion related bugs that a square map hides
       };
 
        private IPuzzle puzzle;

        public Day3Test()
        {
            this.puzzle = new Day3();
        }

        [TestCase]
        public void TestPart1()
        {   
            Assert.AreEqual("7", this.puzzle.Part1(INPUT));
        }
        
        [TestCase]
        public void TestPart2()
        {   
            Assert.AreEqual("336", this.puzzle.Part2(INPUT));
        }
    }
}