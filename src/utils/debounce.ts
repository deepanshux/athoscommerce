export const debounce = <Callback extends (...args: never[]) => void>(
  callback: Callback,
  delay: number,
): ((...args: Parameters<Callback>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<Callback>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};