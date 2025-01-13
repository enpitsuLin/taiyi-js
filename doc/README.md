# Documentation

- [Install](#install)
- [Browser](#browser)
- [Config](#config)
- [JSON-RPC](#jsonrpc)
- [Database API](#api)
    - [Subscriptions](#subscriptions)
    - [Blocks and transactions](#blocks-and-transactions)
    - [Globals](#globals)
    - [Keys](#keys)
    - [Accounts](#accounts)
    - [Authority / validation](#authority--validation)
    - [Simings](#simings)
- [Login API](#login)
- [Broadcast API](#broadcast-api)
- [Broadcast](#broadcast)
- [Auth](#auth)
- [Formatter](#formatter)

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Install
```sh
$ npm install @taiyinet/taiyi-js --save
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Browser 
```html 
<script src="./taiyi.min.js"></script>
<script>
taiyi.api.getAccounts(['sifu', 'hongzhong'], function(err, response) {
    console.log(err, response);
});
</script>
```
- - - - - - - - - - - - - - - - - -
## Config
Default config should work with taiyi. however you can change it to work with othernet by 
```js
taiyi.api.setOptions({ url: 'wss://ws.othernet.io' }); // assuming websocket is working at ws.othernet.io
taiyi.config.set('address_prefix','TBD');
taiyi.config.set('chain_id','fc2a3038b478c839e4cb0c941ff4eaeb7df40bdd68bd441afd444b9da763ddc2');
```
- - - - - - - - - - - - - - - - - -
### set
```js
taiyi.config.set('address_prefix','TAI');
```
- - - - - - - - - - - - - - - - - -
### get
```js
taiyi.config.get('chain_id');
```
- - - - - - - - - - - - - - - - - -
## JSON-RPC
Here is how to activate JSON-RPC transport:
```js
taiyi.api.setOptions({ url: 'https://api.taiyi.com' });
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# API
- - - - - - - - - - - - - - - - - -
## Subscriptions
- - - - - - - - - - - - - - - - - -
### Set Subscribe Callback
```js
taiyi.api.setSubscribeCallback(callback, clearFilter, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Pending Transaction Callback
```js
taiyi.api.setPendingTransactionCallback(cb, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Block Applied Callback
```js
taiyi.api.setBlockAppliedCallback(cb, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Cancel All Subscriptions
```js
taiyi.api.cancelAllSubscriptions(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Blocks and transactions
- - - - - - - - - - - - - - - - - -
### Get Block Header
```js
taiyi.api.getBlockHeader(blockNum, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Block
```js
taiyi.api.getBlock(blockNum, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Ops In Block
Gets all operations in a given block

```js
taiyi.api.getOpsInBlock(blockNum, onlyVirtual, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|blockNum|number|A positive number|
|onlyVirtual|bool|'false' to get all operations. 'true' to only get virtual operations|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.api.getOpsInBlock(10000001, false, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { trx_id: '4b688c13940fd5b4bb11356286ef12061f71976c',
    block: 10000001,
    trx_in_block: 0,
    op_in_trx: 0,
    virtual_op: 0,
    timestamp: '2017-03-08T17:34:24',
    op: [ 'vote', [Object] ] },
  { trx_id: 'a450debc8332c3b27935b3307891dfc509669edc',
    block: 10000001,
    trx_in_block: 2,
    op_in_trx: 0,
    virtual_op: 0,
    timestamp: '2017-03-08T17:34:24',
    op: [ 'vote', [Object] ] } ]

```
- - - - - - - - - - - - - - - - - -
## Globals
- - - - - - - - - - - - - - - - - -
### Get Config
```js
taiyi.api.getConfig(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Dynamic Global Properties
```js
taiyi.api.getDynamicGlobalProperties(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Chain Properties
```js
taiyi.api.getChainProperties(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Version
Gets the version of the Taiyi blockchain you are connected to.

```js
taiyi.api.getVersion(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.api.getVersion(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ blockchain_version: '0.1.3',
  taiyi_revision: '07be64314ce9d277eb7da921b459c993c2e2412c',
  fc_revision: '8dd1fd1ec0906509eb722fa7c8d280d59bcca23d' }
```
- - - - - - - - - - - - - - - - - -
### Get Volume
Gets the YANG and QI volumes

```js
taiyi.api.getVolume(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.api.getVolume(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ yang_volume: '8101.888 YANG',
	qi_volume: '7287.268000 QI' }
```
- - - - - - - - - - - - - - - - - -
### Get Hardfork Version
Gets the current hardfork version of the Taiyi blockchain.
```js
taiyi.api.getHardforkVersion(function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
'0.1.0'
```
This returns a string and not JSON.

See also: [getNextScheduledHardfork](#get-next-scheduled-hardfork), [getConfig](#get-config)

- - - - - - - - - - - - - - - - - -
### Get Next Scheduled Hardfork
```js
taiyi.api.getNextScheduledHardfork(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Reward Fund
```js
taiyi.api.getRewardFund(name, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Claim Reward Balance
Claims pending rewards, be they YANG, QI or Feigang.

```js
taiyi.broadcast.claimRewardBalance(wif, account, reward_yang, reward_qi, reward_feigang, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Use taiyi.auth.toWif(user, pass, type)|
|account|string|a taiyi username|
|reward_yang|string|balance like "0.000 YANG"|
|reward_qi|string|balance like "0.000000 QI"|
|reward_feigang|string|balance like "0.000006 QI"|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.broadcast.claimRewardBalance("5Hupd....pp7vGY", "username", "0.000 YANG", "0.000000 QI", "0.000006 QI", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ id: '052f.......c6c2f',
  block_num: 19756287,
  trx_num: 40,
  expired: false,
  ref_block_num: 29928,
  ref_block_prefix: 808836877,
  expiration: '2018-02-10T20:12:15',
  operations: [ [ 'claim_reward_balance', [Object] ] ],
  extensions: [],
  signatures: [ '205......614e' ] }
```
- - - - - - - - - - - - - - - - - -
### Claim Reward Balance With Options
Claims pending rewards, be they YANG, QI or Feigang.

```js
taiyi.broadcast.claimRewardBalanceWith(wif, options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Use < taiyi.auth.toWif(user, pass, type) >|
|options|object|an object containing the calim parameters. Look at the example below.|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var options = {
    account:"username",
    reward_yang:"0.000 YANG",
    reward_qi:"0.000000 QI",
    reward_feigang:"0.000006 QI"
}
taiyi.broadcast.claimRewardBalanceWith("5Hupd....pp7vGY", options, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 { id: '4b7b........034c7',
  block_num: 19756322,
  trx_num: 3,
  expired: false,
  ref_block_num: 29965,
  ref_block_prefix: 4245658614,
  expiration: '2018-02-10T20:14:00',
  operations: [ [ 'claim_reward_balance', [Object] ] ],
  extensions: [],
  signatures: [ '1f61a..........4f3d7' ] }
```
- - - - - - - - - - - - - - - - - -
### Get Qi Delegations
Returns a list of delegations made from one `account`. Denominated in QI.
```js
taiyi.api.getQiDelegations(account, from, limit, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|account|Account who is making the delegations|String||
|from|The name of the last account to begin from|String|Use the empty string `''` to start the list. Subsequent calls can use the last delegatee's account name|
|limit|The maximum number of delegation records to return|Integer||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
taiyi.api.getQiDelegations('hongzhong', '', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { id: 498422, delegator: 'hongzhong', delegatee: 'sifu', vesting_shares: '409517519.233783 QI', min_delegation_time: '2018-01-16T19:30:36' },
  { id: 181809, delegator: 'hongzhong', delegatee: 'bailingmiao', vesting_shares: '1029059275.000000 QI', min_delegation_time: '2017-08-08T15:25:15' } ]
```

Using the Result:
```js
// Extract delegatee names from the result into an array of account name strings
var f = result.map(function(item) { return item.delegatee; });
console.log(f);

```
- - - - - - - - - - - - - - - - - -
## Keys
- - - - - - - - - - - - - - - - - -
### Get Key References
```js
taiyi.api.getKeyReferences(key, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Accounts
- - - - - - - - - - - - - - - - - -
### Get Accounts
```js
taiyi.api.getAccounts(names, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account References
```js
taiyi.api.getAccountReferences(accountId, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Lookup Account Names
```js
taiyi.api.lookupAccountNames(accountNames, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Lookup Accounts
```js
taiyi.api.lookupAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account Count
```js
taiyi.api.getAccountCount(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Conversion Requests
```js
taiyi.api.getConversionRequests(accountName, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account History
```js
taiyi.api.getAccountHistory(account, from, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Owner History
```js
taiyi.api.getOwnerHistory(account, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Recovery Request
```js
taiyi.api.getRecoveryRequest(account, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Authority / validation
- - - - - - - - - - - - - - - - - -
### Get Transaction Hex
```js
taiyi.api.getTransactionHex(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Transaction
```js
taiyi.api.getTransaction(trxId, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Required Signatures
```js
taiyi.api.getRequiredSignatures(trx, availableKeys, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Potential Signatures
```js
taiyi.api.getPotentialSignatures(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Verify Authority
```js
taiyi.api.verifyAuthority(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Verify Account Authority
```js
taiyi.api.verifyAccountAuthority(nameOrId, signers, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Simings
- - - - - - - - - - - - - - - - - -
### Get Simings
```js
taiyi.api.getSimings(simingIds, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Siming By Account
Returns information about a siming with the given `accountName`.
```js
taiyi.api.getSimingByAccount(accountName, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|accountName|The account name of the siming to query|String||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|

Call Example:
```js
taiyi.api.getQiDelegations('sircork', '', 2, function(err, result) {
  console.log(err, result);
});
```

See also: 
- - - - - - - - - - - - - - - - - -
### Get Simings By Adoring
```js
taiyi.api.getSimingesByAdoring(from, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Lookup Siming Accounts
```js
taiyi.api.lookupSimingAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Siming Count
```js
taiyi.api.getSimingCount(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Active Simings
```js
taiyi.api.getActiveSimings(function(err, result) {
  console.log(err, result);
});

```
- - - - - - - - - - - - - - - - - -
### Get Siming Schedule
Gets some general information about the simings.

```js
taiyi.api.getSimingSchedule(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.api.getSimingSchedule(function(err, data) {
  console.log(err,data);
}
```

Return Example:
```js
{ id: 0,
  current_virtual_time: '292589412128104496649868821',
  next_shuffle_block_num: 19756485,
  current_shuffled_simings: '31797..................00000000',
  num_scheduled_simings: 21,
  top19_weight: 1,
  timeshare_weight: 5,
  siming_pay_normalization_factor: 25,
  median_props: 
   { account_creation_fee: '0.100 YANG',
     maximum_block_size: 65536},
  majority_version: '0.1.0',
  max_voted_simings: 20,
  max_runner_simings: 1,
  hardfork_required_simings: 17 }
```
- - - - - - - - - - - - - - - - - -
## Login API
- - - - - - - - - - - - - - - - - -
### Login

/!\ It's **not safe** to use this method with your username and password. This method always return `true` and is only used internally with empty values to enable broadcast.

```js
taiyi.api.login('', '', function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Api By Name
```js
taiyi.api.getApiByName(apiName, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Broadcast API
- - - - - - - - - - - - - - - - - -
### Broadcast Block With Options
Broadcast a new block on the taiyi blockchain.

```js
taiyi.api.broadcastBlockWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { b: blockObject } where blockObject contains the information on the block you are trying to broadcast|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var options = { 
    b: {
        previous:"0000000000000000000000000000000000000000",
        timestamp:"1970-01-01T00:00:00",
        siming:"",
        transaction_merkle_root:"0000000000000000000000000000000000000000",
        extensions:[],
        siming_signature:
            "00000000000000000000000000000000000000000000000000000000000000000"+
            "00000000000000000000000000000000000000000000000000000000000000000",
        transactions: []
    }
};

taiyi.api.broadcastBlockWith(options, function(err, data) {
	console.log(err, data);
});
```
- - - - - - - - - - - - - - - - - -
### Broadcast Transaction Synchronous
```js
taiyi.api.broadcastTransactionSynchronous(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Broadcast Block
```js
taiyi.api.broadcastBlock(b, function(err, result) {
  console.log(err, result);
});
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Broadcast
The `taiyi.broadcast` methods cause permanent changes on the blockchain.
- - - - - - - - - - - - - - - - - -
### Account Create
```js
taiyi.broadcast.accountCreate(wif, fee, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Delegate Qi
Delegates Qi, denominated in QI, from a `delegator` to the `delegatee`. Requires the `delegator`'s private WIF key. Set the delegation to 0 to undelegate.
```js
taiyi.broadcast.delegateVestingShares(wif, delegator, delegatee, qi, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Account Update
```js
taiyi.broadcast.accountUpdate(wif, account, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Account Siming Proxy
```js
taiyi.broadcast.accountSimingProxy(wif, account, proxy, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Account Siming Vote
```js
taiyi.broadcast.accountSimingVote(wif, account, siming, approve, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Change Recovery Account
```js
taiyi.broadcast.changeRecoveryAccount(wif, accountToRecover, newRecoveryAccount, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Custom
```js
taiyi.broadcast.custom(wif, requiredAuths, id, data, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Custom Json
```js
taiyi.broadcast.customJson(wif, requiredAuths, requiredPostingAuths, id, json, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Fill Qi Withdraw
```js
taiyi.broadcast.fillQiWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Withdraw Routes
Gets withdraw routes (taiyi qi withdraws).

```js
taiyi.api.getWithdrawRoutes(account, withdrawRouteType, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a taiyi username|
|withdrawRouteType|number|a number representing a value from an enumeration. Must be 0, 1 or 2|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.api.getWithdrawRoutes("username", 1, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { from_account: 'username',
    to_account: 'receiver',
    percent: 10000,
    auto_vest: false } ]
```
- - - - - - - - - - - - - - - - - -
### Prove Authority
```js
taiyi.broadcast.proveAuthority(wif, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Recover Account
```js
taiyi.broadcast.recoverAccount(wif, accountToRecover, newOwnerAuthority, recentOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Reset Account
Changes the `current_reset_account` of the `account` to a new `reset_account`

```js
taiyi.broadcast.setResetAccount(wif, account, current_reset_account, reset_account, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Use < taiyi.auth.toWif(user, pass, type) >|
|account|string|a taiyi username|
|current_reset_account|string|a taiyi username|
|reset_account|string|a taiyi username|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
taiyi.broadcast.setResetAccount(wif, "username", "oldresetaccount", "newresetaccount", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 AssertException
	`false: Set Reset Account Operation is currently disabled.`
```
- - - - - - - - - - - - - - - - - -
### Request Account Recovery
```js
taiyi.broadcast.requestAccountRecovery(wif, recoveryAccount, accountToRecover, newOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Withdraw Qi Route
```js
taiyi.broadcast.setWithdrawQiRoute(wif, fromAccount, toAccount, percent, autoVest, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Transfer
Transfers assets, such as YANG or GOLD..., from one account to another.
```js
taiyi.broadcast.transfer(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take asset from|String|No leading @ symbol|
|to|Account name to place asset into|String|No leading @ symbol|
|amount|Amount of of asset to transfer|String|"X.XXX ASSET" must have 3 decimal places. e.g. "5.150 YANG"|
|function()|Your callback|function||

See also: [transferToQi](#transfer-to-qi)
- - - - - - - - - - - - - - - - - -
### Transfer To Qi
YANG into QI. This method supports powering up one account from another.
```js
taiyi.broadcast.transferToQi(wif, from, to, amount, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take YANG from|String|No leading @ symbol|
|to|Account name to power qi into|String|No leading @ symbol. Can be the same account as `to`|
|amount|Amount of YANG to power up|String|"X.XXX YANG" must have 3 decimal places. e.g. "25.100 YANG". Must be denominated in YANG|
|function()|Your callback|function||

See also: [transfer](#transfer)
- - - - - - - - - - - - - - - - - -
### Withdraw Qi
```js
taiyi.broadcast.withdrawQi(wif, account, vestingShares, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Siming Update
```js
taiyi.broadcast.simingUpdate(wif, owner, url, blockSigningKey, props, fee, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Fill Qi Withdraw
```js
taiyi.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Multisig
You can use multisignature to broadcast an operation.
```js
taiyi.broadcast.send({
  extensions: [],
  operations: [
    ['vote', {
      voter: 'guest123',
      author: 'fabien',
      permlink: 'test',
      weight: 1000
    }]
  ]}, [privPostingWif1, privPostingWif2], (err, result) => {
  console.log(err, result);
});
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Auth
- - - - - - - - - - - - - - - - - -
### Verify
```js
taiyi.auth.verify(name, password, auths);
```
- - - - - - - - - - - - - - - - - -
### Generate Keys
```js
taiyi.auth.generateKeys(name, password, roles);
```
- - - - - - - - - - - - - - - - - -
### Get Private Keys
```js
taiyi.auth.getPrivateKeys(name, password, roles);
```
- - - - - - - - - - - - - - - - - -
### Is Wif
```js
taiyi.auth.isWif(privWif);
```
- - - - - - - - - - - - - - - - - -
### To Wif
```js
taiyi.auth.toWif(name, password, role);
```
- - - - - - - - - - - - - - - - - -
### Wif Is Valid
```js
taiyi.auth.wifIsValid(privWif, pubWif);
```
- - - - - - - - - - - - - - - - - -
### Wif To Public
```js
taiyi.auth.wifToPublic(privWif);
```
- - - - - - - - - - - - - - - - - -
### Sign Transaction
```js
taiyi.auth.signTransaction(trx, keys);
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Formatter
- - - - - - - - - - - - - - - - - -
### Amount
Formats number and currency to the valid way for sending (for example - it trims the number's floating point remainer to 3 digits only).

```js
taiyi.formatter.amount(_amount, asset);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|_amount|number|A positive number|
|asset|string|The name of a taiyi asset (yang, qi)|


Call Example:
```js
taiyi.formatter.amount(53.442346, "YANG");
```

Return Example:
```js
 "53.442 YANG" 
```
- - - - - - - - - - - - - - - - - -
### Number With Commas
Formats a big number, by adding a comma on every 3 digits.
Attention - only works on strings. No numbers can be passed directly.

```js
taiyi.formatter.numberWithCommas(x);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|x|string|Number to format as string|


Call Example:
```js
taiyi.formatter.numberWithCommas(53304432342.432.toString());
// or
taiyi.formatter.numberWithCommas("53304432342.432");
```

Return Example:
```js
 "53,304,432,342.432" 
```
- - - - - - - - - - - - - - - - - -
### Create Suggested Password
```js
var password = taiyi.formatter.createSuggestedPassword();
console.log(password);
// => 'GAz3GYFvvQvgm7t2fQmwMDuXEzDqTzn9'
```
- - - - - - - - - - - - - - - - - -
# Utils
- - - - - - - - - - - - - - - - - -
### Validate Username
```js
var isValidUsername = taiyi.utils.validateAccountName('test1234');
console.log(isValidUsername);
// => 'null'

var isValidUsername = taiyi.utils.validateAccountName('a1');
console.log(isValidUsername);
// => 'Account name should be longer.'
```
- - - - - - - - - - - - - - - - - -
### Camel Case
Formats a string with '_' characters to follow the CamelCase notation instead.

```js
taiyi.utils.camelCase(str);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|str|string|the string will be converted to camelCase like "exampleString"|


Call Example:
```js
taiyi.utils.camelCase("example_string");
```

Return Example:
```js
"exampleString"
```
