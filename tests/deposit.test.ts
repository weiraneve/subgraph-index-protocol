import { assert, beforeEach, describe, test, clearStore } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { handleIndexLiquidityDeposited } from "../src/mappings/deposit"
import {
    createLiquidityDepositedEvent,
    createCompleteLiquidityDepositedEvent
} from "./utils/deposited-test-utils"

describe("handleIndexLiquidityDeposited", () => {
    beforeEach(() => {
        clearStore()
    })

    test("Should handle new deposit correctly", () => {
        const event = createCompleteLiquidityDepositedEvent()
        handleIndexLiquidityDeposited(event)

        const depositId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

        assert.entityCount("Deposit", 1)
        assert.fieldEquals(
            "Deposit",
            depositId,
            "lender",
            "0x0000000000000000000000000000000000000001"
        )
        assert.fieldEquals("Deposit", depositId, "amount", "1000")
        assert.fieldEquals("Deposit", depositId, "shares", "1000")
    })

    test("Should handle multiple deposits correctly", () => {
        const event1 = createLiquidityDepositedEvent(
            Address.fromString("0x0000000000000000000000000000000000000001"),
            BigInt.fromI32(1000),
            BigInt.fromI32(1000),
            BigInt.fromI32(1),
            BigInt.fromI32(1234567890)
        )
        event1.transaction.hash = Bytes.fromHexString("0x000000000000000000000000000000000000000000000000000000000000abcd")
        event1.logIndex = BigInt.fromI32(0)

        handleIndexLiquidityDeposited(event1)

        const event2 = createLiquidityDepositedEvent(
            Address.fromString("0x0000000000000000000000000000000000000002"),
            BigInt.fromI32(2000),
            BigInt.fromI32(2000),
            BigInt.fromI32(2),
            BigInt.fromI32(1234567891)
        )
        event2.transaction.hash = Bytes.fromHexString("0x000000000000000000000000000000000000000000000000000000000000efgh")
        event2.logIndex = BigInt.fromI32(0)

        handleIndexLiquidityDeposited(event2)

        assert.entityCount("Deposit", 2)

        const depositId1 = event1.transaction.hash.toHexString() + "-" + event1.logIndex.toString()
        assert.fieldEquals(
            "Deposit",
            depositId1,
            "amount",
            "1000"
        )

        const depositId2 = event2.transaction.hash.toHexString() + "-" + event2.logIndex.toString()
        assert.fieldEquals(
            "Deposit",
            depositId2,
            "amount",
            "2000"
        )

        assert.fieldEquals(
            "TotalDeposit",
            "total deposit amount",
            "totalAmount",
            "3000"
        )
    })
})