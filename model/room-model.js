const mongoose = require('mongoose');
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
      cast: false, // false 關閉自動轉型。如："100" => 100
    },
    rating: Number,
    // 若不使用內建 timestamps: true，也可自定 createAt 規則。
    createdAt: {
      type: Date,
      default: Date.now,
      select: false, // false 表不顯示此欄位。Model.find() 查不出來
    },
  },
  {
    versionKey: false,
    // collection: 'rooms', // 亦可直接寫死 collection 名字，不受預設小寫及結尾s影響。
    // timestamps: true, // mongoose 會自動新增 createdAt 和 updatedAt 欄位。
  }
);

// 3. 建立 room model
const RoomModel = mongoose.model('Room', roomSchema);
/* 
  注意：
  mongoose 會將 'Room' 轉換為 mongodb collection 的 'rooms'。
  所有字母強制小寫。
  結尾強制加 s ，若結尾已有 s 則不會加。
*/
module.exports = RoomModel;
