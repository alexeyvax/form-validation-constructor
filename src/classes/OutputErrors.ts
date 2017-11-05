import { CLASS_SHOW } from '../constants';
import createErrorElement from '../function/createElement';
import { addedClasses, removedClasses } from '../function/toggleClasses';
import { ErrorNotificationElement } from './../interfaces';

class OutputErrors {

  private storeCreateElements: Map<HTMLInputElement, ErrorNotificationElement>;
  private errorNotificationElement: ErrorNotificationElement;

  /* Creates an instance of OutputErrors */
  public constructor() {
    /* Store created tooltips */
    this.storeCreateElements = new Map();
    /* Object with input field and message about error */
    this.errorNotificationElement = Object.create(null);
  }

  public outputWarningToConsole(message: string): void {
    console.error(message);
  }

  /* Sort messages and follow actions them */
  public sortMessages(messages: Map<HTMLInputElement, string>): void {
    messages.forEach((message: string, element: HTMLInputElement) => {
      if (message) {
        this.addElement(element, message);
        this.changeElement(element, message);
      } else if (this.storeCreateElements.has(element)) {
        this.removeElement(element);
      }
    });
  }

  private addElement(element: HTMLInputElement, message: string): void {
    if (this.storeCreateElements.has(element)) {
      return;
    }

    this.errorNotificationElement = {
      createdElement: createErrorElement(element, message),
      message,
    };
    this.storeCreateElements.set(element, this.errorNotificationElement);
  }

  private changeElement(element: HTMLInputElement, message: string): void {
    const neededElement = this.storeCreateElements.get(element) as ErrorNotificationElement;
    if (neededElement.message === message) {
      return;
    }

    (neededElement.createdElement.firstElementChild as HTMLElement).textContent = message;
    neededElement.message = message;
    addedClasses(neededElement.createdElement, CLASS_SHOW);
  }

  private removeElement(element: HTMLInputElement): void {
    const notifyElement = this.storeCreateElements.get(element) as ErrorNotificationElement;
    (notifyElement.createdElement.firstElementChild as HTMLElement).textContent = '';
    notifyElement.message = '';
    removedClasses(notifyElement.createdElement, CLASS_SHOW);
  }
}

export default new OutputErrors();
