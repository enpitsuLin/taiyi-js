require('babel-polyfill');
import assert from 'assert';
import should from 'should';
import taiyi from '../src';
import api from '../src/api';

describe('taiyi.api:', function () {
  this.timeout(30 * 1000);

  describe('setOptions', () => {
    it('works', () => {
      let url = taiyi.config.get('url');
      if(! url) url = taiyi.config.get('uri');
      if(! url) url = taiyi.config.get('websocket');
      taiyi.api.setOptions({ url: url, useAppbaseApi: true });
    });
  });

  describe('streamBlockNumber', () => {
    it('streams taiyi transactions', (done) => {
      let i = 0;
      const release = taiyi.api.streamBlockNumber((err, block) => {
        should.exist(block);
        block.should.be.instanceOf(Number);
        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamBlock', () => {
    it('streams taiyi blocks', (done) => {
      let i = 0;
      const release = taiyi.api.streamBlock((err, block) => {
        try {
          should.exist(block);
          block.should.have.properties([
            'previous',
            'transactions',
            'timestamp',
          ]);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamTransactions', () => {
    it('streams taiyi transactions', (done) => {
      let i = 0;
      const release = taiyi.api.streamTransactions((err, transaction) => {
        try {
          should.exist(transaction);
          transaction.should.have.properties([
            'ref_block_num',
            'operations',
            'extensions',
          ]);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('streamOperations', () => {
    it('streams taiyi operations', (done) => {
      let i = 0;
      const release = taiyi.api.streamOperations((err, operation) => {
        try {
          should.exist(operation);
        } catch (err2) {
          release();
          done(err2);
          return;
        }

        i++;
        if (i === 2) {
          release();
          done();
        }
      });
    });
  });

  describe('with retry', () => {
    let taiyiApi;
    beforeEach(() => {
      taiyiApi = new api.Taiyi({});
    });

    it('works by default', async function() {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          const data = JSON.parse(req.body);
          res({
            ok: true,
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: ['hongzhong'],
            }),
          });
          attempts++;
        }),
      });
      const result = await taiyiApi.getAccountsAsync(['hongzhong'])
      assert.equal(attempts, 1);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('does not retry by default', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          rej(new Error('Bad request'));
          attempts++;
        }),
      });

      let result;
      let errored = false;
      try {
        result = await taiyiApi.getAccountsAsync(['hongzhong'])
      } catch (e) {
        errored = true;
      }
      assert.equal(attempts, 1);
      assert.equal(errored, true);
    });

    it('works with retry passed as a boolean', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          const data = JSON.parse(req.body);
          res({
            ok: true,
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: ['hongzhong'],
            }),
          });
          attempts++;
        }),
      });

      const result = await taiyiApi.getAccountsAsync(['hongzhong'])
      assert.equal(attempts, 1);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('retries with retry passed as a boolean', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        retry: true,
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          if (attempts < 1) {
            rej(new Error('Bad request'));
          } else {
            const data = JSON.parse(req.body);
            res({
              ok: true,
              json: () => Promise.resolve({
                jsonrpc: '2.0',
                id: data.id,
                result: ['hongzhong'],
              }),
            });
          }
          attempts++;
        }),
      });

      let result;
      let errored = false;
      try {
        result = await taiyiApi.getAccountsAsync(['hongzhong']);
      } catch (e) {
        errored = true;
      }
      assert.equal(attempts, 2);
      assert.equal(errored, false);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('works with retry passed as an object', async() => {
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        retry: {
          retries: 3,
          minTimeout: 1, // 1ms
        },
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          const data = JSON.parse(req.body);
          res({
            ok: 'true',
            json: () => Promise.resolve({
              jsonrpc: '2.0',
              id: data.id,
              result: ['hongzhong'],
            }),
          });
        }),
      });

      const result = await taiyiApi.getAccountsAsync(['hongzhong']);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('retries with retry passed as an object', async() => {
      let attempts = 0;
      taiyiApi.setOptions({
        url: 'http://127.0.0.1:8091',
        retry: {
          retries: 3,
          minTimeout: 1,
        },
        fetchMethod: (uri, req) => new Promise((res, rej) => {
          if (attempts < 1) {
            rej(new Error('Bad request'));
          } else {
            const data = JSON.parse(req.body);
            res({
              ok: true,
              json: () => Promise.resolve({
                jsonrpc: '2.0',
                id: data.id,
                result: ['hongzhong'],
              }),
            });
          }
          attempts++;
        }),
      });

      let result;
      let errored = false;
      try {
        result = await taiyiApi.getAccountsAsync(['hongzhong']);
      } catch (e) {
        errored = true;
      }
      assert.equal(attempts, 2);
      assert.equal(errored, false);
      assert.deepEqual(result, ['hongzhong']);
    });

    it('does not retry non-retriable operations');
  });

});
