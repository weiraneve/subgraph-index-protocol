import { BigInt } from "@graphprotocol/graph-ts"
import {
    DrawdownMade as DrawdownMadeEvent
} from "../../generated/drawdown/drawdown"
import { Drawdown, TotalDrawdown } from "../../generated/schema"
import { TOTAL_DRAWDOWN } from '../utils/constants'

export function handleIndexDrawdownMade(event: DrawdownMadeEvent): void {
    let drawdownId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

    let drawdown = new Drawdown(drawdownId)
    drawdown.borrower = event.params.borrower
    drawdown.amount = event.params.borrowAmount
    drawdown.timestamp = event.block.timestamp
    drawdown.blockNumber = event.block.number
    drawdown.transactionHash = event.transaction.hash
    drawdown.save()

    let total = TotalDrawdown.load(TOTAL_DRAWDOWN)
    if (total == null) {
        total = new TotalDrawdown(TOTAL_DRAWDOWN)
        total.totalAmount = BigInt.fromI32(0)
    }

    total.totalAmount = total.totalAmount.plus(event.params.borrowAmount)
    total.save()
}