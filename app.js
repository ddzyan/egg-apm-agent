'use strict';
const apm = require('./apm-register');

const ApmErrorTransport = require('./lib/apm-error-transport');

module.exports = app => {
  app.beforeStart(async () => {
    // 目前只有在middleware -> apmRouter 里面使用到 app.apm
    app.apm = apm;
    // 设置错误日志的传输通道。所有logger.error的错误，都会发送到APM上面。
    app.getLogger('errorLogger').set('apmError', new ApmErrorTransport({ level: 'ERROR' }, apm));
  });
};
