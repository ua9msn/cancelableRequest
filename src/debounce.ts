interface AsyncFn {
  (arg: any): Promise<any>;
}

export function debounce(callee: AsyncFn, timeoutMs: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return async function perform(...args) {
    console.log("calling perform", timeout);
    clearTimeout(timeout);
    return new Promise((resolve, reject) => {
      timeout = setTimeout(
        async () => {
          console.log("run", timeout);
          const result = await callee(args);
          timeout = 0;
          resolve(result);
        },
        timeout ? timeoutMs : 0,
      );
    });
  };
}
