import React, { useState, useEffect } from 'react';
import { Student } from '../interface/Student';
import { asyncPut } from '../utils/fetch'; // 引入 asyncPut 函數
import { api } from '../enum/api';
import Navigation_bar from './Navigation_bar';
import '../style/update.css'

export default function Update() {
  const [formState, setFormState] = useState({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    Email: '',
    absences: 0,
  });

  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 調用 asyncPut 函數發送 PUT 請求來更新資料庫中的學生記錄
    const response = await asyncPut(api.UpdateByUserName, formState); // 傳遞表單資料作為請求主體

    if (response.message === "update success") {
      alert('學生資料已成功更新');
      // 如果更新成功，您可以執行後續操作，比如重置表單或跳轉頁面
    } else {
      alert('更新學生資料失敗');
    }
  };

  return (
    <>
            <Navigation_bar />
    <form onSubmit={handleSubmit}>
        
      <h2>更新學生</h2>
      <input type="text" name="userName" value={formState.userName} onChange={handleInputChange} placeholder="帳號" required />
      <input type="text" name="sid" value={formState.sid} onChange={handleInputChange} placeholder="座號" required />
      <input type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="姓名" required />
      <input type="text" name="department" value={formState.department} onChange={handleInputChange} placeholder="院系" required />
      <input type="text" name="grade" value={formState.grade} onChange={handleInputChange} placeholder="年級" required />
      <input type="text" name="class" value={formState.class} onChange={handleInputChange} placeholder="班級" required />
      <input type="email" name="Email" value={formState.Email} onChange={handleInputChange} placeholder="Email" required />
      <input type="number" name="absences" value={formState.absences} onChange={handleInputChange} placeholder="缺席次數" />
      <button type="submit">提交</button>
      <button type="button" onClick={() => setFormState({
        userName: '',
        sid: '',
        name: '',
        department: '',
        grade: '',
        class: '',
        Email: '',
        absences: 0,
      })}>取消</button>
    </form>
    </>
  );
}
