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

const isNotReservedWord = (input: string): boolean => {
  return input.trim() !== "admin";
};

const tryCeo = (input: string) => (e: string) => {
  return input === "ceo" ? fu.packRightBox(input) : fu.packLeftBox(e);
};

const areStringsNotEqual = (username: string) => (password: string) => {
  return !password.includes(username);
};

/**********
    Try email functionality
**********/
const tryEmail = (input: string) => (originalErr: string) => {
  return pipe(input, (x: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(x)
      ? fu.packRightBox(x)
      : fu.packLeftBox(originalErr);
  });
};

const isNotMostCommonPassword = (input: string): boolean =>
  !["password1!", "123456!", "123456789!"].includes(input);

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
    fu.mapRightBoxWithPredicate(
      isNotReservedWord,
      "Username must not be a reserved word"
    ),
    fu.ifLeftBoxTryThis(tryCeo(input)),
    fu.ifLeftBoxTryThis(tryEmail(input)),
    fu.unpackBox(
      (message) => ({ isValid: false as const, message }),
      () => ({ isValid: true as const })
    )
  );
}

/**********
    Password Validation Logic
**********/
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
    fu.mapRightBoxWithPredicate(
      areStringsNotEqual(username),
      "Password cannot contain username"
    ),
    fu.mapRightBoxWithPredicate(
      isNotMostCommonPassword,
      "Password cannot be most commonly used"
    ),
    fu.unpackBox(
      (message) => ({ isValid: false as const, message }),
      () => ({ isValid: true as const })
    )
  );
}
