import * as _ from 'lodash';
import * as Web3 from 'web3';
import * as ABIDecoder from 'abi-decoder';

import { BigNumber } from 'bignumber.js';
import { TransactionReceipt } from 'ethereum-types';
import { Web3Utils } from '@8xprotocol/artifacts';
import { Address, Log } from '@8xprotocol/types';
import { awaitTx } from './transaction_utils';

export async function getFormattedLogsFromTxHash(web3: Web3, abi: any, txHash: string): Promise<Log[]> {
  const coreContract = ABIDecoder.addABI(abi);
  const web3Utils = new Web3Utils(web3);
  const receipt: TransactionReceipt = await awaitTx(web3, txHash);
  return getFormattedLogsFromReceipt(receipt);
}

export function getFormattedLogsFromReceipt(receipt: TransactionReceipt): Log[] {
  const logs: ABIDecoder.DecodedLog[] = _.compact(ABIDecoder.decodeLogs(receipt.logs));
  return _.map(logs, log => formatLogEntry(log));
}

/**
 * Converts a ABI Decoded Log into a Log
 * Input Example
 * {
 *   name: 'Transfer',
 *   events: [
 *    { name: 'from',
 *      type: 'address',
 *      value: '0xc604980c49f5c3be6e7e42526ec00f211e333385' },
 *    { name: 'to',
 *      type: 'address',
 *      value: '0xf8600afbf76236454a53e8dcc4d1feaa26fe1a77' },
 *    { name: 'value', type: 'uint256', value: '10000000000000000000' },
 *   ],
 *   address: '0xea76972f7587c27887aa403d84671717f6826f62'
 * }
 *
 * Output Example
 * {
 *   event: "Transfer",
 *   address: tokenAddress,
 *   args: {
 *     from,
 *     to,
 *     value,
 *   },
 * };
 */
export function formatLogEntry(logs: ABIDecoder.DecodedLog): Log {
  const { name, events, address } = logs;
  const args: any = {};

  // Loop through each event and add to args
  _.each(events, event => {
    const { name, type, value } = event;

    let argValue: any = value;
    switch (true) {
      case /^(uint)\d*\[\]/.test(type): {
        break;
      }
      case /^(uint)\d*/.test(type): {
        argValue = new BigNumber(value.toString());
        break;
      }
    }

    args[name] = argValue;
  });

  return {
    event: name,
    address,
    args,
  };
}