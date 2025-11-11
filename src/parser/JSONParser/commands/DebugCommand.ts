import type { ParsedAction } from "../..";
import { Command } from "./Command";

export class DebugCommand extends Command {
  constructor() {
    super();
  }

  public override asAction(): ParsedAction<void> {
    return {
      id: "debug",
    };
  }
}
