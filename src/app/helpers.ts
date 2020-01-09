export function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertNever(_never: never, message?: string): void {
  assert(false, message);
}
