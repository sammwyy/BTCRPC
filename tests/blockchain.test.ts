import BTCRPC from '../src';

const client = new BTCRPC({
  host: process.env['RPC_HOST'],
  user: process.env['RPC_USER'],
  pass: process.env['RPC_PASS'],
});

/*
test('Get Best Block Hash', async () => {
  const hash = await client.getBestBlockHash();
  const isValid = hash.startsWith('000000');
  expect(isValid).toBe(true);
});

test('Get Block', async () => {
  const block = await client.getBlock('0000000000000000000ada83ad62f33190436b93cd9917e6d1d118d8da1b0108');
  expect(block.height).toBe(717465);
});

test('Get Blockchain Info', async () => {
  const info = await client.getBlockchainInfo();
  expect(info.chain).toBe('main');
});

test('Get Block Count', async () => {
  const blocks = await client.getBlockCount();
  expect(blocks).toBeGreaterThan(700000);
});
*/
