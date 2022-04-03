import { randomUUID } from "crypto";
import Product from "./product.js";

export default class Cart {
  constructor({ at, products }) {
    this.id = randomUUID();
    this.at = at;
    this.products = this.removeUndefinedProps(products);
    this.total = this.getCartPrice();
  }

  removeUndefinedProps(products) {
    // const productEntities = []

    // for (const product of products) {
    //   if (!Reflect.ownKeys(product).length) {
    //     continue
    //   }

    //   Reflect.deleteProperty(product, "tmpProperty");
    //   const productEntity = new Product(product);

    //   this.total += productEntity.price
    //   productEntities.push(productEntity);
    // }
    // return productEntities;

    const productEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product));

    return JSON.parse(JSON.stringify(productEntities));
  }

  getCartPrice() {
    return this.products
      .map((product) => product.price)
      .reduce((prev, next) => prev + next, 0);
  }
}
