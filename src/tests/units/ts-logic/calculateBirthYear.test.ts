import moment from "moment";
import { calculateBirthYear } from "../../../utils/birthdayYear";

jest.mock("moment", () => {
  return () => ({
    year: () => 2025,
  });
});

describe("calculateBirthYear", () => {
  it("should calculate birth year correctly", () => {
    const age = 25;
    const result = calculateBirthYear(age);

    expect(result).toBe(2000);
  });

  it("should return correct year for age 0", () => {
    expect(calculateBirthYear(0)).toBe(2025);
  });
});
