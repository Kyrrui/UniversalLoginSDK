[![Build Status](https://travis-ci.com/EthWorks/UniversalLoginSDK.svg?branch=master)](https://travis-ci.com/EthWorks/UniversalLoginSDK)

# Ethereum IdentitySDK

Ethereum Identity SDK is composed of smart contracts, a js lib, and a relayer that help build applications using ERC [#725](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md), [#735](https://github.com/ethereum/EIPs/issues/735), [#1077](https://github.com/ethereum/EIPs/pull/1077) and [#1078](https://github.com/ethereum/EIPs/pull/1078).

This is a work in progress. Expect breaking changes. The code has not been audited and therefore can not be considered secure.
Planned functionality for first release include:

- Creating and managing identities
- Multi-factor authentication
- Universal login
- Ether less transactions via relayer

## JS SDK, example usage:

### Getting Started

To create a SDK instance:

```js
import EthereumIdentitySDK from 'EthereumIdentitySDK';
const sdk = new EthereumIdentitySDK(
  'https://relayer.ethworks.io',
  'https://etherscan.io/{yourapikey}'
);
```

To create a new identity:

```js
const [firstPrivateKey, identityAddress] = await sdk.create(
  'alex.ethereum.eth'
);
```

`create` function takes a single parameter:

- ENS name. The name needs to be a non-existing subdomain in ENS domain supported by relayer.

The function will return a pair:

- `privateKey` - a private key that should be stored on given device as securely as possible
- `identityAddress` - address of new identity contract

To reconnect to existing identity, with a private key:

```js
const identityAddress = await sdk.at('alex.ethereum.eth');
```

The call will return the address of the identity contract for later use.

### Transaction execution

To execute a message/transaction:

```js
const message = {
  to: '0x88a5C2c290d9919e46F883EB62F7b8Dd9d0CC45b',
  data: '0x',
  value: '1000000000'
};
const transactionId = await sdk.execute(identityAddress, message, privateKey);
```

The function takes three arguments:

- `identityAddress` - address of that identity that requests execution
- `message` - a message, in the same format as ethereum transaction, to be executed by the relayer
- `privateKey` - a private key to be used to sign the transaction, the corresponding public key address needs to be connected to identity

The function will return one result:

- `transactionId` (also called `nonce`) - an id of execution, might be used to confirm excution

To confirm transaction

```js
await sdk.confirm(identityAddress, transactionId, privateKey);
```

### Events

To subscribe to an event:

```js
const callback(event) = {};
await sdk.subscribe(identityAddress, 'eventType', callback)
```

Possible event names are: `KeyAdded`, `KeyRemoved`, `ConnectionRequested`.

To unsubscribe to an event:

```js
await sdk.unsubscribe(identityAddress, 'eventType', callback);
```

### Key management

To add a key:

```js
const transactionId = await sdk.addKey(identityAddress, publicKey, privateKey);
```

To remove a key:

```js
const transactionId = await sdk.removeKey(
  identityAddress,
  publicKey,
  privateKey
);
```

Generate and request a new key to be added to an existing identity:

```js
const [privateKey, identityAddress] = await sdk.connect('alex.ethereum.eth');
```

This function will generate a new private key and send a request to relayer to add a key to identity. The request needs to be confirmed from public key connected to identity at hand.

The function takes one parameter:

- `ensName` - ENS name of an existing identity

and returns:

- `privateKey` - newly generated private key to be stored on a local device in the most secure way possible
- `identityAddress` - address of identity pointed to by given ENS name

The function will throw:

- `InvalidIdentity` - if Identity does not exist (i.e. ENS Name does not resolve or resolves to a non-identity address)

Confirmation connection (when request event occurs):

```js
await identity.subscribe('ConnectionRequested', event => {
  identity.addKey(event.key, firstPrivateKey);
});
```

## Relayer

To start relayer programmatically:

```js
import Relayer from '../../lib/relayer/relayer';
const privateKey = '0x.....';
const relayer = new Relayer('https://etherscan.io/{yourapikey}', privateKey);
relayer.start();
```

To stop relayer:

```js
relayer.stop();
```

To start relayer from command line:

```sh
npx start-relayer [config-file]
```

Where config file is a JSON file in the following format:

```js
{
  privateKey: '0x123...123',
  port: 3311
}
```

Default port is `3311`, `privateKey` is the only required field.

## Running example on dev environment (quick option)

To install dependencies and build projects run following commands from the main project directory:

```sh
yarn && yarn build
```

To run example:

```sh
cd universal-login-example
yarn dev:start
```

## Running example on dev environment (manual option, deprecated, will be removed soon)

Before running the example, first you must start a mock blockchain. From the `universal-login-relayer` directory run the following command:

```sh
yarn ganache:start
```

then deploy ens contracts and start relayer, from new console in the `universal-login-relayer` directory type:

```sh
yarn ens:deploy
yarn relayer:start
```

then deploy contracts for the example application and run the application (from new console in the `universal-login-example` directory):

```
yarn contracts:deploy
yarn start
```

## Contributing

Contributions are always welcome, no matter how large or small. Before contributing, please read the [code of conduct](https://github.com/EthWorks/UniversalLoginSDK/blob/master/CODE_OF_CONDUCT.md) and [contribution policy](https://github.com/EthWorks/UniversalLoginSDK/blob/master/CONTRIBUTION.md).

Before you issue pull request:
* Make sure all tests and linters pass.
* Make sure you have test coverage for any new features.


## Running linting/tests

You can run lint via:

```sh
./script/lint.sh
```

You can run tests:

```sh
./scripts/test.sh
```

You can ran full clean:
```sh
./scripts/clean.sh
```

And you can emulate full CI process by:
```sh
yarn
./scripts/travis.sh
```

## License

Universal Login SDK is released under the [MIT License](https://opensource.org/licenses/MIT).
