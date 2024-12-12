# StudentHub專案

## 安裝與執行指引

### 1. 安裝Docker, MongoDB Compass

提供資料庫運行環境，載點：

[Docker desktop](https://www.docker.com/products/docker-desktop/)

[MongoDB Compass](https://www.mongodb.com/try/download/shell)

### 2. 使用Docker鏡像運行MongoDB

1. pull mongodb docker 映像檔  
    ```

    docker pull mongodb/mongodb-community-server:latest

    ```

2. 讓映像作為container運行  
    ```

    docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

    ```

3. 檢查是否正在運行
    ```

    docker container ls

    ```
    ### 3. 打開 MongoDB Compass，連接MongoDB

![image]()

### 4. 建立database，創建collection "studentslists"

請按照以下格式建立：

```

{


    userName: 'tkuee0787',

    sid: 1,

    name: '測試',

    department: '資訊管理系',

    grade: '四年級',

    class: 'A',

    Email: 'tkuee0787@tkuim.com',

    absences: 4

}

```

### 5. clone專案到本地

打開終端機運行：

```

cd (你想放專案的地方)

git clone https://github.com/peipeggy/StudentHub.git

```

### 6. 設定.env

開啟VScode並複製/backend/.env.example改成.env，並設定相關數值。

![image]()

  
### 7. 運行後端

>[!NOTE]
>若有需要可運行npm audit fix自動嘗試修復檢測到的安全問題

```

cd backend

npm i

# npm audit fix

npm run dev

```

### 8. 運行前端

>[!NOTE]
>若有需要可運行npm audit fix自動嘗試修復檢測到的安全問題

```

cd frontend

npm i

# npm audit fix

npm run dev

```