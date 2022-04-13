# mongoose-proj

[Mongoose 筆記](https://www.notion.so/Mongoose-7d6ba145429e4a8d94a03d82c3c884ec)

## 佈署到 heroku 流程
  - package.json 新增 scripts.start
  - package.json 新增 engines.node 版本
  - 建立新的主機 指令：heroku create
  - 在 heroku 後台設定 Config Vars (主機的環境變數)
  - $ git push heroku master
