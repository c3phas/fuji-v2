/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  IProtocolFeesCollector,
  IProtocolFeesCollectorInterface,
  IProtocolFeesCollectorMulticall,
} from "../../../../src/interfaces/balancer/IProtocolFeesCollector";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFlashLoanFeePercentage",
        type: "uint256",
      },
    ],
    name: "FlashLoanFeePercentageChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "getFlashLoanFeePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export class IProtocolFeesCollector__factory {
  static readonly abi = _abi;
  static createInterface(): IProtocolFeesCollectorInterface {
    return new utils.Interface(_abi) as IProtocolFeesCollectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProtocolFeesCollector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IProtocolFeesCollector;
  }
  static multicall(address: string): IProtocolFeesCollectorMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as IProtocolFeesCollectorMulticall;
  }
}