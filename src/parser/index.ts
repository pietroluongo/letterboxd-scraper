import type { AVAILABLE_ACTION_KEYS } from "../dispatcher";

export interface ParsedAction<T> {
  id: AVAILABLE_ACTION_KEYS;
  params?: T;
}

export abstract class ActionParser<T extends ParsedAction<unknown>> {
  public abstract parse(b: Buffer): T | null;
}
