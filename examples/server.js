var taiyi = require('../lib');

taiyi.api.setOptions({ 
	url: 'ws://127.0.0.1:8090',
	chain_id: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

taiyi.api.getAccountCount(function(err, result) {
	console.log(err, result);
});

taiyi.api.getAccounts(['hongzhong'], function(err, result) {
	console.log(err, result);
});

taiyi.api.streamOperations(function(err, result) {
	console.log(err, result);
});
