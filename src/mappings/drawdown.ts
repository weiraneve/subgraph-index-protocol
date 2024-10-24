import { BigInt } from "@graphprotocol/graph-ts"
import {
    DrawdownMade as DrawdownMadeEvent
} from "../../generated/drawdown/drawdown"
import { Drawdown, TotalDrawdown } from "../../generated/schema"

const TOTAL_DRAWDOWN_AMOUNT = "total drawdown amount"

export function handleIndexDrawdownMade(event: DrawdownMadeEvent): void {
    const drawdownId = generateDrawdownId(event)
    let drawdown = Drawdown.load(drawdownId)

    if (drawdown == null) {
        drawdown = new Drawdown(drawdownId)
    }

    drawdown = updateDrawdownEntity(drawdown, event)
    drawdown.save()

    updateTotalDrawdown(event)
}

function generateDrawdownId(event: DrawdownMadeEvent): string {
    return event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
}

function updateDrawdownEntity(drawdown: Drawdown, event: DrawdownMadeEvent): Drawdown {
    drawdown.borrower = event.params.borrower
    drawdown.amount = event.params.borrowAmount
    drawdown.timestamp = event.block.timestamp
    drawdown.blockNumber = event.block.number
    drawdown.transactionHash = event.transaction.hash

    return drawdown
}

function updateTotalDrawdown(event: DrawdownMadeEvent): void {
    let total = TotalDrawdown.load(TOTAL_DRAWDOWN_AMOUNT)

    if (total == null) {
        total = new TotalDrawdown(TOTAL_DRAWDOWN_AMOUNT)
        total.totalAmount = BigInt.fromI32(0)
    }

    total.totalAmount = total.totalAmount.plus(event.params.borrowAmount)
    total.save()
}