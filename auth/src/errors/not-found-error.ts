import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = ('Route Not Found');
  constructor (){
    super('Route Not Found');

    // because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialiseErrors() {
    return [{ message: this.reason }]
  }
}