[![npm](https://img.shields.io/npm/dt/egg-apm-agent.svg)](https://github.com/ddzyan/egg-apm-agent)


## 简介
使用 elastic-apm-node 封装 egg 插件，完成对请求路由链路日志的上传elk+apm平台，分析链路中逻辑消耗的时间

参考文档：
1. http://claude-ray.com/2019/07/12/elastic-apm-node-egg/
2. https://code.yeezon.com/zen/egg-apm
3. http://www.zmscode.cn/2020/07/09/docker-compose%E9%83%A8%E7%BD%B2eak/

### 完成功能
1. 应用路由链路上传
2. 应用错误对象上传


### 使用

#### 配置

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

修改 package.json ,在egg之前加载apm-agent模块
```json
{
  "scripts":{
    "debug": "egg-bin debug --require=egg-apm-agent/apm-register.js",
  }
}
```

添加启动脚本
start.sh，请注意修改脚本中的配置信息
```sh
# !/bin/sh
export ELASTIC_APM_SERVICE_NAME=egg-elk-apm # 服务名称

export ELASTIC_APM_SERVER_URL='http://127.0.0.1:8200' # apm-server 地址

export ELASTIC_APM_ENVIRONMENT='development' # 启动环境

export ELASTIC_APM_ACTIVE=true #建议只在生产环境开启apm-agent

export ELASTIC_APM_CENTRAL_CONFIG=false #在单点部署的时候，不需要开启轮询获取最新的apm-server配置

export ELASTIC_APM_CAPTURE_BODY="all"

echo service start...

npm run debug

echo service end!!
```

#### 以下不是必须

可以通过添加 /app/middleware/apmRouter.js 中间件 , 自定义 transaction 名称，之所以不集成到插件中，是因为场景不同可能需要进行修改
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

#### 启动
```shell
yarn add egg-apm-agent

# 默认 debug 模式
sh ./start.sh
```