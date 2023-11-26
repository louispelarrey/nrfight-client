export default function debounce(
  mainFunction: (...args: unknown[]) => any,
  delay: number
) {
  let timer: NodeJS.Timeout;

  return function (...args: unknown[]) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
}
