using System;
using NUnit.Framework;

namespace AoC.Tests
{
    [TestFixture]
    class Day2Test
    {
        public static readonly string[] INPUT = { 
            "1-3 a: abcde",
            "1-3 b: cdefg",
            "2-9 c: ccccccccc"
        };
 
        private IPuzzle puzzle;

        public Day2Test()
        {
            this.puzzle = new Day2();
        }

        [TestCase]
        public void TestPart1()
        {   
            Assert.AreEqual("2", this.puzzle.Part1(INPUT));
        }
        
        [TestCase]
        public void TestPart2()
        {   
            Assert.AreEqual("1", this.puzzle.Part2(INPUT));
        }
    }
}