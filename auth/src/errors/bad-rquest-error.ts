import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 500;
  constructor (public message: string){
    super(message);

    // because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialiseErrors() {
    return [{ message: this.message }]
  }
}