'use strict';

/**
 * egg-egg-apm-agent default config
 * @member Config#eggApmAgent
 * @property {String} SOME_KEY - some description
 */
exports.eggApmAgent = {
  onerror: {
    accepts: () => 'json',
    all(err, ctx) {
      ctx.body = { code: ctx.status || 500, msg: err.message || '系统错误' };
      // tslint:disable-next-line: no-unused-expression
      ctx.app.apm && ctx.app.apm.captureError(err);
    },
  },
};
