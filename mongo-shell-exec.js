// MongoDB 基本操作： 新增、查詢

// 1. 依以下格式新增一筆 document 到 students collection
db.students.insertOne({
  studentName: 'Riley Parker',
  group: 'A',
  score: 83,
  isPaid: false,
});

// 2. 依以下格式一次新增多筆 document 到 students collection
db.students.insertMany([
  {
    studentName: 'Brennan Miles',
    group: 'C',
    score: 72,
    isPaid: false,
  },
  {
    studentName: 'Mia Diaz',
    group: 'B',
    score: 98,
    isPaid: true,
  },
  {
    studentName: 'Caroline morris',
    group: 'B',
    score: 55,
    isPaid: false,
  },
  {
    studentName: 'Beverly Stewart',
    group: 'B',
    score: 60,
    isPaid: false,
  },
]);

// 3. 查詢 students collection 中的所有資料
db.students.find();

// 4. 查詢 students collection 中符合 group 屬性為 B 的資料 使用 { <field>: <value> } 設定符合的項目
db.students.find({
  group: 'B',
});

// 5. 查詢 students collection 中符合分數在 60 分以上的的資料
db.students.find({
  score: {
    $gte: 60,
  },
});

// 6. 查詢 students collection 中符合分數在 60 分以下或是 group 為 B 的資料
db.students.find({
  $or: [
    {
      score: {
        $lte: 60,
      },
    },
    {
      group: 'B',
    },
  ],
});

// MongoDB 基本操作： 修改、刪除

// 1. 指定其中一個 _id ，並將該筆 document 的 group 改為 D
db.students.updateOne(
  { _id: ObjectId('6254ea97c7b8f2ebe6ee9894') },
  {
    $set: {
      group: 'D',
    },
  }
);

// 2. 將 group 為 B 的多筆 document 的 isPaid 改為 true
db.students.updateMany(
  {
    group: /B/,
  },
  {
    $set: {
      isPaid: true,
    },
  }
);

// 3. 將 studentName 包含關鍵字 Brennan 的 document 刪除
db.students.deleteOne({
  studentName: /Brennan/,
});

// 4.將 isPaid 為 true 的多筆 document 刪除
db.students.deleteMany({
  isPaid: true,
});
