// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// 连接 MySQL 数据库
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // 如果设置过密码就填
  database: 'planting_guide', // 改成你的数据库名
  port: 3306
});

// 测试连接
db.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('成功连接 MySQL 数据库');
  }
});

// API: 获取蔬菜数据
app.get('/api/vegetables', (req, res) => {
  const query = 'SELECT * FROM 蔬菜数据库';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('查询失败');
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log('后端服务已启动: http://localhost:5000');
});
