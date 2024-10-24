import { BigInt } from "@graphprotocol/graph-ts"
import {
  LiquidityDeposited as LiquidityDepositedEvent,
} from "../../generated/juniorDepositRecords/deposit"
import {
  Deposit,
  TotalDeposit
} from "../../generated/schema"

const JUNIOR_TRANCHE = "junior"
const SENIOR_TRANCHE = "senior"

export function handleJuniorLiquidityDeposited(event: LiquidityDepositedEvent): void {
  handleLiquidityDeposited(event, JUNIOR_TRANCHE)
}

export function handleSeniorLiquidityDeposited(event: LiquidityDepositedEvent): void {
  handleLiquidityDeposited(event, SENIOR_TRANCHE)
}

function handleLiquidityDeposited(event: LiquidityDepositedEvent, poolType: string): void {
  const depositId = generateDepositId(event)
  let deposit = Deposit.load(depositId)

  if (deposit == null) {
    deposit = new Deposit(depositId)
  }

  deposit = updateDepositEntity(deposit, event, poolType)
  deposit.save()

  updateTotalDeposit(event, poolType)
}

function generateDepositId(event: LiquidityDepositedEvent): string {
  return event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
}

function updateDepositEntity(deposit: Deposit, event: LiquidityDepositedEvent, poolType: string): Deposit {
  deposit.lender = event.params.sender
  deposit.amount = event.params.assets
  deposit.shares = event.params.shares
  deposit.timestamp = event.block.timestamp
  deposit.poolType = poolType
  deposit.blockNumber = event.block.number
  deposit.transactionHash = event.transaction.hash

  return deposit
}

function updateTotalDeposit(event: LiquidityDepositedEvent, poolType: string): void {
  let total = TotalDeposit.load(poolType)

  if (total == null) {
    total = new TotalDeposit(poolType)
    total.totalAmount = BigInt.fromI32(0)
    total.poolType = poolType
  }

  total.totalAmount = total.totalAmount.plus(event.params.assets)
  total.save()
}