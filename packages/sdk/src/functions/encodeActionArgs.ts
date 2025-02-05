import { defaultAbiCoder } from '@ethersproject/abi';
import { BigNumber } from 'ethers';
import invariant from 'tiny-invariant';

import { RouterAction } from '../enums';
import { RouterActionParams } from '../types';

export function encodeActionArgs(params: RouterActionParams): string {
  if (
    params.action === RouterAction.DEPOSIT ||
    params.action === RouterAction.PAYBACK
  ) {
    return defaultAbiCoder.encode(
      ['address', 'uint256', 'address', 'address'],
      [
        params.vault.value,
        params.amount.toString(),
        params.receiver.value,
        params.sender.value,
      ]
    );
  } else if (
    params.action === RouterAction.BORROW ||
    params.action === RouterAction.WITHDRAW
  ) {
    return defaultAbiCoder.encode(
      ['address', 'uint256', 'address', 'address'],
      [
        params.vault.value,
        params.amount.toString(),
        params.receiver.value,
        params.owner.value,
      ]
    );
  } else if (
    params.action === RouterAction.PERMIT_BORROW ||
    params.action === RouterAction.PERMIT_WITHDRAW
  ) {
    invariant(
      params.deadline && params.v && params.r && params.s,
      'Missing args in PERMIT_BORROW!'
    );
    return defaultAbiCoder.encode(
      [
        'address',
        'address',
        'address',
        'uint256',
        'uint256',
        'uint8',
        'bytes32',
        'bytes32',
      ],
      [
        params.vault.value,
        params.owner.value,
        params.receiver.value,
        params.amount.toString(),
        params.deadline.toString(),
        params.v.toString(),
        params.r,
        params.s,
      ]
    );
  } else if (params.action === RouterAction.X_TRANSFER) {
    return defaultAbiCoder.encode(
      ['uint256', 'uint256', 'address', 'uint256', 'address', 'address'],
      [
        params.destDomain,
        params.slippage,
        params.asset.value,
        params.amount.toString(),
        params.receiver.value,
        params.sender.value,
      ]
    );
  } else if (params.action === RouterAction.X_TRANSFER_WITH_CALL) {
    const innerActions = params.innerActions.map(({ action }) =>
      BigNumber.from(action)
    );
    const innerArgs = params.innerActions.map(encodeActionArgs);
    const callData = defaultAbiCoder.encode(
      ['uint8[]', 'bytes[]', 'uint256'],
      [innerActions, innerArgs, params.slippage]
    );
    return defaultAbiCoder.encode(
      ['uint256', 'uint256', 'address', 'uint256', 'bytes'],
      [
        params.destDomain,
        params.slippage,
        params.asset.value,
        params.amount.toString(),
        callData,
      ]
    );
  } else {
    invariant(true, 'Unsupported action!');
  }

  return '';
}
