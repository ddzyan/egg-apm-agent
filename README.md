## 简介
使用 elastic-apm-node 封装 egg 插件，完成对请求路由链路日志的上传elk+apm平台，分析链路中逻辑消耗的时间

### 完成功能
1. 应用路由链路上传
2. 应用错误对象上传

### 使用

```shell
yarn add egg-apm-agent
```

添加插件 config/plugin.js
```json
module.exports = {
 eggApmAgent: {
    enable: true,
    package: 'egg-apm-agent',
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

添加 /app/middleware/apmRouter.js , 定义 transaction 名称，可以在这里修改 transaction 显示逻辑
```js
'use strict';

module.exports = () => {
  return async (ctx, next) => {
    ctx.app.apm.setTransactionName(ctx.method + ' ' + ctx.request.body.query); // fix unknown router
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