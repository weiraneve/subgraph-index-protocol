import { assert, beforeEach, describe, test, clearStore } from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { handleIndexPrincipalPaymentMade } from "../src/mappings/payment"
import {
    createPrincipalPaymentMadeEvent,
    createCompletePrincipalPaymentMadeEvent
} from "./utils/payment-test-utils"

describe("handleIndexPrincipalPaymentMade", () => {
    beforeEach(() => {
        clearStore()
    })

    test("Should handle normal payment correctly", () => {
        const event = createCompletePrincipalPaymentMadeEvent()
        handleIndexPrincipalPaymentMade(event)

        const paymentId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

        assert.entityCount("PrincipalPayment", 1)
        assert.fieldEquals(
            "PrincipalPayment",
            paymentId,
            "borrower",
            "0x0000000000000000000000000000000000000001"
        )
        assert.fieldEquals("PrincipalPayment", paymentId, "amount", "1000")
        assert.fieldEquals("PrincipalPayment", paymentId, "lateFeePaid", "0")
        assert.fieldEquals("PrincipalPayment", paymentId, "principalDue", "1000")
        assert.fieldEquals("PrincipalPayment", paymentId, "principalDuePaid", "1000")
        assert.fieldEquals("PrincipalPayment", paymentId, "unbilledPrincipal", "0")
        assert.fieldEquals("PrincipalPayment", paymentId, "unbilledPrincipalPaid", "0")
    })

    test("Should calculate late fee for overdue payment", () => {
        const currentTimestamp = BigInt.fromI32(1234567890)
        const dueDate = currentTimestamp.minus(BigInt.fromI32(172800))

        const event = createPrincipalPaymentMadeEvent(
            Address.fromString("0x0000000000000000000000000000000000000001"),
            Address.fromString("0x0000000000000000000000000000000000000002"),
            BigInt.fromI32(1000),
            dueDate,
            BigInt.fromI32(1000),
            BigInt.fromI32(0),
            BigInt.fromI32(500),
            BigInt.fromI32(0),
            Address.fromString("0x0000000000000000000000000000000000000003"),
            BigInt.fromI32(1),
            currentTimestamp
        )

        handleIndexPrincipalPaymentMade(event)

        const paymentId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

        assert.fieldEquals("PrincipalPayment", paymentId, "lateFeePaid", "10")
        assert.fieldEquals("PrincipalPayment", paymentId, "principalDue", "1000")
        assert.fieldEquals("PrincipalPayment", paymentId, "principalDuePaid", "500")
    })

    test("Should handle multiple payments correctly", () => {
        const event1 = createPrincipalPaymentMadeEvent(
            Address.fromString("0x0000000000000000000000000000000000000001"),
            Address.fromString("0x0000000000000000000000000000000000000002"),
            BigInt.fromI32(1000),
            BigInt.fromI32(1234567890),
            BigInt.fromI32(1000),
            BigInt.fromI32(0),
            BigInt.fromI32(1000),
            BigInt.fromI32(0),
            Address.fromString("0x0000000000000000000000000000000000000003"),
            BigInt.fromI32(1),
            BigInt.fromI32(1234567890)
        )

        handleIndexPrincipalPaymentMade(event1)

        const event2 = createPrincipalPaymentMadeEvent(
            Address.fromString("0x0000000000000000000000000000000000000002"),
            Address.fromString("0x0000000000000000000000000000000000000003"),
            BigInt.fromI32(2000),
            BigInt.fromI32(1234567890),
            BigInt.fromI32(2000),
            BigInt.fromI32(0),
            BigInt.fromI32(2000),
            BigInt.fromI32(0),
            Address.fromString("0x0000000000000000000000000000000000000004"),
            BigInt.fromI32(2),
            BigInt.fromI32(1234567891)
        )

        handleIndexPrincipalPaymentMade(event2)

        assert.entityCount("PrincipalPayment", 2)

        const paymentId1 = event1.transaction.hash.toHexString() + "-" + event1.logIndex.toString()
        const paymentId2 = event2.transaction.hash.toHexString() + "-" + event2.logIndex.toString()

        assert.fieldEquals(
            "PrincipalPayment",
            paymentId1,
            "amount",
            "1000"
        )
        assert.fieldEquals(
            "PrincipalPayment",
            paymentId2,
            "amount",
            "2000"
        )
        assert.fieldEquals(
            "TotalPrincipalPayment",
            "total payment amount",
            "totalAmount",
            "3000"
        )
    })
})