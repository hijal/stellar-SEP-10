const { getChallenge } = require('../../services/sep10/auth.service');
const sign = require('../../user/sign');

const challenge = (req, res, next) => {
  try {
    const account = req.query.account;
    const homeDomain = req.query.home_domain;
    const webAuthDomain = req.query.web_auth_domain;

    if (!account) {
      return res.status(400).json({
        error: 'Required parameter is mising'
      });
    }

    const tx = getChallenge(account, homeDomain, webAuthDomain);

    // TODO: Must remove from here
    // const userSign = sign(tx.transaction, tx.network_passphrase);
    // res.status(200).json({
    //   transaction: userSign.toEnvelope().toXDR('base64'),
    //   network_passphrase: tx.network_passphrase
    // });
    res.status(200).json({
      transaction: tx.transaction,
      network_passphrase: tx.network_passphrase
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

module.exports = challenge;
