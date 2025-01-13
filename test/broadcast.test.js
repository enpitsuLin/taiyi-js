import Promise from 'bluebird';
import should from 'should';
import taiyi from '../src';

const username = process.env.TAIYI_USERNAME || 'guest123';
const password = process.env.TAIYI_PASSWORD;
const postingWif = password
  ? taiyi.auth.toWif(username, password, 'posting')
  : '5JRaypasxMx1L97ZUX7YuC5Psb5EAbF821kkAGtBj7xCJFQcbLg';

describe('taiyi.broadcast:', () => {
  it('exists', () => {
    should.exist(taiyi.broadcast);
  });

  it('has generated methods', () => {
    should.exist(taiyi.broadcast.transferToQi);
    should.exist(taiyi.broadcast.withdrawQi);
    should.exist(taiyi.broadcast.accountSimingAdore);
    should.exist(taiyi.broadcast.transfer);
  });

  it('has backing methods', () => {
    should.exist(taiyi.broadcast.send);
  });

  it('has promise methods', () => {
    should.exist(taiyi.broadcast.sendAsync);
    should.exist(taiyi.broadcast.transferToQiAsync);
    should.exist(taiyi.broadcast.transferAsync);
  });

  describe('patching transaction with default global properties', () => {
    it('works', async () => {
      const tx = await taiyi.broadcast._prepareTransaction({
        extensions: [],
        operations: [['vote', {
          voter: 'yamadapc',
          author: 'yamadapc',
          permlink: 'test-1-2-3-4-5-6-7-9',
        }]],
      });

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
      ]);
    });
  });

  describe('no blocks on chain', () => {
    it('works', async () => {
      const newAccountName = username + '-' + Math.floor(Math.random() * 10000);
      const keys = taiyi.auth.generateKeys(
        username, password, ['posting', 'active', 'owner', 'memo']);

      const oldGetDynamicGlobalProperties = taiyi.api.getDynamicGlobalPropertiesAsync;
      taiyi.api.getDynamicGlobalPropertiesAsync = () => Promise.resolve({
        time: '2019-04-14T21:30:56',
        last_irreversible_block_num: 32047459,
      });

      // If the block returned is `null`, then no blocks are on the chain yet.
      const oldGetBlockAsync = taiyi.api.getBlockAsync;
      taiyi.api.getBlockAsync = () => Promise.resolve(null);

      try {
        const tx = await taiyi.broadcast._prepareTransaction({
          extensions: [],
          operations: [[
            'account_create',
            {
              fee: '0.000 YANG',
              creator: username,
              new_account_name: newAccountName,
              owner: {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[keys.owner, 1]],
              },
              active: {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[keys.active, 1]],
              },
              posting: {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[keys.posting, 1]],
              },
              memo_key: keys.memo,
              json_metadata: '',
              extensions: [],
            }
          ]],
        });

        tx.should.have.properties([
          'expiration',
          'ref_block_num',
          'ref_block_prefix',
          'extensions',
          'operations',
        ]);
      } finally {
        taiyi.api.getDynamicGlobalPropertiesAsync = oldGetDynamicGlobalProperties;
        taiyi.api.getBlockAsync = oldGetBlockAsync;
      }
    });
  });

  describe('writeOperations', () => {
    it('receives a properly formatted error response', () => {
      const wif = taiyi.auth.toWif('username', 'password', 'active');
      return taiyi.broadcast.accountSimingProxyAsync(wif, 'hongzhong', 'sifu').
      then(() => {
        throw new Error('writeOperation should have failed but it didn\'t');
      }, (e) => {
        should.exist(e.message);
      });
    });
  });
});
