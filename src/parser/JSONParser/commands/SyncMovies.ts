import type { ParsedAction } from "../..";
import { Command } from "./Command";

export interface SyncMoviesParams {
  user: string;
}

export interface ParsedSyncAction {
  user: string;
}

export class SyncMoviesCommand extends Command<
  SyncMoviesParams,
  ParsedSyncAction
> {
  private readonly user: string;
  constructor(params: SyncMoviesParams) {
    super(params);
    if (!params?.user) {
      throw new Error("failed to parse sync request - missing user!");
    }
    this.user = params.user;
  }

  public override asAction() {
    return {
      id: "sync",
      params: {
        user: this.user,
      },
    };
  }
}
