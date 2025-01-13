const taiyi = require('@taiyinet/taiyi/lib/browser');

console.log('Getting post content...');
const resultP = taiyi.api.getContentAsync('yamadapc', 'test-1-2-3-4-5-6-7-9');
resultP.then(result => console.log(result));
