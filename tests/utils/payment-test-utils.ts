import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as"
import { PrincipalPaymentMade } from "../../generated/payment/payment"

export function createPrincipalPaymentMadeEvent(
    borrower: Address,
    payer: Address,
    amount: BigInt,
    nextDueDate: BigInt,
    principalDue: BigInt,
    unbilledPrincipal: BigInt,
    principalDuePaid: BigInt,
    unbilledPrincipalPaid: BigInt,
    by: Address,
    blockNumber: BigInt,
    timestamp: BigInt
): PrincipalPaymentMade {
    let mockEvent = newMockEvent()
    let event = changetype<PrincipalPaymentMade>(mockEvent)

    event.block.number = blockNumber
    event.block.timestamp = timestamp
    event.transaction.hash = Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000" + blockNumber.toString())
    event.logIndex = BigInt.fromI32(0)

    event.parameters = new Array()
    event.parameters.push(new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower)))
    event.parameters.push(new ethereum.EventParam("payer", ethereum.Value.fromAddress(payer)))
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)))
    event.parameters.push(new ethereum.EventParam("nextDueDate", ethereum.Value.fromUnsignedBigInt(nextDueDate)))
    event.parameters.push(new ethereum.EventParam("principalDue", ethereum.Value.fromUnsignedBigInt(principalDue)))
    event.parameters.push(new ethereum.EventParam("unbilledPrincipal", ethereum.Value.fromUnsignedBigInt(unbilledPrincipal)))
    event.parameters.push(new ethereum.EventParam("principalDuePaid", ethereum.Value.fromUnsignedBigInt(principalDuePaid)))
    event.parameters.push(new ethereum.EventParam("unbilledPrincipalPaid", ethereum.Value.fromUnsignedBigInt(unbilledPrincipalPaid)))
    event.parameters.push(new ethereum.EventParam("by", ethereum.Value.fromAddress(by)))

    return event
}

export function createCompletePrincipalPaymentMadeEvent(
    borrower: string = "0x0000000000000000000000000000000000000001",
    payer: string = "0x0000000000000000000000000000000000000002",
    amount: string = "1000",
    timestamp: string = "1234567890",
    blockNumber: string = "1"
): PrincipalPaymentMade {
    return createPrincipalPaymentMadeEvent(
        Address.fromString(borrower),
        Address.fromString(payer),
        BigInt.fromString(amount),
        BigInt.fromString(timestamp),
        BigInt.fromString(amount),
        BigInt.fromI32(0),
        BigInt.fromString(amount),
        BigInt.fromI32(0),
        Address.fromString("0x0000000000000000000000000000000000000003"),
        BigInt.fromString(blockNumber),
        BigInt.fromString(timestamp)
    )
}