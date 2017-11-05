export interface Config {
  lang?: string;
  listOfChecks?: Check[];
}

export interface Check {
  'instructions-ru': string;
  'instructions-en': string;
  name: string;
  typeField: string[];
  validate(input: HTMLInputElement): boolean;
}

export interface CheckItem {
  name: string;
  typeField: string[];
}

export interface DataInput {
  inputElement: HTMLInputElement;
  name: string;
  config: string[];
}

export interface ConfigValidation {
  [key: string]: string[];
}

export interface ErrorNotificationElement {
  createdElement: HTMLElement;
  message: string;
}

export interface TypesValidation {
  [key: string]: Types|any;
}

interface Types {
  [key: number]: string;
  INSTRUCTION_EN: string;
  INSTRUCTION_RU: string;
  validate(input: HTMLInputElement|HTMLInputElement[]): boolean;
}
