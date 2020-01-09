export function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertNever(message?: string): void {
  assert(false, message);
}
