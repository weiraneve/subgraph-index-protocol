import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as"
import { DrawdownMade } from "../../generated/drawdown/drawdown"

export function createDrawdownMadeEvent(
    borrower: Address,
    borrowAmount: BigInt,
    blockNumber: BigInt,
    timestamp: BigInt
): DrawdownMade {
    let event = changetype<DrawdownMade>(newMockEvent())
    event.block.number = blockNumber
    event.block.timestamp = timestamp

    event.transaction.hash = Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000" + blockNumber.toString())
    event.logIndex = BigInt.fromI32(0)

    event.parameters = []

    let borrowerParam = new ethereum.EventParam(
        "borrower",
        ethereum.Value.fromAddress(borrower)
    )
    let borrowAmountParam = new ethereum.EventParam(
        "borrowAmount",
        ethereum.Value.fromUnsignedBigInt(borrowAmount)
    )

    event.parameters.push(borrowerParam)
    event.parameters.push(borrowAmountParam)

    return event
}

export function createCompleteDrawdownMadeEvent(
    borrower: string = "0x0000000000000000000000000000000000000001",
    borrowAmount: string = "1000",
    blockNumber: string = "1",
    timestamp: string = "1234567890"
): DrawdownMade {
    return createDrawdownMadeEvent(
        Address.fromString(borrower),
        BigInt.fromString(borrowAmount),
        BigInt.fromString(blockNumber),
        BigInt.fromString(timestamp)
    )
}