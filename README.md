# 启动方法
1. 安装node以及yarn
2. 克隆仓库: git clone `https://github.com/zhuobinggang/maomao`
3. 解决依赖: cd maomao & yarn install
4. 解決sqlite數據庫依賴: 在項目根目錄執行`node scripts/initialise_maomaodb.js`

## 开发环境
### 后端
`node index.js`

> 迁移声明: 为了提高服务器性能以及安全性，后续将改用index.rest.js作为后端入口，用REST API + jwt-token替代原有基于session cookie的API

### 前端
1. cd `front_end/maomao_react_frontend` &  `yarn install`
2. yarn start

> 迁移声明: 为了在安卓和IOS上获得更好的体验，后续将改用front_end/MaomaoNativeApp作为前端入口，使用React Native + Redux替代掉原有基于React + Ant Design Mobile组件库的前端技术栈

## 生产环境
1. 打包: cd `front_end/maomao_react_frontend`, `yarn build --nomaps`
2. 删除旧版本static: `rm ../../static -rf`
3. 移动build文件夹: `mv build ../../static`
3. 启动后端: `cd ../..` && `node index.js`

## Google邮箱服务(在用户下单时发邮件通知自己)
1. 复制模板文件 `cp mail.config.js.template.js mail.config.js` 
2. 将`mail.config.js`内的用户名和密码替换成你自己的google账号

## 启动时可能会遇到的问题
1. 防火墙开放问题，查询`centos8 open port`
2. 啓動knex自動打印SQL模式: `DEBUG=knex:query node test/test_sqlite3.js`

## 一些BUG
1. SQLite的插入語句語法錯誤: order是保留語句，所以必須加上反引號

## 测试相关
测试库是jest, 测试报告请看coverage文件夹