using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AoC
{
    class Passport : Dictionary<string, string>
    {
        private static readonly string[] VALID_EYE_COLOURS = {"amb", "blu", "brn", "gry", "grn", "hzl", "oth"};

        public Passport(string passportEntry)
        {
            foreach (string field in passportEntry.Split(' '))
            {
                string[] splitField = field.Split(':');

                if (splitField.Length == 2)
                {
                    Add(splitField[0], splitField[1]);
                }
            }
        }

        public bool IsValid(bool validateFormat = false)
        {
            string[] requiredAttrs = new string[] {
                "byr",
                "iyr",
                "eyr",
                "hgt",
                "hcl",
                "ecl",
                "pid",
            };

            foreach (string requiredKey in requiredAttrs)
            {
                if (!ContainsKey(requiredKey))
                {
                    return false;
                }

                if (validateFormat && !IsValidValue(requiredKey, this[requiredKey]))
                {
                    return false;
                }
            }

            return true;
        }

        public static bool IsValidValue(string key, string value)
        {
            try
            {
                switch (key)
                {
                    case "byr":
                        return Int32.Parse(value) is >= 1920 and <= 2002;
                    case "iyr":
                        return Int32.Parse(value) is >= 2010 and <= 2020;
                    case "eyr":
                        return Int32.Parse(value) is >= 2020 and <= 2030;
                    case "hgt":
                        if (value.EndsWith("cm"))
                        {
                            return Int32.Parse(value.Remove(value.Length - 2)) is >= 150 and <= 193;
                        }
                        else if (value.EndsWith("in"))
                        {
                            return Int32.Parse(value.Remove(value.Length - 2)) is >= 59 and <= 76;
                        }
                        return false;
                    case "hcl":
                        return Regex.Match(value, @"^#[0-9a-f]{6}$").Success;
                    case "ecl":
                        return VALID_EYE_COLOURS.Contains(value);
                    case "pid":
                        return Regex.Match(value, @"^\d{9}$").Success;
                    case "cid":
                        return true;
                    default:
                        return false;
                }
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}