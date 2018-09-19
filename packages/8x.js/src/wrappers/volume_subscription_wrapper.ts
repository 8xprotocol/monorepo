import * as Web3 from 'web3';
import * as _ from 'lodash';

import Contracts from '../services/contracts';
import BigNumber from 'bignumber.js';

import { Web3Utils, VolumeSubscriptionAbi } from '@8xprotocol/artifacts';
import { generateTxOpts } from '../utils/transaction_utils';
import { Address, Bytes32, TxData, TxHash, Plan, Subscription } from '@8xprotocol/types';
import { SECONDS_IN_DAY } from '../constants';

import { getFormattedLogsFromTxHash, getFormattedLogsFromReceipt, formatLogEntry, getPastLogs } from '../utils/logs';

export default class VolumeSubscriptionWrapper {

  private web3: Web3;
  private contracts: Contracts;
  private web3Utils: Web3Utils;

  constructor(web3: Web3, contracts: Contracts) {
    this.web3 = web3;
    this.contracts = contracts;
    this.web3Utils = new Web3Utils(this.web3);
  }

  public async createPlan(
    owner: Address,
    token: Address,
    identifier: string,
    interval: number,
    amount: BigNumber,
    fee: BigNumber,
    name: string | null,
    description: string | null,
    imageUrl: string | null,
    metaData: JSON | null,
    txData?: TxData,
  ): Promise<Bytes32> {

    const txSettings = await generateTxOpts(this.web3, txData);
    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    let submitData: any = metaData || {};

    if (name) {
      submitData['name'] = name;
      submitData['description'] = description;
      submitData['imageUrl'] = imageUrl;
    }

    let submitString = (Object.keys(submitData).length > 0) ? JSON.stringify(submitData) : '';

    let txHash = await volumeSubscription.createPlan.sendTransactionAsync(
      owner,
      token,
      Web3Utils.asciiToHex(identifier),
      new BigNumber(interval).mul(SECONDS_IN_DAY),
      amount,
      fee,
      submitString,
      txSettings
    );

    let logs = await getFormattedLogsFromTxHash(this.web3, VolumeSubscriptionAbi.abi, txHash);

    // @TODO: Throw error if doesn't exist
    let planIdentifier = _.get(logs[0].args, "planIdentifier") || '';

    return planIdentifier;

  }


  public async terminatePlan(
    identifier: Bytes32,
    txData?: TxData
  ): Promise<TxHash> {

    const txSettings = await generateTxOpts(this.web3, txData);
    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    return await volumeSubscription.terminatePlan.sendTransactionAsync(
      identifier,
      new BigNumber(Date.now()).dividedToIntegerBy(1000),
      txSettings
    );

  }

  public async getPlan(
    planIdentifier: Bytes32
  ): Promise<Plan> {

    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    let [
      owner, tokenAddress, identifier, interval, amount, fee, data, terminationDate
    ] = await volumeSubscription.plans.callAsync(planIdentifier);;

    identifier = Web3Utils.hexToUtf8(identifier);
    interval = interval.div(SECONDS_IN_DAY);

    let parsedData = JSON.parse(data)

    let name: string;
    let description: string;
    let imageUrl: string;

    if (parsedData) {
      name = parsedData["name"] || '';
      description = parsedData["description"] || '';
      imageUrl = parsedData["imageUrl"] || '';
    }

    return {
      owner,
      tokenAddress,
      identifier,
      interval: interval.toNumber(),
      amount,
      fee,
      data,
      terminationDate: terminationDate.toNumber(),
      name,
      description,
      imageUrl
    } as Plan;

  }

  public async getPlans(
    owner: string
  ): Promise<Plan[]> {

    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    let logs = await getPastLogs(this.web3, volumeSubscription,'CreatedPlan');
    let filteredLogs = logs.filter((object) => _.filter(object, ['args.owner', owner]));
    let ids = filteredLogs.map((object) => _.get(object, 'args.planIdentifier'));

    let plans = ids.map(async(id) => {
      return await this.getPlan(id);
    });

    return await Promise.all(plans);

  }

  public async getSubscriptionsByUser(
    user: Address
  ): Promise<Subscription[]> {

   return await this.getSubscribersBy('args.owner', user);

  }

  public async getSubscriptionsByPlan(
    planIdentifier: Bytes32
  ): Promise<Subscription[]> {

    return await this.getSubscribersBy('args.planIdentifier', planIdentifier);

  }

  private async getSubscribersBy(
    key: string,
    value: string
  ): Promise<Subscription[]> {

    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    let logs = await getPastLogs(this.web3, volumeSubscription, 'CreatedSubscription');
    let ids = logs.map((object) => {
      let filterKey = _.get(object, key);
      return filterKey == value ? _.get(object, 'args.subscriptionIdentifier') : null;
    }).filter((object) => object);

    console.log(ids);

    let subscriptions = ids.map(async(id) => {
      return await this.getSubscription(id);
    });

    return await Promise.all(subscriptions);

  }

  public async getPlanState(
    identifier: Bytes32
  ) {

  }
  public async createSubscription(
    planIdentifier: Bytes32,
    metaData: JSON | null,
    txData?: TxData
  ): Promise<Bytes32> {

    const txSettings = await generateTxOpts(this.web3, txData);
    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    let txHash = await volumeSubscription.createSubscription.sendTransactionAsync(
      planIdentifier,
      metaData ? JSON.stringify(metaData) : '',
      txSettings
    );

    let logs = await getFormattedLogsFromTxHash(this.web3, VolumeSubscriptionAbi.abi, txHash);

    // @TODO: Throw error if doesn't exist
    let subscriptionIdentifier = _.get(logs[0].args, "subscriptionIdentifier") || '';

    return subscriptionIdentifier;

  }

  public async cancelSubscription(
    subscriptionIdentifier: Bytes32,
    txData?: TxData
  ): Promise<TxHash> {

    const txSettings = await generateTxOpts(this.web3, txData);
    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    return await volumeSubscription.cancelSubscription.sendTransactionAsync(
      subscriptionIdentifier,
      txSettings
    );

  }

  public async getSubscription(
    subscriptionIdentifier: Bytes32
  ) {

    const volumeSubscription = await this.contracts.loadVolumeSubscription();

    let [
      owner, tokenAddress, planHash, lastPaymentDate, terminationDate, data
    ] = await volumeSubscription.subscriptions.callAsync(
      subscriptionIdentifier
    );

    return {
      owner,
      tokenAddress,
      planHash,
      lastPaymentDate: lastPaymentDate.toNumber(),
      terminationDate: terminationDate.toNumber(),
      data
    } as Subscription;

  }

  public async getSubscriptionState(
    subscriptionIdentifier: Bytes32
  ) {

  }

}