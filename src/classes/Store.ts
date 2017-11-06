import outputErrors from './OutputErrors';

class Store {
  private errors: Map<HTMLInputElement, string>;
  private lang: string;

  /* Creates an instance of Store */
  public constructor() {
    this.errors = new Map();
  }

  public getMessage(): void {
    outputErrors.sortMessages(this.errors);
  }

  public getErrors(): Map<HTMLInputElement, string> {
    return this.errors;
  }

  public setErrors(inputElement: HTMLInputElement, message: string): void {
    this.errors.set(inputElement, message);
  }

  public getCurrentLanguage(): string {
    return this.lang;
  }

  public setCurrentLanguage(lang: string): void {
    this.lang = lang;
  }
}

export default new Store();
