import { BigInt } from "@graphprotocol/graph-ts"
import {
  LiquidityDeposited as LiquidityDepositedEvent,
} from "../../generated/juniorDepositRecords/deposit"
import {
  Deposit,
  TotalDeposit
} from "../../generated/schema"

const TOTAL_DEPOSIT_AMOUNT = "total deposit amount"

export function handleIndexLiquidityDeposited(event: LiquidityDepositedEvent): void {
  const depositId = generateDepositId(event)
  let deposit = Deposit.load(depositId)

  if (deposit == null) {
    deposit = new Deposit(depositId)
  }

  deposit = updateDepositEntity(deposit, event)
  deposit.save()

  updateTotalDeposit(event)
}

function generateDepositId(event: LiquidityDepositedEvent): string {
  return event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
}

function updateDepositEntity(deposit: Deposit, event: LiquidityDepositedEvent): Deposit {
  deposit.lender = event.params.sender
  deposit.amount = event.params.assets
  deposit.shares = event.params.shares
  deposit.timestamp = event.block.timestamp
  deposit.blockNumber = event.block.number
  deposit.transactionHash = event.transaction.hash
  return deposit
}

function updateTotalDeposit(event: LiquidityDepositedEvent): void {
  let total = TotalDeposit.load(TOTAL_DEPOSIT_AMOUNT)

  if (total == null) {
    total = new TotalDeposit(TOTAL_DEPOSIT_AMOUNT)
    total.totalAmount = BigInt.fromI32(0)
  }

  total.totalAmount = total.totalAmount.plus(event.params.assets)
  total.save()
}