export class TimeoutError extends Error {
  constructor(message = "Operation timeout") {
    super(message);
    this.name = "TimeoutError";
  }
}

export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  return Promise.race([
    promise,

    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new TimeoutError(`Operation exceeded ${timeoutMs}ms`));
      }, timeoutMs);
    }),
  ]);
}
