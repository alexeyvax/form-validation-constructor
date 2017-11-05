const addedClasses = (
  element: HTMLInputElement|HTMLSpanElement,
  className: string,
) => element.classList.add(className);

const removedClasses = (
  element: HTMLInputElement|HTMLSpanElement,
  className: string,
) => element.classList.remove(className);

export {
  addedClasses,
  removedClasses,
};
