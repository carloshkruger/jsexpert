import Benchmark from "benchmark";
import CartIdOld from "./cart-id-old.js";
import CartIdNew from "./cart-id-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartRmPropNew from "./cart-rm-prop-new.js";
import database from "../database.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";
import CartCompleteOld from "./cart-complete-old.js";
import CartCompleteNew from "./cart-complete-new.js";

const suite = new Benchmark.Suite();

// suite
//   .add("Cart#cartIdUUID", function () {
//     new CartIdOld();
//   })
//   .add("Cart#cartIdCrypto", function () {
//     new CartIdNew();
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run();

// const data = {
//   products: [
//     {
//       id: "ae",
//       a: undefined,
//       b: undefined,
//       c: 123,
//     },
//     {
//       id: "ae",
//       a: undefined,
//       b: undefined,
//       c: 123,
//     },
//   ],
// };

// suite
//   .add("Cart#EmptyPropMapReduce", function () {
//     new CartRmPropOld(data);
//   })
//   .add("Cart#EmptyPropFor", function () {
//     new CartRmPropNew(data);
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });

// suite
//   .add("Cart#PriceMapReduce", function () {
//     new CartPriceOld(database);
//   })
//   .add("Cart#PriceFor", function () {
//     new CartPriceNew(database);
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });

suite
  .add("Cart#CompleteProcessOld", function () {
    new CartCompleteOld(database);
  })
  .add("Cart#CompleteProcessNew", function () {
    new CartCompleteNew(database);
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
