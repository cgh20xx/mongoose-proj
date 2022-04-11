const http = require('http');
const mongoose = require('mongoose');
const RoomModel = require('./model/room-model');
const db = 'hotel';

// 1. 連接資料庫
mongoose
  .connect(`mongodb://localhost:27017/${db}`)
  .then(() => {
    console.log('mongodb 連接成功');
  })
  .catch((error) => console.log(error));

// 4. 新增資料方法1：建立 RoomModel 實例並使用 save() 將資料寫入 mongodb
/* 
const roomDoc = new RoomModel({
  name: '豪華蜜月套房456',
  price: 7000,
  rating: 4.8,
});

roomDoc
  .save()
  .then(() => {
    console.log('新增資料成功');
  })
  .catch((err) => {
    console.log(err);
  });
*/

// 4. 新增資料方法2：使用 create()
RoomModel.create({
  name: '豪華蜜月套房 module',
  price: 7000,
  rating: 4.8,
})
  .then((data) => {
    console.log('create 資料成功', data);
  })
  .catch((err) => console.log(err));

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);
