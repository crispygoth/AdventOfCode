using System;
using NUnit.Framework;

namespace AoC.Tests
{
    [TestFixture]
    class Day6Test
    {
        private static readonly string[] INPUT = {
            "abc",
            "",
            "a",
            "b",
            "c",
            "",
            "ab",
            "ac",
            "",
            "a",
            "a",
            "a",
            "a",
            "",
            "b"
        };

        private IPuzzle puzzle;
        
        public Day6Test()
        {
            this.puzzle = new Day6();
        }

        [TestCase]
        public void TestPart1()
        {
            Assert.AreEqual("11", this.puzzle.Part1(INPUT));
        }
        
        [TestCase]
        public void TestPart2()
        {
            Assert.AreEqual("6", this.puzzle.Part2(INPUT));
        }
    }
}