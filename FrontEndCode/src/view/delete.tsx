import React, { useState } from 'react';
import { asyncDelete } from '../utils/fetch'; // 引入 asyncDelete 函数
import { api } from '../enum/api';
import Navigation_bar from './Navigation_bar';
import '../style/delete.css'

export default function Delete() {
  const [studentId, setStudentId] = useState<string>(''); // 使用 useState 儲存 studentId

  // 更新 studentId 狀態
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  // 刪除操作
  const handleDelete = async () => {
    if (window.confirm('確認要刪除此學生嗎？')) {
      // 調用 asyncDelete 函數，刪除後端資料庫中的記錄
      const response = await asyncDelete(api.deleteBySId, { "sid" : studentId }); // 傳遞 studentId 刪除數據

      if (response.message === "success") { // 假設後端返回成功的狀態
        alert('學生資料已成功刪除');
        setStudentId(''); // 清空输入框
      } else {
        alert('刪除學生失敗');
      }
    }
  };

  return (
    <>
            <Navigation_bar />
    <div>
      <h2>刪除學生</h2>
      <input 
        type="text" 
        value={studentId} 
        onChange={handleInputChange} 
        placeholder="輸入學生sID" 
        required 
      />
      <button onClick={handleDelete}>刪除</button>
    </div>
    </>
  );
}
