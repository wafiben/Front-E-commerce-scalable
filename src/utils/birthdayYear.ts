import moment from "moment";

export const calculateBirthYear = (age: number) => {
  const currentYear = moment().year();
  const birthYear = currentYear - age;
  return birthYear;
};
