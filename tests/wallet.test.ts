import BTCRPC from '../src';

const client = new BTCRPC({
  host: process.env['RPC_HOST'],
  user: process.env['RPC_USER'],
  pass: process.env['RPC_PASS'],
});

test('Get Address Info', async () => {
  const info = await client.getAddressInfo('1GHBBJHUsp5tbJtH99eaxVdSo6iwh9E253');
  console.log(info);
  expect(true).toBe(true);
});
