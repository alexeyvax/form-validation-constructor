import { CLASS_MESSAGE, CLASS_SHOW, CLASS_TOOLTIP } from '../constants';
import { addedClasses } from './toggleClasses';

const createErrorElement = (
  element: HTMLInputElement,
  message: string,
): HTMLSpanElement => {
  const tooltip = document.createElement('div');
  const content = document.createElement('span');

  addedClasses(content, CLASS_MESSAGE);
  addedClasses(tooltip, CLASS_TOOLTIP);
  setTimeout(() => addedClasses(tooltip, CLASS_SHOW), 100);

  content.textContent = message;
  tooltip.appendChild(content);
  (element.parentElement as HTMLLIElement).insertBefore(tooltip, element);

  return tooltip;
};

export default createErrorElement;
