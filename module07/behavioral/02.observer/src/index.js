import { Payment } from "./events/payment.js";
import { Marketing } from "./observers/marketing.js";
import { Shipment } from "./observers/shipment.js";
import { PaymentSubject } from "./subjects/paymentSubject.js";

const subject = new PaymentSubject()
const marketing = new Marketing()
const shipment = new Shipment()

subject.subscribe(marketing)
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({ userName: 'Carlos', id: Date.now() })