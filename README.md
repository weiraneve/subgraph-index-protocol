# subgraph-index-protocol

## Index LiquidityDeposited event

### deposit records

#### each record includes lender address, amount and timestamp
``` graphql
{
  deposits {
    lender
    amount
    timestamp
  }
}
```

#### filter by timestamp
``` graphql
{
  deposits(
    where: {
      timestamp_gte: "1704038400"  # 2024-01-01
      timestamp_lte: "1727712000"  # 2024-10-01
    }
  ) {
    lender
    amount
    timestamp
  }
}
```

#### order by timestamp
``` graphql
{
  deposits(
    orderBy: timestamp
    orderDirection: desc
  ) {
    lender
    amount
    timestamp
  }
}
```

### total number of amount
``` graphql
{
  totalDeposits {
    id
    totalAmount
  }
}
```

## Index DrawdownMade event

### drawdown records

#### each record includes borrower address, amount and timestamp
``` graphql
{
  drawdowns {
    borrower
    amount
    timestamp
  }
}
```

#### filter by timestamp
``` graphql
{
  drawdowns(
    where: {
      timestamp_gte: "1704038400"  # 2024-01-01
      timestamp_lte: "1727712000"  # 2024-10-01
    }
  ) {
    borrower
    amount
    timestamp
  }
}
```

#### order by timestamp
``` graphql
{
  drawdowns(
    orderBy: timestamp
    orderDirection: desc
  ) {
    borrower
    amount
    timestamp
  }
}
```

### total number of amount
``` graphql
{
  totalDrawdowns {
    id
    totalAmount
  }
}
```

## Index PrincipalPaymentMade event

### principal payment records

#### each record includes borrower address, amount, lateFeePaid and timestamp
``` graphql
{
  principalPayments {
    borrower
    timestamp
    nextDueDate
    lateFeePaid
    amount
    principalDue
    unbilledPrincipal
    principalDuePaid
    unbilledPrincipalPaid
  }
}
```

#### filter by timestamp
``` graphql
{
  principalPayments(
    where: {
      timestamp_gte: "1704038400"  # 2024-01-01
      timestamp_lte: "1727712000"  # 2024-10-01
    }
  ) {
    borrower
    timestamp
    nextDueDate
    lateFeePaid
    amount
    principalDue
    unbilledPrincipal
    principalDuePaid
    unbilledPrincipalPaid
  }
}
```

#### order by timestamp
``` graphql
{
  principalPayments(
    orderBy: timestamp
    orderDirection: desc
  ) {
    borrower
    timestamp
    nextDueDate
    lateFeePaid
    amount
    principalDue
    unbilledPrincipal
    principalDuePaid
    unbilledPrincipalPaid
  }
}
```

### total number of amount
``` graphql
{
  totalPrincipalPayments {
    id
    totalAmount
  }
}
```

