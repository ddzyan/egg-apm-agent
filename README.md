## 简介
使用 elastic-apm-node 封装 egg 插件，完成对请求路由链路日志的上传elk+apm平台，分析链路中逻辑消耗的时间

参考文档：
1. http://claude-ray.com/2019/07/12/elastic-apm-node-egg/
2. https://code.yeezon.com/zen/egg-apm

### 完成功能
1. 应用路由链路上传
2. 应用错误对象上传


### 使用

```shell
yarn add egg-apm-agent
```

添加插件 config/plugin.js
```js
module.exports = {
 eggApmAgent: {
    enable: true,
    package: 'egg-apm-agent',
    // env: [ 'prod' ], // 建议只在生产环境中启用
  }
}
```

修改 package.json ,添加 apm 服务名称和服务地址，并且在egg之前加载apm-agent模块
```json
{
  "scripts":{
    "debug": "ELASTIC_APM_SERVICE_NAME=test12 ELASTIC_APM_SERVER_URL='http://10.10.0.130:8200' egg-bin debug --require=egg-apm-agent/apm-register.js",
  }
}
```

添加 /app/middleware/apmRouter.js , 定义 transaction 名称，之所以不集成到插件中，是因为场景不同可能需要进行修改
```js
'use strict';

function getPath(stack, path) {
  const layer = stack.find(i => i.regexp.test(path));
  const protoPath = layer && layer.path;
  return typeof protoPath === 'string'
    ? protoPath
    : 'unknown route';
}


module.exports = () => {
  return async (ctx, next) => {
    const path = getPath(ctx.app.router.stack, ctx.path);
    ctx.app.apm.setTransactionName(ctx.method + ' ' + path); // fix unknown router

    await next();

  };
};


```

添加 app.js 加载中间件
```js
'use strict';

module.exports = app => {
  // 中间件，修正apm transaction unknown router
  app.config.middleware.unshift('apmRouter');
};

```