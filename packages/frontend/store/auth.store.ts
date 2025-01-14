import { create, StoreApi } from "zustand"
import Onboard, { ConnectOptions } from "@web3-onboard/core"
import injectedModule from "@web3-onboard/injected-wallets"
import walletConnectModule from "@web3-onboard/walletconnect"
import {
  Balances,
  ConnectedChain,
  WalletState,
} from "@web3-onboard/core/dist/types"
import { ethers, utils } from "ethers"
import { devtools } from "zustand/middleware"
import { chains } from "../services/chains"
import { fujiLogo } from "../constants/ui"

const walletConnect = walletConnectModule({
  // bridge: "YOUR_CUSTOM_BRIDGE_SERVER",
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
})

const onboard = Onboard({
  chains,
  wallets: [injectedModule(), walletConnect],
  appMetadata: {
    name: "Fuji II - Himalaya",
    icon: fujiLogo, // svg string icon
    description: "Borrow in any chain, and always have the best rate",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  accountCenter: {
    desktop: { enabled: false },
    mobile: { enabled: false },
  },
})

type ConnectedState = {
  status: "connected"
  address: string
  ens: string | undefined
  balance: Balances
  chain: ConnectedChain
  provider: ethers.providers.Web3Provider
  walletName: string
}
type InitialState = {
  status: "initial"
  address: undefined
  ens: undefined
  balance: undefined
  chain: undefined
  provider: undefined
  walletName: undefined
}
type DisconnectedState = {
  status: "disconnected"
  address: undefined
  ens: undefined
  balance: undefined
  chain: undefined
  provider: undefined
  walletName: undefined
}
type State = InitialState | ConnectedState | DisconnectedState

type Action = {
  login: (options?: ConnectOptions) => void
  init: () => void
  logout: () => void
  changeChain: (chainId: string | number) => void
}

type AuthStore = State & Action

const initialState: InitialState = {
  status: "initial",
  address: undefined,
  ens: undefined,
  balance: undefined,
  chain: undefined,
  provider: undefined,
  walletName: undefined,
}

export const useAuth = create<AuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      init: async () => {
        reconnect(set, get)
        onOnboardChange(set, get)
      },

      login: async (options?) => {
        const wallets = await onboard.connectWallet(options)

        if (!wallets[0]) {
          set({ status: "disconnected" })
          throw "Cannot login"
        }

        const json = JSON.stringify(wallets.map(({ label }) => label))
        localStorage.setItem("connectedWallets", json)

        const balance = wallets[0].accounts[0].balance
        const address = utils.getAddress(wallets[0].accounts[0].address)
        const chain = wallets[0].chains[0]
        const provider = new ethers.providers.Web3Provider(wallets[0].provider)

        set({ status: "connected", address, balance, chain, provider })
      },

      logout: async () => {
        const wallets = onboard.state.get().wallets
        for (const { label } of wallets) {
          await onboard.disconnectWallet({ label })
        }

        localStorage.removeItem("connectedWallets")

        set({ ...initialState, status: "disconnected" })
      },

      changeChain: async (chainId) => {
        await onboard.setChain({ chainId })
      },
    }),
    {
      enabled: process.env.NEXT_PUBLIC_APP_ENV !== "production",
      name: "xFuji/auth",
    }
  )
)

async function reconnect(
  set: StoreApi<State & Action>["setState"],
  get: StoreApi<State & Action>["getState"]
) {
  const previouslyConnectedWallets = localStorage.getItem("connectedWallets")

  if (!previouslyConnectedWallets) {
    return set({ status: "disconnected" })
  }
  const wallets = JSON.parse(previouslyConnectedWallets)
  await get().login({
    autoSelect: { label: wallets[0], disableModals: true },
  })
}

function onOnboardChange(
  set: StoreApi<State & Action>["setState"],
  get: StoreApi<State & Action>["getState"]
) {
  onboard.state.select("wallets").subscribe((w: WalletState[]) => {
    const updates: Partial<ConnectedState> = {}

    if (!w[0] && get().status === "disconnected") {
      return
    } else if (!w[0]) {
      // Triggered when user disconnect from its wallet
      return get().logout()
    }

    const chain = w[0].chains[0]
    if (chain.id !== get().chain?.id) {
      updates.chain = chain
    }

    const balance = w[0].accounts[0].balance
    if (balance && balance !== get().balance) {
      updates.balance = balance
    }

    const address = w[0].accounts[0].address
    if (address && address !== get().address) {
      updates.address = utils.getAddress(address)
    }

    // TODO: how to !== new provider from old ?
    const provider = new ethers.providers.Web3Provider(w[0].provider)
    if (provider) {
      updates.provider = provider
    }

    const ens = w[0].accounts[0].ens?.name
    if (ens !== get().ens) {
      updates.ens = ens
    }

    const walletName = w[0].label

    if (walletName) {
      updates.walletName = walletName
    }

    if (Object.entries(updates).length > 0) {
      set(updates)
    }
  })
}
