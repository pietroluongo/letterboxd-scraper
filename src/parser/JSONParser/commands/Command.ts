import type { ParsedAction } from "../..";

export abstract class Command<T = void, R = void> {
  constructor(_: T) {}
  abstract asAction(): ParsedAction<R>;
}
