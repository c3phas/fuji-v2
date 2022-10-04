/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  Version0,
  Version0Interface,
  Version0Multicall,
} from "../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/nomad-core/contracts/Version0";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export class Version0__factory {
  static readonly abi = _abi;
  static createInterface(): Version0Interface {
    return new utils.Interface(_abi) as Version0Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Version0 {
    return new Contract(address, _abi, signerOrProvider) as Version0;
  }
  static multicall(address: string): Version0Multicall {
    return new MulticallContract(address, _abi) as unknown as Version0Multicall;
  }
}