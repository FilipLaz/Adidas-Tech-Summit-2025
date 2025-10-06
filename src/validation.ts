import { pipe } from "fp-ts/function";
import { fu } from "./utils/fu";

const isNotEmpty = (input: string) => {
  return input.trim() !== "";
};

/**********
    Username Validation Logic
**********/
export function validateUsername(input: string) {
  return pipe(
    input,
    fu.tap("Username passing"), // initial tap
    fu.packBox(isNotEmpty, () => "Username must not be empty"),
    fu.tap("Username after packing"), // after packBox
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
    fu.unpackBox(
      (message) => ({ isValid: false as const, message }),
      () => ({ isValid: true as const })
    )
  );
}
