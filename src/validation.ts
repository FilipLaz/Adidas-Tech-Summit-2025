import { pipe } from "fp-ts/function";
import { fu } from "./utils/fu";

/**********
    Username Validation Logic
**********/
export function validateUsername(input: string) {
  return pipe(
    input,
    fu.tap("Username passing"), // initial tap
    () => ({
      isValid: true as const,
    })
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
    () => ({
      isValid: true as const,
    })
  );
}
