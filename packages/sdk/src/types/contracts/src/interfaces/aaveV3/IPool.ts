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

export declare namespace IPool {
  export type ReserveConfigurationMapStruct = { data: BigNumberish };

  export type ReserveConfigurationMapStructOutput = [BigNumber] & {
    data: BigNumber;
  };

  export type ReserveDataStruct = {
    configuration: IPool.ReserveConfigurationMapStruct;
    liquidityIndex: BigNumberish;
    currentLiquidityRate: BigNumberish;
    variableBorrowIndex: BigNumberish;
    currentVariableBorrowRate: BigNumberish;
    currentStableBorrowRate: BigNumberish;
    lastUpdateTimestamp: BigNumberish;
    id: BigNumberish;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    interestRateStrategyAddress: string;
    accruedToTreasury: BigNumberish;
    unbacked: BigNumberish;
    isolationModeTotalDebt: BigNumberish;
  };

  export type ReserveDataStructOutput = [
    IPool.ReserveConfigurationMapStructOutput,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    number,
    number,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    configuration: IPool.ReserveConfigurationMapStructOutput;
    liquidityIndex: BigNumber;
    currentLiquidityRate: BigNumber;
    variableBorrowIndex: BigNumber;
    currentVariableBorrowRate: BigNumber;
    currentStableBorrowRate: BigNumber;
    lastUpdateTimestamp: number;
    id: number;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    interestRateStrategyAddress: string;
    accruedToTreasury: BigNumber;
    unbacked: BigNumber;
    isolationModeTotalDebt: BigNumber;
  };
}

export interface IPoolInterface extends utils.Interface {
  functions: {
    "borrow(address,uint256,uint256,uint16,address)": FunctionFragment;
    "flashLoanSimple(address,address,uint256,bytes,uint16)": FunctionFragment;
    "getReserveData(address)": FunctionFragment;
    "repay(address,uint256,uint256,address)": FunctionFragment;
    "setUserUseReserveAsCollateral(address,bool)": FunctionFragment;
    "supply(address,uint256,address,uint16)": FunctionFragment;
    "withdraw(address,uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "borrow"
      | "flashLoanSimple"
      | "getReserveData"
      | "repay"
      | "setUserUseReserveAsCollateral"
      | "supply"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "borrow",
    values: [string, BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "flashLoanSimple",
    values: [string, string, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getReserveData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "repay",
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setUserUseReserveAsCollateral",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supply",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "flashLoanSimple",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserveData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setUserUseReserveAsCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "supply", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export interface IPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPoolInterface;

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
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      onBehalfOf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    flashLoanSimple(
      receiverAddress: string,
      asset: string,
      amount: BigNumberish,
      params: BytesLike,
      referralCode: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[IPool.ReserveDataStructOutput]>;

    repay(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      onBehalfOf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supply(
      asset: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  borrow(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    referralCode: BigNumberish,
    onBehalfOf: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  flashLoanSimple(
    receiverAddress: string,
    asset: string,
    amount: BigNumberish,
    params: BytesLike,
    referralCode: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getReserveData(
    asset: string,
    overrides?: CallOverrides
  ): Promise<IPool.ReserveDataStructOutput>;

  repay(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    onBehalfOf: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUserUseReserveAsCollateral(
    asset: string,
    useAsCollateral: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supply(
    asset: string,
    amount: BigNumberish,
    onBehalfOf: string,
    referralCode: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    asset: string,
    amount: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      onBehalfOf: string,
      overrides?: CallOverrides
    ): Promise<void>;

    flashLoanSimple(
      receiverAddress: string,
      asset: string,
      amount: BigNumberish,
      params: BytesLike,
      referralCode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<IPool.ReserveDataStructOutput>;

    repay(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      onBehalfOf: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supply(
      asset: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      onBehalfOf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    flashLoanSimple(
      receiverAddress: string,
      asset: string,
      amount: BigNumberish,
      params: BytesLike,
      referralCode: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    repay(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      onBehalfOf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supply(
      asset: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      onBehalfOf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    flashLoanSimple(
      receiverAddress: string,
      asset: string,
      amount: BigNumberish,
      params: BytesLike,
      referralCode: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    repay(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      onBehalfOf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supply(
      asset: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

export interface IPoolMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  getReserveData(
    asset: string,
    overrides?: CallOverrides
  ): Call<IPool.ReserveDataStructOutput>;
}