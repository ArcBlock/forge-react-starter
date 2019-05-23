/* eslint-disable no-console */
const multibase = require('multibase');
const { fromTokenToUnit } = require('@arcblock/forge-util');
const { fromAddress } = require('@arcblock/forge-wallet');
const { Payment } = require('../../models');
const { client, wallet } = require('../../libs/auth');

const description = {
  en: 'Please pay 5 TBA to unlock the secret document',
  zh: '请支付 5 TAB 以解锁加密的文档',
};

module.exports = {
  action: 'payment',
  claims: {
    signature: ({ extraParams: { locale } }) => ({
      txType: 'TransferTx',
      txData: {
        itx: {
          to: wallet.address,
          value: {
            value: fromTokenToUnit(5).toBuffer(),
            minus: false,
          },
        },
      },
      description: description[locale] || description.en,
    }),
  },
  // eslint-disable-next-line consistent-return
  onAuth: async ({ claims, did }) => {
    console.log('pay.onAuth', { claims, did });
    try {
      const claim = claims.find(x => x.type === 'signature');
      const tx = client.decodeTx(multibase.decode(claim.origin));
      const user = fromAddress(did);

      const hash = await client.sendTransferTx({
        tx,
        wallet: user,
        signature: claim.sigHex,
      });

      const payment = new Payment({
        did,
        hash,
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await payment.save();
      console.log('pay.onAuth', hash);

      return { hash };
    } catch (err) {
      console.error('pay.onAuth.error', err);
    }
  },
};
