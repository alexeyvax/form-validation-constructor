import {
  CHECKBOX, events, listOfSearchedItems, RADIO,
} from '../constants';
import checkAttrGroup from '../function/checkAttrGroup';
import checkValue from '../function/checkValue';
import checkValueGroup from '../function/checkValueGroup';
import debounce from '../function/debounce';
import findWarning from '../function/findWarning';
import sortGroups from '../function/sortGroups';
import { DataInput } from './../interfaces';
import store from './Store';

/* The main class for validation form */
class Validation {

  public dataSimpleInput: DataInput[];
  public dataGroupElements: HTMLInputElement[][];

  private form: HTMLFormElement;
  private listInputElement: NodeListOf<Element>; // HTMLInputElement
  private isFormRegisterHandler: boolean;
  private boundFormInputHandler: (event: Event) => void;
  private boundFormChangeHandler: (event: Event) => void;

  /* Creates an instance of Validation */
  public constructor(form: HTMLFormElement) {
    this.form = form;
    this.listInputElement = form.querySelectorAll(listOfSearchedItems);

    this.dataSimpleInput = [];
    this.dataGroupElements = [];
    this.isFormRegisterHandler = false;

    this.boundFormInputHandler = debounce((e: Event) => this.validation(e), 100, true);
    this.boundFormChangeHandler = debounce((e: Event) => this.validation(e), 100, true);
    this.registerHandlers();
  }

  private registerHandlers(): void {
    this.init();
    this.form.addEventListener(events.SUBMIT, (e: Event) => this.validation(e));
  }

  private formRegisterHandlers(): void {
    if (!this.isFormRegisterHandler) {
      this.form.addEventListener(events.INPUT, this.boundFormInputHandler);
      this.form.addEventListener(events.CHANGE, this.boundFormChangeHandler);
      this.isFormRegisterHandler = true;
    }
  }

  private formUnRegisterHandlers(): void {
    this.form.removeEventListener(events.INPUT, this.boundFormInputHandler);
    this.form.removeEventListener(events.CHANGE, this.boundFormChangeHandler);
    this.isFormRegisterHandler = false;
  }

  /* Passes through the list of forms of gathering data about each */
  private init(): void {
    const listOfGroups = [] as HTMLInputElement[];

    Array.prototype.forEach.call(
      this.listInputElement,
      (inputElement: HTMLInputElement) => {
        const dataset = inputElement.dataset.options;

        if (!dataset) {
          return;
        }

        const datasetToArray = dataset.split(' ');

        if ((inputElement.type === RADIO)
          || (inputElement.type === CHECKBOX)
          || datasetToArray.some(checkAttrGroup)) {
          listOfGroups.push(inputElement);
          return;
        }

        const simpleInput = {
          inputElement,
          name: inputElement.name,
          config: findWarning(inputElement, datasetToArray),
        };
        this.dataSimpleInput.push(simpleInput);
      },
    );
    this.dataGroupElements = sortGroups(listOfGroups);
  }

  /* Checks forms */
  private validation(event: Event): void {
    let trigger = false as boolean;
    event.preventDefault();
    /** check the ordinary fields */
    checkValue(this.dataSimpleInput);
    /** checking the group fields */
    checkValueGroup(this.dataGroupElements);

    store.getMessage();
    store.getErrors().forEach((message: string) => {
      if (message !== '') {
        trigger = true;
        this.formRegisterHandlers();
      }
    });

    if (!trigger && event.type === events.SUBMIT) {
      this.formUnRegisterHandlers();
      this.form.submit();
    }
  }
}

export default Validation;
