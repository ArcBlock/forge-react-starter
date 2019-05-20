/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
const ip = require('ip');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const camelCase = require('lodash/camelCase');
const { execSync } = require('child_process');
const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const { name, version } = require('./package.json');
const debug = require('debug')(name);

const defaults = {
  appName: 'Forge React Starter',
  appPort: 3030,
  mongoUri: 'mongodb://127.0.0.1:27017/forge-react-starter',
};

const questions = [
  {
    type: 'text',
    name: 'appName',
    message: 'Application name:',
    default: defaults.appName,
    validate: input => {
      if (!input) return 'Application name should not be empty';
      return true;
    },
  },
  {
    type: 'text',
    name: 'appPort',
    message: 'Application listening port:',
    default: defaults.appPort,
    validate: input => {
      if (!input) return 'Application listening port should not be empty';
      return true;
    },
  },
  {
    type: 'text',
    name: 'mongoUri',
    message: 'Mongodb URI:',
    default: defaults.mongoUri,
    validate: input => {
      if (!input) return 'Mongodb connection string:';
      return true;
    },
  },
];

module.exports = {
  name,
  version,
  questions,
  defaults,
  blacklist: [__filename],

  async onConfigured(config) {
    const { chainHost, chainId, targetDir, appName, appPort, mongoUri, client, symbols } = config;
    const ipAddress = ip.address();

    // Declare application on chain
    const wallet = fromRandom(
      WalletType({
        role: types.RoleType.ROLE_APPLICATION,
        pk: types.KeyType.ED25519,
        hash: types.HashType.SHA3,
      })
    );
    debug('application wallet', wallet.toJSON());
    const hash = await client.sendDeclareTx({
      tx: {
        chainId,
        itx: {
          moniker: camelCase(appName),
        },
      },
      wallet,
    });
    debug('application declare tx', hash);
    console.log(`${symbols.success} application account declared on chain: ${wallet.toAddress()}`);

    // Generate config
    const configPath = path.join(`${targetDir}`, '.env');
    const configContent = `MONGO_URI="${mongoUri}"
CHAIN_ID="${chainId}"
CHAIN_HOST="${chainHost.replace('127.0.0.1', ipAddress).replace('localhost', ipAddress)}"
APP_NAME="${appName}"
APP_PORT="${appPort}"
APP_SK="${wallet.secretKey}"
APP_ID="${wallet.toAddress()}"
APP_TOKEN_SECRET="${wallet.publicKey.slice(16)}"
APP_TTL=3600
BASE_URL="http://${ipAddress}:${appPort}"`;
    fs.writeFileSync(configPath, configContent);
    console.log(`${symbols.success} application config generated ${configPath}`);
  },

  // Run npm install
  onCreated(config) {
    const { targetDir, symbols } = config;
    const pm = shell.which('yarn') ? 'yarn' : 'npm';
    console.log(`${symbols.info} installing application dependencies...`);
    execSync(`cd ${targetDir} && ${pm} install`, { stdio: [0, 1, 2] });
  },

  onComplete(config) {
    const { targetDir } = config;
    const pm = shell.which('yarn') ? 'yarn' : 'npm';
    shell.echo(chalk.cyan(`cd ${targetDir}`));
    shell.echo(chalk.cyan(`${pm} start`));
  },
};
