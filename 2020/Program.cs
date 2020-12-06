using System;
using System.IO;

namespace AoC
{
    class Program
    {
        static void Main(string[] args)
        {
            int dayNumber = Int32.Parse(args[0]);
            string[] input = File.ReadAllLines(args[1]);

            Type puzzleType = Type.GetType(typeName: $"AoC.Day{dayNumber}");

            AoC.IPuzzle puzzle1 = (AoC.IPuzzle)Activator.CreateInstance(puzzleType);
            Console.WriteLine("Part 1");
            Console.WriteLine(puzzle1.Part1(input));

            AoC.IPuzzle puzzle2 = (AoC.IPuzzle)Activator.CreateInstance(puzzleType);
            Console.WriteLine("Part 2");
            Console.WriteLine(puzzle2.Part2(input));
        }
    }
}
