/* Perform function more than once, Is not exceeded the interval between calls */
function debounce<T extends Function>(
  func: T,
  threshold: number = 100,
  atBeginning: boolean = false,
): T
{
  let timerId: any;
  return function debounced(this: any, ...rest: any[]): void {
    if (timerId) {
      clearTimeout(timerId);
    } else if (atBeginning) {
      func.apply(this, rest);
    }

    timerId = setTimeout(() => {
        if (!atBeginning) {
          func.apply(this, rest);
        }

        timerId = 0;
      },
      threshold,
    );
  } as any;
}

export default debounce;
