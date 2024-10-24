import {
  AdminChanged as AdminChangedEvent,
  Approval as ApprovalEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  EpochProcessed as EpochProcessedEvent,
  Initialized as InitializedEvent,
  LenderAdded as LenderAddedEvent,
  LenderFundDisbursed as LenderFundDisbursedEvent,
  LenderFundWithdrawn as LenderFundWithdrawnEvent,
  LenderRemoved as LenderRemovedEvent,
  LiquidityDeposited as LiquidityDepositedEvent,
  PoolConfigCacheUpdated as PoolConfigCacheUpdatedEvent,
  PoolConfigChanged as PoolConfigChangedEvent,
  RedemptionRequestAdded as RedemptionRequestAddedEvent,
  RedemptionRequestRemoved as RedemptionRequestRemovedEvent,
  ReinvestYieldConfigSet as ReinvestYieldConfigSetEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  Upgraded as UpgradedEvent,
  YieldPaidOut as YieldPaidOutEvent,
  YieldPayoutFailed as YieldPayoutFailedEvent,
  YieldReinvested as YieldReinvestedEvent
} from "../generated/deposited/deposited"
import {
  AdminChanged,
  Approval,
  BeaconUpgraded,
  EpochProcessed,
  Initialized,
  LenderAdded,
  LenderFundDisbursed,
  LenderFundWithdrawn,
  LenderRemoved,
  LiquidityDeposited,
  PoolConfigCacheUpdated,
  PoolConfigChanged,
  RedemptionRequestAdded,
  RedemptionRequestRemoved,
  ReinvestYieldConfigSet,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  Upgraded,
  YieldPaidOut,
  YieldPayoutFailed,
  YieldReinvested
} from "../generated/schema"

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEpochProcessed(event: EpochProcessedEvent): void {
  let entity = new EpochProcessed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochId = event.params.epochId
  entity.sharesRequested = event.params.sharesRequested
  entity.sharesProcessed = event.params.sharesProcessed
  entity.amountProcessed = event.params.amountProcessed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLenderAdded(event: LenderAddedEvent): void {
  let entity = new LenderAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.reinvestYield = event.params.reinvestYield

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLenderFundDisbursed(
  event: LenderFundDisbursedEvent
): void {
  let entity = new LenderFundDisbursed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amountDisbursed = event.params.amountDisbursed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLenderFundWithdrawn(
  event: LenderFundWithdrawnEvent
): void {
  let entity = new LenderFundWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.numShares = event.params.numShares
  entity.assets = event.params.assets

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLenderRemoved(event: LenderRemovedEvent): void {
  let entity = new LenderRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidityDeposited(event: LiquidityDepositedEvent): void {
  let entity = new LiquidityDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.assets = event.params.assets
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePoolConfigCacheUpdated(
  event: PoolConfigCacheUpdatedEvent
): void {
  let entity = new PoolConfigCacheUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolConfig = event.params.poolConfig

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePoolConfigChanged(event: PoolConfigChangedEvent): void {
  let entity = new PoolConfigChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newPoolConfig = event.params.newPoolConfig
  entity.oldPoolConfig = event.params.oldPoolConfig

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRedemptionRequestAdded(
  event: RedemptionRequestAddedEvent
): void {
  let entity = new RedemptionRequestAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.shares = event.params.shares
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRedemptionRequestRemoved(
  event: RedemptionRequestRemovedEvent
): void {
  let entity = new RedemptionRequestRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.shares = event.params.shares
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReinvestYieldConfigSet(
  event: ReinvestYieldConfigSetEvent
): void {
  let entity = new ReinvestYieldConfigSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.reinvestYield = event.params.reinvestYield
  entity.by = event.params.by

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldPaidOut(event: YieldPaidOutEvent): void {
  let entity = new YieldPaidOut(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.yields = event.params.yields
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldPayoutFailed(event: YieldPayoutFailedEvent): void {
  let entity = new YieldPayoutFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.yields = event.params.yields
  entity.shares = event.params.shares
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldReinvested(event: YieldReinvestedEvent): void {
  let entity = new YieldReinvested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.yields = event.params.yields

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
