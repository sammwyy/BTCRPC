import IBlockHeader from './IBlockHeader';

export default interface IBlock extends IBlockHeader {
  strippedsize: number;
  size: number;
  weight: number;
  tx: string[];
}
