using System;
using NUnit.Framework;

namespace AoC.Tests
{
    [TestFixture]
    class Day5Test
    {
         private static readonly object[] DECODE_TEST_INPUT = {
            new object[] { "FBFBBFFRLR", 357 },
            new object[] { "BFFFBBFRRR", 567 },
            new object[] { "FFFBBBFRRR", 119 },
            new object[] { "BBFFBBFRLL", 820 },
        };

        [TestCaseSource(nameof(DECODE_TEST_INPUT))]
        public void TestDecodeSeatLocation(string seatCode, int seatID)
        {
            Assert.AreEqual(seatID, Day5.DecodeSeatLocation(seatCode));
        }
    }
}