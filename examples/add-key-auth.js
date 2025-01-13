const taiyi = require('../lib');

/* Generate private active WIF */
const username = process.env.TAIYI_USERNAME;
const password = process.env.TAIYI_PASSWORD;
const privActiveWif = taiyi.auth.toWif(username, password, 'active');

/** Add posting key auth */
taiyi.broadcast.addKeyAuth({
    signingKey: privActiveWif,
    username,
    authorizedKey: 'TAI88CPfhCmeEzCnvC1Cjc3DNd1DTjkMcmihih8SSxmm4LBqRq5Y9',
    role: 'posting',
  },
  (err, result) => {
    console.log(err, result);
  }
);
