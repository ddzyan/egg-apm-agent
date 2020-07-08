'use strict';

const mock = require('egg-mock');

describe('test/egg-apm-agent.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-apm-agent-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, eggApmAgent')
      .expect(200);
  });
});
