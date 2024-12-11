import React, { useState } from 'react';
import { Student } from '../interface/Student';
import { asyncPost } from '../utils/fetch'; // 引入 asyncPost 函数
import { api } from '../enum/api';
import Navigation_bar from './Navigation_bar';
import '../style/insert.css'

export default function Insert() {
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

  // 处理输入框变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // 提交表单，將表单数据发送到后端
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 使用 asyncPost 发起 POST 请求到后端 API
    const response = await asyncPost(api.insertOne, formState); // 发送 POST 请求，传递表单数据到后端

    if (response.code === 200) { // 假设后端返回成功的状态
      alert('學生資料已成功新增');
    } else {
      alert('新增學生失敗');
    }

    // 重设表单状态
    setFormState({
      userName: '',
      sid: '',
      name: '',
      department: '',
      grade: '',
      class: '',
      Email: '',
      absences: 0,
    });
  };

  // 取消操作，重置表单
  const handleCancel = () => {
    setFormState({
      userName: '',
      sid: '',
      name: '',
      department: '',
      grade: '',
      class: '',
      Email: '',
      absences: 0,
    });
  };

  return (
    <>
    <Navigation_bar />
    <form onSubmit={handleSubmit}>
      <h2>新增學生</h2>
      <input
        type="text"
        name="userName"
        value={formState.userName}
        onChange={handleInputChange}
        placeholder="帳號"
        required
      />
      <input
        type="text"
        name="sid"
        value={formState.sid}
        onChange={handleInputChange}
        placeholder="座號"
        required
      />
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
        placeholder="姓名"
        required
      />
      <input
        type="text"
        name="department"
        value={formState.department}
        onChange={handleInputChange}
        placeholder="院系"
        required
      />
      <input
        type="text"
        name="grade"
        value={formState.grade}
        onChange={handleInputChange}
        placeholder="年級"
        required
      />
      <input
        type="text"
        name="class"
        value={formState.class}
        onChange={handleInputChange}
        placeholder="班級"
        required
      />
      <input
        type="email"
        name="Email"
        value={formState.Email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="number"
        name="absences"
        value={formState.absences}
        onChange={handleInputChange}
        placeholder="缺席次數"
      />
      <button type="submit">提交</button>
      <button type="button" onClick={handleCancel}>取消</button>
    </form>
    </>
  );
}
