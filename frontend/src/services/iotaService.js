// src/services/iotaService.js
// Service for interacting with IOTA blockchain

import { getFullnodeUrl, IotaClient } from '@iota/iota-sdk/client';
import TRACKIT_CONFIG from '../config';

class IotaService {
  constructor() {
    this.client = new IotaClient({
      url: getFullnodeUrl(TRACKIT_CONFIG.NETWORK),
    });
  }

  /**
   * Get the ProductRegistry shared object
   */
  async getRegistry() {
    try {
      const registryObj = await this.client.getObject({
        id: TRACKIT_CONFIG.REGISTRY_OBJECT_ID,
        options: {
          showContent: true,
          showBcs: true,
        },
      });
      return registryObj;
    } catch (err) {
      console.error('Error fetching ProductRegistry:', err);
      throw err;
    }
  }

  /**
   * Query product journey from IOTA
   * This searches for events related to the product
   */
  async getProductJourney(productId) {
    try {
      // Query events that contain the product ID in their data
      const events = await this.client.queryEvents({
        query: {
          All: [
            {
              MoveEventType: `${TRACKIT_CONFIG.PACKAGE_ID}::product_registry::ProductJourneyUpdated`,
            },
          ],
        },
      });

      const journey = [];
      for (const event of events.data) {
        if (event.parsedJson && event.parsedJson.product_id === productId) {
          journey.push({
            timestamp: event.timestampMs,
            data: event.parsedJson,
          });
        }
      }

      return journey.sort((a, b) => a.timestamp - b.timestamp);
    } catch (err) {
      console.error('Error fetching product journey:', err);
      throw err;
    }
  }

  /**
   * Get transactions for a specific address
   */
  async getAddressTransactions(address) {
    try {
      const transactions = await this.client.queryTransactionBlocks({
        filter: {
          FromAddress: address,
        },
        options: {
          showEffects: true,
          showEvents: true,
        },
      });
      return transactions;
    } catch (err) {
      console.error('Error fetching transactions:', err);
      throw err;
    }
  }

  /**
   * Get coin objects for an address
   */
  async getCoins(address) {
    try {
      const coins = await this.client.getCoins({
        owner: address,
        coinType: '0x2::iota::IOTA',
      });
      return coins;
    } catch (err) {
      console.error('Error fetching coins:', err);
      throw err;
    }
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(tx) {
    try {
      const result = await this.client.dryRunTransactionBlock({
        transactionBlock: tx,
      });
      return result;
    } catch (err) {
      console.error('Error estimating gas:', err);
      throw err;
    }
  }
}

export default new IotaService();
