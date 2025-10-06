import { pipe } from "fp-ts/function";
import { fu } from "./utils/fu";

const isNotEmpty = (input: string) => {
  return input.trim() !== "";
};

const isMinLength = (min: number) => (input: string) =>
  input.length >= min;

const alphanumericregex = /^[a-z0-9]+$/i;
const isAlphaNumeric = (input: string): boolean =>
  alphanumericregex.test(input);
const isNotAlphaNumeric = (input: string) => !isAlphaNumeric(input);

const numericRegex = /\d/;
const isNumeric = (input: string): boolean => numericRegex.test(input);

/**********
    Username Validation Logic
**********/
export function validateUsername(input: string) {
  return pipe(
    input,
    fu.tap("Username passing"), // initial tap
    fu.packBox(isNotEmpty, () => "Username must not be empty"),
    fu.tap("Username after packing"), // after packBox
    fu.mapRightBoxWithPredicate(
      isMinLength(5),
      `Username must be at least 5 characters`
    ),
    fu.mapRightBoxWithPredicate(
      isAlphaNumeric,
      "Username must be alphanumeric"
    ),
    fu.unpackBox(
      (message) => ({ isValid: false as const, message }),
      () => ({ isValid: true as const })
    )
  );
}

/**********
    Password Validation Logic
**********/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validatePassword(input: string, username: string) {
  return pipe(
    input,
    fu.tap("Password passing"), // initial tap
    fu.packBox(isNotEmpty, () => "Password must not be empty"),
    fu.tap("Password after packing"), // after packBox
    fu.mapRightBoxWithPredicate(
      isMinLength(7),
      `Password must be at least 7 characters`
    ),
    fu.mapRightBoxWithPredicate(
      isNotAlphaNumeric,
      "Must have special characters"
    ),
    fu.mapRightBoxWithPredicate(
      isNumeric,
      "Must have numeric characters"
    ),
    fu.unpackBox(
      (message) => ({ isValid: false as const, message }),
      () => ({ isValid: true as const })
    )
  );
}
