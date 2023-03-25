import mitt from 'mitt';

type ChangedEvent<T extends Record<string, unknown>, K extends keyof T = keyof T> = {
  key: K;
  oldValue: T[K];
  newValue: T[K];
};
type GetItemMethod<T extends Record<string, unknown>, K extends keyof T = keyof T> = (
  key: K
) => Promise<T[K] | null>;
type SetItemMethod<T extends Record<string, unknown>, K extends keyof T = keyof T> = (
  key: K,
  value: T[K]
) => Promise<unknown>;
type RemoveItemMethod = (key: string) => Promise<unknown>;
type ClearMethod = () => Promise<unknown>;

const ERROR_NOT_INITIALIZE = 'StorageAdapter is not initialized';

export class StorageAdapter<
  KeyValueTypeMap extends Record<string, unknown> = Record<string, unknown>
> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static #instance?: StorageAdapter;

  static get instance() {
    if (!StorageAdapter.#instance) {
      StorageAdapter.#instance = new StorageAdapter();
    }
    return StorageAdapter.#instance!;
  }

  initialize(payload: {
    getItem: GetItemMethod<KeyValueTypeMap>;
    setItem: SetItemMethod<KeyValueTypeMap>;
    removeItem: RemoveItemMethod;
    clear: ClearMethod;
  }) {
    Object.assign(this, payload);
    this.emit('initialized');
  }

  getItem: GetItemMethod<KeyValueTypeMap> = () => {
    throw new Error(ERROR_NOT_INITIALIZE);
  };

  setItem: SetItemMethod<KeyValueTypeMap> = () => {
    throw new Error(ERROR_NOT_INITIALIZE);
  };

  removeItem: RemoveItemMethod = () => {
    throw new Error(ERROR_NOT_INITIALIZE);
  };

  clear: ClearMethod = () => {
    throw new Error(ERROR_NOT_INITIALIZE);
  };

  emitter = mitt<{
    changed: ChangedEvent<KeyValueTypeMap, keyof KeyValueTypeMap>;
    initialized: void;
  }>();

  on = this.emitter.on.bind(this.emitter);

  emit = this.emitter.emit.bind(this.emitter);
}
