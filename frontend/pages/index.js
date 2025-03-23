// frontend/pages/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vegetables')
      .then(response => setVegetables(response.data))
      .catch(error => console.error('获取数据失败:', error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>蔬菜推荐列表</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>编号</th>
            <th>蔬菜名称</th>
            <th>适宜气候</th>
            <th>光照需求</th>
            <th>生长周期 (天)</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map((veg) => (
            <tr key={veg.编号}>
              <td>{veg.编号}</td>
              <td>{veg.蔬菜名称}</td>
              <td>{veg.适宜气候}</td>
              <td>{veg.光照需求}</td>
              <td>{veg.生长周期天数}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
