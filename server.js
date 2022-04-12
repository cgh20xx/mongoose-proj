const http = require('http');
const mongoose = require('mongoose');
const RoomModel = require('./model/room-model');
const headers = require('./headers');
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

const requestListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  if (req.url === '/rooms' && req.method === 'GET') {
    // Model.find() 文件：https://mongoosejs.com/docs/api/model.html#model_Model.find
    const rooms = await RoomModel.find();
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        rooms,
      })
    );
    res.end();
  } else if (req.url === '/rooms' && req.method === 'POST') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        // 4. 新增資料方法2：使用 create()
        const newRoom = await RoomModel.create({
          name: data.name,
          price: data.price,
          rating: data.rating,
        });
        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: 'success',
            rooms: newRoom,
          })
        );
        res.end();
      } catch (err) {
        console.log(err);
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: 'error',
            message: '欄位沒有正確，或沒有此 ID',
            error: err,
          })
        );
        res.end();
      }
    });
  } else if ((req.url = '/rooms' && req.method == 'DELETE')) {
    await RoomModel.deleteMany({});
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        rooms: [],
      })
    );
    res.end();
  } else if (req.method == 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: 'false',
        message: '無此網站路由',
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3005);
