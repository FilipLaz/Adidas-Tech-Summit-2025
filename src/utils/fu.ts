import type * as Either from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either";

// Functions renamed to be more descriptive and better reflect their purpose otherwise same as FP-TS provides
export const fu = {
  packBox: E.fromPredicate,
  unpackBox: E.foldW,
  mapRightBoxThatCanFail: E.flatMap,
  ifLeftBoxTryThis: E.orElse,
  mapLeftBox: E.mapLeft,
  packLeftBox: E.left,
  packRightBox: E.right,
  mapRightBoxWithPredicate: <A, Err>(
    predicate: (a: A) => boolean,
    message: Err
  ) =>
    E.flatMap<A, Err, A>(
      E.fromPredicate<A, Err>(predicate, () => message)
    ),
  // Pass true function - useful to inspect values in the middle of a pipe chain
  tap:
    <A>(message: string) =>
    (inp: A): A => {
      const formatedText =
        typeof inp === "object" ? JSON.stringify(inp, null, 2) : inp;
      console.log(`TAP ${message}: ${formatedText}`);
      return inp;
    },
};

// fp-ts Left and Right types are renamed to be more descriptive
export type LeftBox<T> = Either.Left<T>;
export type RightBox<T> = Either.Right<T>;
export type LeftOrRightBox<L, R> = Either.Either<L, R>;
