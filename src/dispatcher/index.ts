import type { Action } from "./Action";
import { DebugAction } from "./DebugAction";
import { SyncMoviesAction } from "./SyncMoviesAction";

const AVAILABLE_ACTIONS: Record<string, Action<unknown>> = {
  sync: new SyncMoviesAction(),
  debug: new DebugAction(),
};

export type AVAILABLE_ACTION_KEYS = keyof typeof AVAILABLE_ACTIONS;

export class ActionDispatcher {
  public dispatch(action: string, params: any) {
    const targetAction = AVAILABLE_ACTIONS[action];

    if (!targetAction) {
      throw new Error(
        `tried to dispatch inexistent action \"${targetAction}\"`
      );
    }

    return targetAction.act(params);
  }
}
