interface IForkInfo {
  type: string;
  active: boolean;
  height: number;
}

export default interface IBlockchainInfo {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprocess: number;
  initialblockdownloaded: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  softforks: {
    bip34: IForkInfo;
    bip66: IForkInfo;
    bip65: IForkInfo;
    csv: IForkInfo;
    segwit: IForkInfo;
    taproot: IForkInfo;
  };
  warnings: string;
}
