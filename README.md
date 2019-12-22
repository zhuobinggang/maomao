# 启动方法
1. 安装node以及yarn
2. 克隆仓库: git clone `https://github.com/zhuobinggang/maomao`
3. 解决依赖: cd maomao & yarn install
4. 解決sqlite數據庫依賴: 在項目根目錄執行`node scripts/initialise_maomaodb.js`

## 开发环境
### 后端
`node index.js`

### 前端
1. cd `front_end/maomao_react_frontend` &  `yarn install`
2. yarn start

## 生产环境
1. 打包: cd `front_end/maomao_react_frontend`, `yarn build --nomaps`
2. 删除旧版本static: `rm ../../static -rf`
3. 移动build文件夹: `mv build ../../static`
3. 启动后端: `cd ../..` && `node index.js`


## 启动时可能会遇到的问题
1. 防火墙开放问题，查询`centos8 open port`
2. 啓動knex自動打印SQL模式: `DEBUG=knex:query node test/test_sqlite3.js`