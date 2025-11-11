import type { ActionParser, ParsedAction } from "..";
import { Command } from "./commands/Command";
import { DebugCommand } from "./commands/DebugCommand";
import { SyncMoviesCommand } from "./commands/SyncMovies";

interface Input {
  operation: string;
  params?: unknown;
}

type CommandConstructor = new (params: any) => Command<unknown, unknown>;

const commandMap: Record<string, CommandConstructor> = {
  debug: DebugCommand,
  syncMovies: SyncMoviesCommand,
} as const;

export class JSONActionParser implements ActionParser<ParsedAction<unknown>> {
  public parse(b: Buffer): ParsedAction<unknown> | null {
    const serialized = JSON.parse(b.toString()) as Input;

    const operation = serialized.operation;
    const params = serialized.params;

    const match = commandMap[operation];

    if (!match) {
      console.error(`failed to match op ${operation}`);
      return null;
    }

    return new match(params).asAction();
  }
}
