import {
  LiquidityDeposited as LiquidityDepositedEvent,
} from "../../generated/juniorTranche/deposited"
import {
  Deposit,
  TotalDeposit
} from "../../generated/schema"

import { BigInt } from "@graphprotocol/graph-ts"
import { JUNIOR_TRANCHE, SENIOR_TRANCHE } from '../utils/constants'

export function handleJuniorLiquidityDeposited(event: LiquidityDepositedEvent): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

  let deposit = new Deposit(id)
  deposit.lender = event.params.sender
  deposit.amount = event.params.assets
  deposit.shares = event.params.shares
  deposit.timestamp = event.block.timestamp
  deposit.poolType = JUNIOR_TRANCHE
  deposit.blockNumber = event.block.number
  deposit.transactionHash = event.transaction.hash
  deposit.save()

  let total = TotalDeposit.load(JUNIOR_TRANCHE)
  if (!total) {
    total = new TotalDeposit(JUNIOR_TRANCHE)
    total.totalAmount = BigInt.fromI32(0)
    total.poolType = JUNIOR_TRANCHE
  }
  total.totalAmount = total.totalAmount.plus(deposit.amount)
  total.save()
}

export function handleSeniorLiquidityDeposited(event: LiquidityDepositedEvent): void {
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()

  let deposit = new Deposit(id)
  deposit.lender = event.params.sender
  deposit.amount = event.params.assets
  deposit.shares = event.params.shares
  deposit.timestamp = event.block.timestamp
  deposit.poolType = SENIOR_TRANCHE
  deposit.blockNumber = event.block.number
  deposit.transactionHash = event.transaction.hash
  deposit.save()

  let total = TotalDeposit.load(SENIOR_TRANCHE)
  if (!total) {
    total = new TotalDeposit(SENIOR_TRANCHE)
    total.totalAmount = BigInt.fromI32(0)
    total.poolType = SENIOR_TRANCHE
  }
  total.totalAmount = total.totalAmount.plus(deposit.amount)
  total.save()
}