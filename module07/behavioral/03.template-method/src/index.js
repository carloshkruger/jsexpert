import { OrderBusiness } from "./business/orderBusiness.js";
import { Order } from "./entities/order.js";

const order = new Order({
  customerId: 1,
  amount: 100_000,
  products: [
    {
      description: 'car'
    }
  ]
})
const orderBusiness = new OrderBusiness()
orderBusiness.create(order)