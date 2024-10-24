import {
  LiquidityDeposited as LiquidityDepositedEvent,
} from "../../generated/juniorDepositRecords/deposited"
import {
  Deposit,
  TotalDeposit
} from "../../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"
import { JUNIOR_TRANCHE, SENIOR_TRANCHE } from '../utils/constants'

function handleLiquidityDeposited(event: LiquidityDepositedEvent, poolType: string): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  let deposit = new Deposit(id)
  deposit.lender = event.params.sender
  deposit.amount = event.params.assets
  deposit.shares = event.params.shares
  deposit.timestamp = event.block.timestamp
  deposit.poolType = poolType
  deposit.blockNumber = event.block.number
  deposit.transactionHash = event.transaction.hash
  deposit.save()

  let total = TotalDeposit.load(poolType)
  if (!total) {
    total = new TotalDeposit(poolType)
    total.totalAmount = BigInt.fromI32(0)
    total.poolType = poolType
  }
  total.totalAmount = total.totalAmount.plus(deposit.amount)
  total.save()
}

export function handleJuniorLiquidityDeposited(event: LiquidityDepositedEvent): void {
  handleLiquidityDeposited(event, JUNIOR_TRANCHE)
}

export function handleSeniorLiquidityDeposited(event: LiquidityDepositedEvent): void {
  handleLiquidityDeposited(event, SENIOR_TRANCHE)
}