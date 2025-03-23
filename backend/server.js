// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // 允许跨域请求

// 数据库连接配置（适配你的 XAMPP）
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // 如果你在 phpMyAdmin 设置了密码，请填入
  database: 'planting_guide', // 你的数据库名
  port: 3306
});

// 测试数据库连接
db.connect((err) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err);
  } else {
    console.log('✅ 成功连接到 MySQL 数据库');
  }
});

// 获取所有表名
app.get('/api/tables', (req, res) => {
  const query = `SHOW TABLES`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: '获取表名失败', details: err.message });
    } else {
      // 动态获取字段名（防止是 Tables_in_xxx）
      const tableKey = Object.keys(results[0])[0];
      const tables = results.map(row => row[tableKey]);
      res.json(tables);
    }
  });
});

// 获取某个表的字段结构
app.get('/api/table/:tableName/columns', (req, res) => {
  const tableName = req.params.tableName;

  // 防止 SQL 注入，只允许字母数字中文表名
  const isValidName = /^[\u4e00-\u9fa5\w_]+$/.test(tableName);
  if (!isValidName) {
    return res.status(400).json({ error: '非法表名' });
  }

  const query = `SHOW COLUMNS FROM \`${tableName}\``; // 中文表名必须加反引号
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: '获取字段失败', details: err.message });
    } else {
      res.json(results);
    }
  });
});

// 启动后端服务
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 后端服务已启动: http://localhost:${PORT}`);
});
