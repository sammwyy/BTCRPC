import fetch from 'node-fetch';
import IBitcoinRPCConfig from './IBitcoinRPCConfig';
import IBlock from './IBlock';
import IBlockchainInfo from './IBlockchainInfo';
import IBlockFilterResult from './IBlockFilterResult';
import IBlockHeader from './IBlockHeader';
import IBlockStats from './IBlockStats';
import IChainTXStats from './IChainTXStats';
import ITip from './ITip';

class BTCRPC {
  private readonly config: IBitcoinRPCConfig;

  constructor(config: IBitcoinRPCConfig) {
    if (!config.host) config.host = 'localhost';
    if (!config.port) config.port = 8332;

    this.config = config;
  }

  async exec(methodName: String, params?: any[]) {
    if (!params) params = [];

    const url = 'http://' + this.config.host + ':' + this.config.port + '/';
    const data = {
      jsonrpc: '1.0',
      id: 'btcrpc',
      method: methodName,
      params: params,
    };
    const dataStr = JSON.stringify(data);
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        Host: this.config.host,
        Authorization: 'Basic ' + Buffer.from(this.config.user + ':' + this.config.pass).toString('base64'),
        'Content-Length': dataStr.length as unknown as string,
      },
      body: dataStr,
    });
    const res = await req.json();
    if (res.error) {
      console.log(res.error);
      throw new Error(res.error);
    }
    return res.result;
  }

  /* Blockchain */
  async getBestBlockHash(): Promise<string> {
    return await this.exec('getbestblockhash');
  }

  async getBlock(blockHash: string): Promise<IBlock> {
    return await this.exec('getblock', [blockHash]);
  }

  async getBlockchainInfo(): Promise<IBlockchainInfo> {
    return await this.exec('getblockchaininfo');
  }

  async getBlockCount(): Promise<number> {
    return await this.exec('getblockcount');
  }

  async getBlockFilter(blockhash: string, filtertype?: string): Promise<IBlockFilterResult> {
    if (!filtertype) filtertype = 'basic';
    return await this.exec('getblockfilter', [blockhash, filtertype]);
  }

  async getBlockHash(height: number): Promise<string> {
    return await this.exec('getblockhash', [height]);
  }

  async getblockheader(blockhash: string): Promise<IBlockHeader> {
    return await this.exec('getblockheader', [blockhash]);
  }

  async getBlockStats(hashOrHeight: string | number): Promise<IBlockStats> {
    return await this.exec('getblockstats', [hashOrHeight]);
  }

  async getChainTips(): Promise<ITip[]> {
    return await this.exec('getchaintips');
  }

  async getChainTXStats(nblocks: number): Promise<IChainTXStats> {
    return await this.exec('getchaintxstats', [nblocks]);
  }

  async getDifficulty(): Promise<number> {
    return await this.exec('getdifficulty');
  }

  async getMempoolAncestors(txid: string, verbose = false) {
    return await this.exec('getmempoolancestors', [txid, verbose]);
  }

  /* Wallet */
  async getAddressInfo(address: string) {
    return await this.exec('getaddressinfo', [address]);
  }
}

export default BTCRPC;
module.exports = BTCRPC;
