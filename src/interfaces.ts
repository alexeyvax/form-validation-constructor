import { Warnings } from './interfaces';

export interface Config {
  lang?: string;
  listOfChecks?: CheckItem[];
}

export interface CheckItem {
  [key: number]: string;
  name: string;
  typeField: string[];
  instructions: Warnings;
  validate(input: HTMLInputElement|HTMLInputElement[]): boolean;
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
  [key: string]: Types;
}

interface Types {
  [key: number]: string;
  validate(input: HTMLInputElement|HTMLInputElement[]): boolean;
}

export interface Warnings {
  [key: string]: WarningItem;
}

export interface WarningItem {
  [key: string]: string;
}
