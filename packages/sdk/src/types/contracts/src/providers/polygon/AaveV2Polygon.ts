/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { Fragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { Call } from "@hovoh/ethcall";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../common";

export interface AaveV2PolygonInterface extends utils.Interface {
  functions: {
    "approvedOperator(address,address,address)": FunctionFragment;
    "borrow(uint256,address)": FunctionFragment;
    "deposit(uint256,address)": FunctionFragment;
    "getBorrowBalance(address,address)": FunctionFragment;
    "getBorrowRateFor(address)": FunctionFragment;
    "getDepositBalance(address,address)": FunctionFragment;
    "getDepositRateFor(address)": FunctionFragment;
    "payback(uint256,address)": FunctionFragment;
    "providerName()": FunctionFragment;
    "withdraw(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approvedOperator"
      | "borrow"
      | "deposit"
      | "getBorrowBalance"
      | "getBorrowRateFor"
      | "getDepositBalance"
      | "getDepositRateFor"
      | "payback"
      | "providerName"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approvedOperator",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrow",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBorrowBalance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBorrowRateFor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositBalance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositRateFor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "payback",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "providerName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "approvedOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBorrowBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBorrowRateFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDepositBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDepositRateFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "payback", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "providerName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export interface AaveV2Polygon extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AaveV2PolygonInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    approvedOperator(
      arg0: string,
      arg1: string,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<[string] & { operator: string }>;

    borrow(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBorrowBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getBorrowRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    getDepositBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getDepositRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    payback(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    providerName(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approvedOperator(
    arg0: string,
    arg1: string,
    arg2: string,
    overrides?: CallOverrides
  ): Promise<string>;

  borrow(
    amount: BigNumberish,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount: BigNumberish,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBorrowBalance(
    user: string,
    vault: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBorrowRateFor(
    vault: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDepositBalance(
    user: string,
    vault: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDepositRateFor(
    vault: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  payback(
    amount: BigNumberish,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  providerName(overrides?: CallOverrides): Promise<string>;

  withdraw(
    amount: BigNumberish,
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approvedOperator(
      arg0: string,
      arg1: string,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<string>;

    borrow(
      amount: BigNumberish,
      vault: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deposit(
      amount: BigNumberish,
      vault: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getBorrowBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBorrowRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payback(
      amount: BigNumberish,
      vault: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    providerName(overrides?: CallOverrides): Promise<string>;

    withdraw(
      amount: BigNumberish,
      vault: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    approvedOperator(
      arg0: string,
      arg1: string,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrow(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBorrowBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBorrowRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payback(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    providerName(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approvedOperator(
      arg0: string,
      arg1: string,
      arg2: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrow(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBorrowBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBorrowRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDepositBalance(
      user: string,
      vault: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDepositRateFor(
      vault: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    payback(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    providerName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

export interface AaveV2PolygonMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  approvedOperator(
    arg0: string,
    arg1: string,
    arg2: string,
    overrides?: CallOverrides
  ): Call<string>;

  getBorrowBalance(
    user: string,
    vault: string,
    overrides?: CallOverrides
  ): Call<BigNumber>;

  getBorrowRateFor(vault: string, overrides?: CallOverrides): Call<BigNumber>;

  getDepositBalance(
    user: string,
    vault: string,
    overrides?: CallOverrides
  ): Call<BigNumber>;

  getDepositRateFor(vault: string, overrides?: CallOverrides): Call<BigNumber>;

  providerName(overrides?: CallOverrides): Call<string>;
}
