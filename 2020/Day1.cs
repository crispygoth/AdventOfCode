using System;

namespace AoC
{
    class Day1 : IPuzzle
    {
        const int TARGET = 2020;

        public string Part1(string[] input)
        {
            int[] entries = Array.ConvertAll(input, Int32.Parse);
            for (int outerIndex = 0; outerIndex < entries.Length; outerIndex++)
            {
                for (int innerIndex = 0; innerIndex < entries.Length; innerIndex++)
                {
                    if (outerIndex == innerIndex)
                    {
                        continue;
                    }

                    if (entries[outerIndex] + entries[innerIndex] == TARGET)
                    {
                        return (entries[outerIndex] * entries[innerIndex]).ToString();
                    }
                }
            }
            return "NO RESULT FOUND";
        }

        public string Part2(string[] input)
        {
            int[] entries = Array.ConvertAll(input, Int32.Parse);
            for (int outerIndex = 0; outerIndex < entries.Length; outerIndex++)
            {
                for (int middleIndex = 0; middleIndex < entries.Length; middleIndex++)
                {
                    if (outerIndex == middleIndex)
                    {
                        continue;
                    }
                    for (int innerIndex = 0; innerIndex < entries.Length; innerIndex++)
                    {
                        if (outerIndex == innerIndex || middleIndex == innerIndex)
                        {
                            continue;
                        }

                        if (entries[outerIndex] + entries[middleIndex] + entries[innerIndex] == TARGET)
                        {
                            return (entries[outerIndex] * entries[middleIndex] * entries[innerIndex]).ToString();
                        }
                    }
                }
            }
            return "NO RESULT FOUND";
         }
    }
}