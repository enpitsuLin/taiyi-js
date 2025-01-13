import express, { Express, RequestHandler } from 'express';
import bodyParser from 'body-parser';

let taiyi = require('@taiyinet/taiyi-js');
taiyi.api.setOptions({ 
	url: 'ws://127.0.0.1:8090',
	chain_id: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

console.log("Taiyi Account Simple Server");

const app: Express = express();
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

const creator_name = process.env.CREATOR_NAME?process.env.CREATOR_NAME:"";
const creator_key = process.env.CREATOR_WIF?process.env.CREATOR_WIF:"";

if(creator_name == "" || creator_key == "")
    console.error("Can not create account without CREATOR_NAME or CREATOR_WIF set");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/create', async (req, res) => {
    console.log(req.body);
    req.body = req.body?req.body:{};
	var name = req.body.username?req.body.username:"";
	var pass = req.body.password?req.body.password:"";

	if(name == "" || pass == "") {
		let e = "can not create new account without username and password";
        console.warn(e);
        res.send({status:false, err:e});
        return;
	}

    var logTime = new Date();
    console.log(`[${logTime.toLocaleTimeString()}] new account for ${name})`);

    try {
        const keys = taiyi.auth.generateKeys(name, pass, ['posting', 'active', 'owner', 'memo']);
        const chainProps = await taiyi.api.getChainPropertiesAsync()
        await taiyi.broadcast.accountCreateAsync(
            creator_key,
            chainProps.account_creation_fee,
            creator_name,
            name,
            {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[keys.owner, 1]],
            },
            {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[keys.active, 1]],
            },
            {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[keys.posting, 1]],
            },
            keys.memo,
            ""     
        )

        // check
        const [newAcc] = await taiyi.api.getAccountsAsync([name])
		logTime = new Date();
		console.log(`[${logTime.toLocaleTimeString()}] Account ${name}(id=${newAcc.id}) has been created.`);

		res.send({
            "status" : true,
			"name" : name
		});
        return;
	} catch(err) {
        var logTime = new Date();
        console.log(`[${logTime.toLocaleTimeString()}] create ${name} error!`);
        console.log(err.toString());
        res.send({status:false, err:err.toString()});
        return;
    };
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

const args = require('minimist')(process.argv.slice(2));

let NODE_SERVER = "http://127.0.0.1:8091"

if (args.server) {
	NODE_SERVER = args.server;
}

const server = app.listen(8080, () => {
	let info : any = server.address();
	let host = info.address;
	let port = info.port;
	console.log('Http server listening at http://%s:%s', host, port);
});
