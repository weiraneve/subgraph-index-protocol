import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/deposited/deposited"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createEpochProcessedEvent(
  epochId: BigInt,
  sharesRequested: BigInt,
  sharesProcessed: BigInt,
  amountProcessed: BigInt
): EpochProcessed {
  let epochProcessedEvent = changetype<EpochProcessed>(newMockEvent())

  epochProcessedEvent.parameters = new Array()

  epochProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "epochId",
      ethereum.Value.fromUnsignedBigInt(epochId)
    )
  )
  epochProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "sharesRequested",
      ethereum.Value.fromUnsignedBigInt(sharesRequested)
    )
  )
  epochProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "sharesProcessed",
      ethereum.Value.fromUnsignedBigInt(sharesProcessed)
    )
  )
  epochProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "amountProcessed",
      ethereum.Value.fromUnsignedBigInt(amountProcessed)
    )
  )

  return epochProcessedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLenderAddedEvent(
  account: Address,
  reinvestYield: boolean
): LenderAdded {
  let lenderAddedEvent = changetype<LenderAdded>(newMockEvent())

  lenderAddedEvent.parameters = new Array()

  lenderAddedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lenderAddedEvent.parameters.push(
    new ethereum.EventParam(
      "reinvestYield",
      ethereum.Value.fromBoolean(reinvestYield)
    )
  )

  return lenderAddedEvent
}

export function createLenderFundDisbursedEvent(
  account: Address,
  amountDisbursed: BigInt
): LenderFundDisbursed {
  let lenderFundDisbursedEvent = changetype<LenderFundDisbursed>(newMockEvent())

  lenderFundDisbursedEvent.parameters = new Array()

  lenderFundDisbursedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lenderFundDisbursedEvent.parameters.push(
    new ethereum.EventParam(
      "amountDisbursed",
      ethereum.Value.fromUnsignedBigInt(amountDisbursed)
    )
  )

  return lenderFundDisbursedEvent
}

export function createLenderFundWithdrawnEvent(
  account: Address,
  numShares: BigInt,
  assets: BigInt
): LenderFundWithdrawn {
  let lenderFundWithdrawnEvent = changetype<LenderFundWithdrawn>(newMockEvent())

  lenderFundWithdrawnEvent.parameters = new Array()

  lenderFundWithdrawnEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lenderFundWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "numShares",
      ethereum.Value.fromUnsignedBigInt(numShares)
    )
  )
  lenderFundWithdrawnEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )

  return lenderFundWithdrawnEvent
}

export function createLenderRemovedEvent(account: Address): LenderRemoved {
  let lenderRemovedEvent = changetype<LenderRemoved>(newMockEvent())

  lenderRemovedEvent.parameters = new Array()

  lenderRemovedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return lenderRemovedEvent
}

export function createLiquidityDepositedEvent(
  sender: Address,
  assets: BigInt,
  shares: BigInt
): LiquidityDeposited {
  let liquidityDepositedEvent = changetype<LiquidityDeposited>(newMockEvent())

  liquidityDepositedEvent.parameters = new Array()

  liquidityDepositedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  liquidityDepositedEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  liquidityDepositedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return liquidityDepositedEvent
}

export function createPoolConfigCacheUpdatedEvent(
  poolConfig: Address
): PoolConfigCacheUpdated {
  let poolConfigCacheUpdatedEvent = changetype<PoolConfigCacheUpdated>(
    newMockEvent()
  )

  poolConfigCacheUpdatedEvent.parameters = new Array()

  poolConfigCacheUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "poolConfig",
      ethereum.Value.fromAddress(poolConfig)
    )
  )

  return poolConfigCacheUpdatedEvent
}

export function createPoolConfigChangedEvent(
  newPoolConfig: Address,
  oldPoolConfig: Address
): PoolConfigChanged {
  let poolConfigChangedEvent = changetype<PoolConfigChanged>(newMockEvent())

  poolConfigChangedEvent.parameters = new Array()

  poolConfigChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newPoolConfig",
      ethereum.Value.fromAddress(newPoolConfig)
    )
  )
  poolConfigChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPoolConfig",
      ethereum.Value.fromAddress(oldPoolConfig)
    )
  )

  return poolConfigChangedEvent
}

export function createRedemptionRequestAddedEvent(
  account: Address,
  shares: BigInt,
  epochId: BigInt
): RedemptionRequestAdded {
  let redemptionRequestAddedEvent = changetype<RedemptionRequestAdded>(
    newMockEvent()
  )

  redemptionRequestAddedEvent.parameters = new Array()

  redemptionRequestAddedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  redemptionRequestAddedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  redemptionRequestAddedEvent.parameters.push(
    new ethereum.EventParam(
      "epochId",
      ethereum.Value.fromUnsignedBigInt(epochId)
    )
  )

  return redemptionRequestAddedEvent
}

export function createRedemptionRequestRemovedEvent(
  account: Address,
  shares: BigInt,
  epochId: BigInt
): RedemptionRequestRemoved {
  let redemptionRequestRemovedEvent = changetype<RedemptionRequestRemoved>(
    newMockEvent()
  )

  redemptionRequestRemovedEvent.parameters = new Array()

  redemptionRequestRemovedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  redemptionRequestRemovedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  redemptionRequestRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "epochId",
      ethereum.Value.fromUnsignedBigInt(epochId)
    )
  )

  return redemptionRequestRemovedEvent
}

export function createReinvestYieldConfigSetEvent(
  account: Address,
  reinvestYield: boolean,
  by: Address
): ReinvestYieldConfigSet {
  let reinvestYieldConfigSetEvent = changetype<ReinvestYieldConfigSet>(
    newMockEvent()
  )

  reinvestYieldConfigSetEvent.parameters = new Array()

  reinvestYieldConfigSetEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  reinvestYieldConfigSetEvent.parameters.push(
    new ethereum.EventParam(
      "reinvestYield",
      ethereum.Value.fromBoolean(reinvestYield)
    )
  )
  reinvestYieldConfigSetEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )

  return reinvestYieldConfigSetEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createYieldPaidOutEvent(
  account: Address,
  yields: BigInt,
  shares: BigInt
): YieldPaidOut {
  let yieldPaidOutEvent = changetype<YieldPaidOut>(newMockEvent())

  yieldPaidOutEvent.parameters = new Array()

  yieldPaidOutEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  yieldPaidOutEvent.parameters.push(
    new ethereum.EventParam("yields", ethereum.Value.fromUnsignedBigInt(yields))
  )
  yieldPaidOutEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return yieldPaidOutEvent
}

export function createYieldPayoutFailedEvent(
  account: Address,
  yields: BigInt,
  shares: BigInt,
  reason: string
): YieldPayoutFailed {
  let yieldPayoutFailedEvent = changetype<YieldPayoutFailed>(newMockEvent())

  yieldPayoutFailedEvent.parameters = new Array()

  yieldPayoutFailedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  yieldPayoutFailedEvent.parameters.push(
    new ethereum.EventParam("yields", ethereum.Value.fromUnsignedBigInt(yields))
  )
  yieldPayoutFailedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  yieldPayoutFailedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return yieldPayoutFailedEvent
}

export function createYieldReinvestedEvent(
  account: Address,
  yields: BigInt
): YieldReinvested {
  let yieldReinvestedEvent = changetype<YieldReinvested>(newMockEvent())

  yieldReinvestedEvent.parameters = new Array()

  yieldReinvestedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  yieldReinvestedEvent.parameters.push(
    new ethereum.EventParam("yields", ethereum.Value.fromUnsignedBigInt(yields))
  )

  return yieldReinvestedEvent
}
