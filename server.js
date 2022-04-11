const http = require('http');
const mongoose = require('mongoose');
const db = 'hotel';

// 1. 連接資料庫
mongoose
  .connect(`mongodb://localhost:27017/${db}`)
  .then(() => {
    console.log('mongodb 連接成功');
  })
  .catch((error) => console.log(error));

// 2. 建立 room schema (簡易版)
/* 
const roomSchema = {
  name: String,
  price: {
    type: Number,
    required: [true, '價格必填'],
  },
  rating: Number,
};
*/

// 2. 建立 room schema (完整版)
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, '價格必填'],
    },
    rating: Number,
  },
  {
    versionKey: false,
    // collection: 'rooms' // 亦可直接寫死 collection 名字，不受預設小寫及結尾s影響。
  }
);

// 3. 建立 room model
const Room = mongoose.model('Room', roomSchema);
/* 
  注意：
  mongoose 會將 'Room' 轉換為 mongodb collection 的 'rooms'。
  所有字母強制小寫。
  結尾強制加 s ，若結尾已有 s 則不會加。
*/

// 4. 建立 room instance
const roomDoc = new Room({
  name: '豪華蜜月套房+',
  price: 7000,
  rating: 4.8,
});

// 5. 使用 .save() 將資料寫入 mongodb
roomDoc
  .save()
  .then(() => {
    console.log('新增資料成功');
  })
  .catch((err) => {
    console.log(err);
  });

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);
