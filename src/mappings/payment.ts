import { BigInt } from "@graphprotocol/graph-ts"
import {
    PrincipalPaymentMade as PrincipalPaymentMadeEvent
} from "../../generated/payment/payment"
import { PrincipalPayment, TotalPrincipalPayment } from "../../generated/schema"

const TOTAL_PAYMENT_AMOUNT = "total payment amount"
const SECONDS_PER_DAY = BigInt.fromI32(86400)
const DAILY_PENALTY_PERCENTAGE = BigInt.fromI32(1)

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
    payment.lateFeePaid = calculateLateFeePaid(event)

    payment.nextDueDate = event.params.nextDueDate
    payment.principalDue = event.params.principalDue
    payment.unbilledPrincipal = event.params.unbilledPrincipal
    payment.principalDuePaid = event.params.principalDuePaid
    payment.unbilledPrincipalPaid = event.params.unbilledPrincipalPaid

    return payment
}

function calculateLateFeePaid(event: PrincipalPaymentMadeEvent): BigInt {
    let lateFeePaid = BigInt.fromI32(0)

    if (event.block.timestamp.gt(event.params.nextDueDate)) {
        let lateDays = event.block.timestamp
            .minus(event.params.nextDueDate)
            .plus(SECONDS_PER_DAY.minus(BigInt.fromI32(1)))
            .div(SECONDS_PER_DAY)

        let unpaidPrincipal = event.params.principalDue.minus(event.params.principalDuePaid)

        if (unpaidPrincipal.gt(BigInt.fromI32(0))) {
            // 计算方式：未支付金额 * 天数 * 日利率百分比(1%)
            lateFeePaid = unpaidPrincipal
                .times(lateDays)
                .times(DAILY_PENALTY_PERCENTAGE)
                .div(BigInt.fromI32(100))
        }
    }

    return lateFeePaid
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