import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vegetables')
      .then(response => setVegetables(response.data))
      .catch(error => console.error('您的获取数据失败:', error));
  }, []);

  // 点击获取某张表的字段结构
  const fetchColumns = (tableName) => {
    setSelectedTable(tableName);
    axios.get(`http://localhost:5000/api/table/${tableName}/columns`)
      .then(res => setColumns(res.data))
      .catch(err => console.error('获取字段失败', err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 数据库表结构查看</h1>

      <h2>📋 表列表：</h2>
      <ul>
        {tables.map(table => (
          <li key={table}>
            <button onClick={() => fetchColumns(table)}>
              {table}
            </button>
          </li>
        ))}
      </ul>

      {selectedTable && (
        <div>
          <h2>📑 表「{selectedTable}」字段结构：</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>字段名</th>
                <th>类型</th>
                <th>是否可空</th>
                <th>键</th>
                <th>默认值</th>
                <th>额外信息</th>
              </tr>
            </thead>
            <tbody>
              {columns.map(col => (
                <tr key={col.Field}>
                  <td>{col.Field}</td>
                  <td>{col.Type}</td>
                  <td>{col.Null}</td>
                  <td>{col.Key}</td>
                  <td>{col.Default}</td>
                  <td>{col.Extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
