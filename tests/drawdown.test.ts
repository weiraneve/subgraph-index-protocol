import { assert, beforeEach, describe, test, clearStore } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { handleIndexDrawdownMade } from "../src/mappings/drawdown"
import {
    createDrawdownMadeEvent,
    createCompleteDrawdownMadeEvent
} from "./utils/drawdown-test-utils"

describe("handleIndexDrawdownMade", () => {
    beforeEach(() => {
        clearStore()
    })

    test("Should handle new drawdown correctly", () => {
        const event = createCompleteDrawdownMadeEvent()
        handleIndexDrawdownMade(event)

        const drawdownId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

        assert.entityCount("Drawdown", 1)
        assert.fieldEquals(
            "Drawdown",
            drawdownId,
            "borrower",
            "0x0000000000000000000000000000000000000001"
        )
        assert.fieldEquals("Drawdown", drawdownId, "amount", "1000")
        assert.fieldEquals("Drawdown", drawdownId, "blockNumber", "1")
        assert.fieldEquals("Drawdown", drawdownId, "timestamp", "1234567890")
    })

    test("Should handle multiple drawdowns correctly", () => {
        const event1 = createDrawdownMadeEvent(
            Address.fromString("0x0000000000000000000000000000000000000001"),
            BigInt.fromI32(1000),
            BigInt.fromI32(1),
            BigInt.fromI32(1234567890)
        )
        event1.transaction.hash = Bytes.fromHexString("0x000000000000000000000000000000000000000000000000000000000000abcd")
        event1.logIndex = BigInt.fromI32(0)

        handleIndexDrawdownMade(event1)

        const event2 = createDrawdownMadeEvent(
            Address.fromString("0x0000000000000000000000000000000000000002"),
            BigInt.fromI32(2000),
            BigInt.fromI32(2),
            BigInt.fromI32(1234567891)
        )
        event2.transaction.hash = Bytes.fromHexString("0x000000000000000000000000000000000000000000000000000000000000efgh")
        event2.logIndex = BigInt.fromI32(0)

        handleIndexDrawdownMade(event2)

        assert.entityCount("Drawdown", 2)

        const drawdownId1 = event1.transaction.hash.toHexString() + "-" + event1.logIndex.toString()
        assert.fieldEquals(
            "Drawdown",
            drawdownId1,
            "amount",
            "1000"
        )

        const drawdownId2 = event2.transaction.hash.toHexString() + "-" + event2.logIndex.toString()
        assert.fieldEquals(
            "Drawdown",
            drawdownId2,
            "amount",
            "2000"
        )

        assert.fieldEquals(
            "TotalDrawdown",
            "total drawdown amount",
            "totalAmount",
            "3000"
        )
    })
})