'use strict';

if (!process.env.ELASTIC_APM_SERVICE_NAME || !process.env.ELASTIC_APM_SERVER_URL) {
  console.error('Missing ELASTIC_APM_SERVICE_NAME or ELASTIC_APM_SERVER_URL, failed to luanch apm agent...');
  process.exit(1);
} {
  console.log('Start apm agent...');
  console.log('apm-agent options :');
  Object.keys(process.env).forEach(key=>{
    if(key.startsWith('ELASTIC_APM'))console.log(key,process.env[key]);
  })
  const apm = require('elastic-apm-node').start();
  apm.addPatch('egg', require.resolve('./instrumentation/egg'));
  apm.addPatch('@eggjs/router', require.resolve('./instrumentation/egg-router'));
  module.exports = apm;
}
