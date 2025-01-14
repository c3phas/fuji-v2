import { create, SdkBase, SdkPool } from '@connext/sdk';
import warning from 'tiny-warning';

import { CHAIN } from './constants/chains';
import { ChainType } from './enums';

export class Nxtp {
  private static _connextSdk?: {
    base: SdkBase;
    pool: SdkPool;
  };

  static async getOrCreate(chainType: ChainType = ChainType.MAINNET): Promise<{
    base: SdkBase;
    pool: SdkPool;
  }> {
    if (this._connextSdk) return this._connextSdk;

    const chains: Record<string, { providers: string[] }> = {};
    Object.values(CHAIN)
      .filter((c) => c.connextDomain)
      .forEach((c) => {
        if (c.connection) {
          chains[String(c.connextDomain)] = {
            providers: [c.connection.rpcProvider.connection.url],
          };
        } else {
          warning(true, `Connection not set for chain ${c.chainId}!`);
        }
      });

    const { sdkBase, sdkPool } = await create({
      network: chainType === ChainType.MAINNET ? 'mainnet' : 'testnet',
      chains,
      logLevel: 'error',
    });
    return {
      base: sdkBase,
      pool: sdkPool,
    };
  }
}
