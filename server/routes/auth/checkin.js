/* eslint-disable no-console */
const multibase = require('multibase');
const moment = require('moment');
const { fromAddress } = require('@arcblock/forge-wallet');
const { client } = require('../../libs/auth');

const description = {
  en: 'Sign this transaction to receive 25 TBA for test purpose',
  zh: '签名该交易，你将获得 25 个测试用的 TBA',
};

module.exports = {
  action: 'checkin',
  claims: {
    signature: ({ extraParams: { locale } }) => ({
      txType: 'PokeTx',
      txData: {
        nonce: 0,
        itx: {
          date: moment(new Date().toISOString())
            .utc()
            .format('YYYY-MM-DD'),
          address: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        },
      },
      description: description[locale] || description.en,
    }),
  },
  onAuth: async ({ claims, did, extraParams: { locale } }) => {
    try {
      const claim = claims.find(x => x.type === 'signature');
      const tx = client.decodeTx(multibase.decode(claim.origin));
      const wallet = fromAddress(did);
      console.log('poke.onAuth.payload', { tx, claim });

      const hash = await client.sendTransferTx({
        tx,
        wallet,
        signature: claim.sigHex,
      });
      console.log('poke.onAuth', hash);

      return { hash };
    } catch (err) {
      console.error('poke.onAuth.error', err);
      const errors = {
        en: 'Checkin failed, please try tomorrow!',
        zh: '签到失败，请明天重试',
      };
      throw new Error(errors[locale] || errors.en);
    }
  },
  onComplete: ({ did }) => {
    console.log('poke.onComplete', { did });
  },
};
