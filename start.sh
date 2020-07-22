# !/bin/sh
export  ELASTIC_APM_SERVICE_NAME=egg-elk-apm # 这是service名称

export  ELASTIC_APM_SERVER_URL='http://10.10.0.130:8200' # apm-server 地址

export  ELASTIC_APM_ENVIRONMENT='development' # 代码版本

echo start server...

node ./apm-register.js

echo start end.