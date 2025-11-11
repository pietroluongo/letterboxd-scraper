import { Action } from "./Action";

export class DebugAction extends Action {
  override act() {
    console.log("debug action called!");
  }
}
