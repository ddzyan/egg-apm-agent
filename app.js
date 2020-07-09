'use strict';
const apm = require('./apm-register');

const ApmErrorTransport = require('./lib/apm-error-transport');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {}

  configDidLoad() {}

  async didLoad() {}

  async willReady() {
    // All plugins have started, can do some thing before app ready
    this.app.apm = apm;
    // 设置错误日志的传输通道。所有logger.error的错误，都会发送到APM上面。
    app.getLogger('errorLogger').set('apmError', new ApmErrorTransport({ level: 'ERROR' }, apm));
  }

  async didReady() {}

  async serverDidReady() {}

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;