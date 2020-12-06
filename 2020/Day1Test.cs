using System;
using NUnit.Framework;

namespace AoC.Tests
{
    [TestFixture]
    class Day1Test
    {
        public static readonly string[] INPUT = { "1721","979","366","299","675","1456" };
 
        private IPuzzle puzzle;

        public Day1Test()
        {
            this.puzzle = new Day1();
        }

        [TestCase]
        public void TestPart1()
        {   
            Assert.AreEqual("514579", this.puzzle.Part1(INPUT));
        }
        
        [TestCase]
        public void TestPart2()
        {   
            Assert.AreEqual("241861950", this.puzzle.Part2(INPUT));
        }
    }
}