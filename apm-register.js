'use strict';

if (!process.env.ELASTIC_APM_SERVICE_NAME || !process.env.ELASTIC_APM_SERVER_URL) {
  console.error('Missing ELASTIC_APM_SERVICE_NAME or ELASTIC_APM_SERVER_URL, failed to luanch apm agent...');
} {
  console.log('Start apm agent...');
  const apm = require('elastic-apm-node').start();
  apm.addPatch('egg', require.resolve('./instrumentation/egg'));
  apm.addPatch('@eggjs/router', require.resolve('./instrumentation/egg-router'));
  module.exports = apm;
}
