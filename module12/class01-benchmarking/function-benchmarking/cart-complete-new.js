import { randomUUID } from "crypto";
import Product from "../src/entities/product.js";

export default class Cart {
  constructor({ at, products }) {
    this.id = randomUUID();
    this.at = at;
    this.products = [];
    this.total = 0;
    this.createProductsAndCalculateTotalPrice(products);
  }

  createProductsAndCalculateTotalPrice(products) {
    const productEntities = [];
    let total = 0;

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) {
        continue;
      }
      keys.forEach(
        (key) => product[key] || Reflect.deleteProperty(product, key)
      );
      const productEntity = new Product(product);
      total += productEntity.price;
      productEntities.push(productEntity);
    }

    this.products = productEntities;
    this.total = total;
  }
}
