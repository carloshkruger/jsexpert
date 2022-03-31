import { BaseError } from "./baseError.js";

export class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({
      message: errorMessage,
      name: BusinessError.name,
    });
  }
}
