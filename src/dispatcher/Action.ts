export abstract class Action<T = void, R = void | Promise<void>> {
  abstract act(params: T): R;
}
