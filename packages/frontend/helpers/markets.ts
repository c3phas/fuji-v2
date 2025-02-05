import { BorrowingVault, VaultWithFinancials } from "@x-fuji/sdk"
import { chainName } from "../services/chains"

export enum Status {
  Ready,
  Loading,
  Error,
}

export type MarketRow = {
  entity?: BorrowingVault | VaultWithFinancials

  borrow: string
  collateral: string

  chain: {
    status: Status
    value: string
  }

  depositApr: {
    status: Status
    value: number
  }
  depositAprBase: {
    status: Status
    value: number
  }
  depositAprReward: {
    status: Status
    value: number
  }

  borrowApr: {
    status: Status
    value: number
  }
  borrowAprBase: {
    status: Status
    value: number
  }
  borrowAprReward: {
    status: Status
    value: number
  }

  integratedProtocols: {
    status: Status
    value: string[]
  }
  safetyRating: {
    status: Status
    value: string
  }
  liquidity: {
    status: Status
    value: number
  }

  children?: MarketRow[]
  isChild: boolean
  isGrandChild: boolean // TODO: Not handled
}

const defaultRow: MarketRow = {
  borrow: "",
  collateral: "",
  chain: {
    status: Status.Loading,
    value: "",
  },
  depositApr: {
    status: Status.Loading,
    value: 0,
  },
  depositAprBase: {
    status: Status.Loading,
    value: 0,
  },
  depositAprReward: {
    status: Status.Loading,
    value: 0,
  },
  borrowApr: {
    status: Status.Loading,
    value: 0,
  },
  borrowAprBase: {
    status: Status.Loading,
    value: 0,
  },
  borrowAprReward: {
    status: Status.Loading,
    value: 0,
  },
  integratedProtocols: {
    status: Status.Loading,
    value: [],
  },
  safetyRating: {
    status: Status.Loading,
    value: "",
  },
  liquidity: {
    status: Status.Loading,
    value: 0,
  },
  isChild: false,
  isGrandChild: false,
}

export const setBase = (v: BorrowingVault): MarketRow => ({
  ...defaultRow,
  entity: v,
  collateral: v.collateral.symbol,
  borrow: v.debt.symbol,
})

// set apr and aprBase as being equal
// and re-set later when data gets fetched from the Llama API
export const setFinancials = (
  r: MarketRow,
  status: Status,
  f?: VaultWithFinancials
): MarketRow => ({
  ...r,
  chain: {
    // chain is always available
    status: Status.Ready,
    value: chainName((r.entity as BorrowingVault).chainId),
  },
  depositApr: {
    status,
    value: f?.activeProvider.depositAprBase ?? 0,
  },
  depositAprBase: {
    status,
    value: f?.activeProvider.depositAprBase ?? 0,
  },
  borrowApr: {
    status,
    value: f?.activeProvider.borrowAprBase ?? 0,
  },
  borrowAprBase: {
    status,
    value: f?.activeProvider.borrowAprBase ?? 0,
  },
  integratedProtocols: {
    status,
    value: f?.allProviders.map((p) => p.name) ?? [],
  },
  safetyRating: {
    status,
    value: "A+", // TODO
  },
})

export const setLlamas = (
  r: MarketRow,
  status: Status,
  f?: VaultWithFinancials
): MarketRow => {
  if (status === Status.Ready) {
    return {
      ...r,
      depositApr: {
        status,
        value:
          Number(f?.activeProvider.depositAprBase) +
          Number(f?.activeProvider.depositAprReward ?? 0),
      },
      depositAprReward: {
        status:
          f?.activeProvider.depositAprReward === undefined
            ? Status.Error
            : status,
        value: Number(f?.activeProvider.depositAprReward),
      },
      borrowApr: {
        status,
        value:
          Number(f?.activeProvider.borrowAprBase) +
          Number(f?.activeProvider.borrowAprReward ?? 0),
      },
      borrowAprReward: {
        status:
          f?.activeProvider.borrowAprReward === undefined
            ? Status.Error
            : status,
        value: Number(f?.activeProvider.borrowAprReward),
      },
      liquidity: {
        status:
          f?.activeProvider.availableToBorrowUSD === undefined
            ? Status.Error
            : status,
        value: f?.activeProvider.availableToBorrowUSD ?? 0,
      },
    }
  } else {
    return {
      ...r,
      depositAprReward: {
        status,
        value: 0,
      },
      borrowAprReward: {
        status,
        value: 0,
      },
      liquidity: {
        status,
        value: 0,
      },
    }
  }
}

export const groupByPair = (rows: MarketRow[]): MarketRow[] => {
  const done = new Set<string>() // Pair is symbol/symbol i.e WETH/USDC
  const grouped: MarketRow[] = []

  for (const row of rows) {
    const key = `${row.borrow}/${row.collateral}`
    if (done.has(key)) continue
    done.add(key)

    const entries = rows.filter(
      (r) => r.borrow === row.borrow && r.collateral === row.collateral
    )
    if (entries.length > 1) {
      // TODO: array should be sorted before being grouped
      const sorted = entries.sort(sortBy.descending)
      const children = groupByChain(
        sorted.map((r) => ({ ...r, isChild: true }))
      )
      grouped.push({ ...sorted[0], children })
    } else {
      grouped.push(entries[0])
    }
  }

  return grouped
}

const groupByChain = (rows: MarketRow[]): MarketRow[] => {
  const done = new Set<string>()
  const grouped: MarketRow[] = []

  for (const row of rows) {
    const key = row.chain.value
    if (done.has(key)) continue
    done.add(key)

    const entries = rows.filter((r) => r.chain === row.chain)
    if (entries.length > 1) {
      // TODO: array should be sorted before being grouped
      const sorted = entries.sort(sortBy.descending)
      const children = sorted.map((r) => ({ ...r, isChild: true }))
      grouped.push({ ...sorted[0], children })
    } else {
      grouped.push(entries[0])
    }
  }

  return grouped
}

type SortBy = "descending" | "ascending"
type CompareFn = (r1: MarketRow, r2: MarketRow) => 1 | -1

const sortBy: Record<SortBy, CompareFn> = {
  ascending: (a, b) => (a.borrowApr.value < b.borrowApr.value ? 1 : -1),
  descending: (a, b) => (a.borrowApr.value > b.borrowApr.value ? 1 : -1),
}
