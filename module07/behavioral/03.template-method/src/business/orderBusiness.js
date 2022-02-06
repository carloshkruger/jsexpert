import { BaseBusiness } from "./base/baseBusiness.js";

export class OrderBusiness extends BaseBusiness {
  #order = new Set()

  _validateRequiredFields(data) {
    return !!data.amount && data.products.length > 0
  }

  _create(data) {
    this.#order.add(data)
    return true
  }
} 