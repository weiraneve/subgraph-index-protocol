import { BigInt } from "@graphprotocol/graph-ts"
import {
    PrincipalPaymentMade as PrincipalPaymentMadeEvent
} from "../../generated/payment/payment"
import { PrincipalPayment, TotalPrincipalPayment } from "../../generated/schema"
import { TOTAL_PAYMENT_AMOUNT } from '../utils/constants'

export function handleIndexPrincipalPaymentMade(event: PrincipalPaymentMadeEvent): void {
    const paymentId = generatePaymentId(event)
    let payment = PrincipalPayment.load(paymentId)

    if (payment == null) {
        payment = new PrincipalPayment(paymentId)
    }

    payment = updatePaymentEntity(payment, event)
    payment.save()

    updateTotalPayment(event)
}

function generatePaymentId(event: PrincipalPaymentMadeEvent): string {
    return event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
}

function updatePaymentEntity(payment: PrincipalPayment, event: PrincipalPaymentMadeEvent): PrincipalPayment {
    payment.borrower = event.params.borrower
    payment.amount = event.params.amount
    payment.timestamp = event.block.timestamp
    payment.blockNumber = event.block.number
    payment.transactionHash = event.transaction.hash

    return payment
}

function updateTotalPayment(event: PrincipalPaymentMadeEvent): void {
    let total = TotalPrincipalPayment.load(TOTAL_PAYMENT_AMOUNT)

    if (total == null) {
        total = new TotalPrincipalPayment(TOTAL_PAYMENT_AMOUNT)
        total.totalAmount = BigInt.fromI32(0)
    }

    total.totalAmount = total.totalAmount.plus(event.params.amount)
    total.save()
}