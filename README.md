# StudentHub

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