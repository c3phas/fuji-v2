/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  ConnextRouter,
  ConnextRouterInterface,
  ConnextRouterMulticall,
} from "../../../src/routers/ConnextRouter";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWETH9",
        name: "weth",
        type: "address",
      },
      {
        internalType: "contract IConnext",
        name: "connext_",
        type: "address",
      },
      {
        internalType: "contract IChief",
        name: "chief",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BaseRouter__allowCaller_noAllowChange",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__allowCaller_zeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__bundleInternal_flashloanInvalidRequestor",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__bundleInternal_insufficientETH",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__bundleInternal_noBalanceChange",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__bundleInternal_notBeneficiary",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__bundleInternal_paramsMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__fallback_notAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__receive_senderNotWETH",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRouter__safeTransferETH_transferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ConnextRouter__setRouter_invalidInput",
    type: "error",
  },
  {
    inputs: [],
    name: "ConnextRouter__xReceive_notAllowedCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "ConnextRouter__xReceive_notReceivedAssetBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "ConnnextRouter__checkSlippage_outOfBounds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "SystemAccessControl__hasRole_missingRole",
    type: "error",
  },
  {
    inputs: [],
    name: "SystemAccessControl__onlyHouseKeeper_notHouseKeeper",
    type: "error",
  },
  {
    inputs: [],
    name: "SystemAccessControl__onlyTimelock_callerIsNotTimelock",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "AllowCaller",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "domain",
        type: "uint256",
      },
    ],
    name: "NewRouterAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destDomain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    name: "XCalled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "originDomain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    name: "XReceived",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "HARVESTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HOUSE_KEEPER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIQUIDATOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REBALANCER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNPAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [
      {
        internalType: "contract IWETH9",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "allowCaller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "bumpTransfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "chief",
    outputs: [
      {
        internalType: "contract IChief",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "connext",
    outputs: [
      {
        internalType: "contract IConnext",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "routerByDomain",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "domain",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "setRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "sweepETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IRouter.Action[]",
        name: "actions",
        type: "uint8[]",
      },
      {
        internalType: "bytes[]",
        name: "args",
        type: "bytes[]",
      },
    ],
    name: "xBundle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "originSender",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "originDomain",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    name: "xReceive",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export class ConnextRouter__factory {
  static readonly abi = _abi;
  static createInterface(): ConnextRouterInterface {
    return new utils.Interface(_abi) as ConnextRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ConnextRouter {
    return new Contract(address, _abi, signerOrProvider) as ConnextRouter;
  }
  static multicall(address: string): ConnextRouterMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as ConnextRouterMulticall;
  }
}
