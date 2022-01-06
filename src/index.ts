import fetch from 'node-fetch';
import IBitcoinRPCConfig from './IBitcoinRPCConfig';
import IBlock from './IBlock';
import IBlockchainInfo from './IBlockchainInfo';

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
      throw new Error(res.error);
    }
    return res.result;
  }

  async getBestBlockHash(): Promise<string> {
    return await this.exec('getbestblockhash', []);
  }

  async getBlock(blockHash: string): Promise<IBlock> {
    return await this.exec('getblock', [blockHash]);
  }

  async getBlockchainInfo(): Promise<IBlockchainInfo> {
    return await this.exec('getblockchaininfo', []);
  }

  async getBlockCount(): Promise<number> {
    return await this.exec('getblockcount', []);
  }
}

export default BTCRPC;
module.exports = BTCRPC;
