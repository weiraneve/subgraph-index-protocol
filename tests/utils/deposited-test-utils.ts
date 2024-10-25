import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as"
import { LiquidityDeposited } from "../../generated/juniorDepositRecords/deposit"

export function createLiquidityDepositedEvent(
    sender: Address,
    assets: BigInt,
    shares: BigInt,
    blockNumber: BigInt,
    timestamp: BigInt
): LiquidityDeposited {
    let event = changetype<LiquidityDeposited>(newMockEvent())
    event.block.number = blockNumber
    event.block.timestamp = timestamp

    event.transaction.hash = Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000" + blockNumber.toString())
    event.logIndex = BigInt.fromI32(0)

    event.parameters = []

    let senderParam = new ethereum.EventParam(
        "sender",
        ethereum.Value.fromAddress(sender)
    )
    let assetsParam = new ethereum.EventParam(
        "assets",
        ethereum.Value.fromUnsignedBigInt(assets)
    )
    let sharesParam = new ethereum.EventParam(
        "shares",
        ethereum.Value.fromUnsignedBigInt(shares)
    )

    event.parameters.push(senderParam)
    event.parameters.push(assetsParam)
    event.parameters.push(sharesParam)

    return event
}

export function createCompleteLiquidityDepositedEvent(
    sender: string = "0x0000000000000000000000000000000000000001",
    assets: string = "1000",
    shares: string = "1000",
    blockNumber: string = "1",
    timestamp: string = "1234567890"
): LiquidityDeposited {
    return createLiquidityDepositedEvent(
        Address.fromString(sender),
        BigInt.fromString(assets),
        BigInt.fromString(shares),
        BigInt.fromString(blockNumber),
        BigInt.fromString(timestamp)
    )
}