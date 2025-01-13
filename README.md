[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hongzhongx/taiyi-js/blob/master/LICENSE)

# Taiyi.js
Taiyi.js the JavaScript API for Taiyi network

# Documentation

- [Install](doc/README.md#install)
- [Browser](doc/README.md#browser)
- [Config](doc/README.md#config)
- [Database API](doc/README.md#api)
    - [Subscriptions](doc/README.md#subscriptions)
    - [Blocks and transactions](doc/README.md#blocks-and-transactions)
    - [Globals](doc/README.md#globals)
    - [Keys](doc/README.md#keys)
    - [Accounts](doc/README.md#accounts)
    - [Authority / validation](doc/README.md#authority--validation)
    - [Simings](doc/README.md#simings)
- [Login API](doc/README.md#login)
- [Broadcast API](doc/README.md#broadcast-api)
- [Broadcast](doc/README.md#broadcast)
- [Auth](doc/README.md#auth)


Here is full documentation:
https://github.com/hongzhongx/taiyi-js/tree/master/doc/README.md

## Browser
```html
<script src="./taiyi.min.js"></script>
<script>
taiyi.api.getAccounts(['taisifu', 'dasifu'], function(err, response){
    console.log(err, response);
});
</script>
```

## CDN
https://cdn.jsdelivr.net/npm/@taiyinet/taiyi/dist/taiyi.min.js<br/>
```html
<script src="https://cdn.jsdelivr.net/npm/@taiyinet/taiyi/dist/taiyi.min.js"></script>
```

## Webpack
[Please have a look at the webpack usage example.](https://github.com/hongzhongx/taiyi-js/blob/master/examples/webpack-example)

## Server

## Install
```
$ npm install @taiyinet/taiyi-js --save
```

## RPC Servers
https://api.taiyi.com By Default<br/>

## Examples
### Broadcast Vote
```js
var taiyi = require('@taiyinet/taiyi-js');

var wif = taiyi.auth.toWif(username, password, 'posting');
taiyi.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
taiyi.api.getAccounts(['taisifu', 'zuowangdao'], function(err, result) {
	console.log(err, result);
});
```

### Taiyi Testnet
taiyi-js requires some configuration to work on the public taiyi testnet.

You need to set two Taiyi API options, `address_prefix` and `chain_id`.
```js
taiyi.api.setOptions({
  address_prefix: 'TAI',
  chain_id: '18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e',
  useTestNet: true,
});
```

The Chain ID could change. If it does, it may not be reflected here, but will be documented on any testnet launch announcements.

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them. If you would like to contribute, but don't know what to work on, check the issues list.

## Issues
When you find issues, please report them!

## License
MIT
