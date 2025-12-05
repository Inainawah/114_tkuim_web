環境需求:

Node.js (v18+)
Docker Desktop
MongoDB Compass


啟動步驟：

步驟 1: 啟動 MongoDB 容器
cd Week11/docker
docker compose up -d
docker ps

步驟 2: 配置環境變數
PORT=3001
MONGODB_URI=mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11
ALLOWED_ORIGIN=http://localhost:5173

步驟 3: 啟動後端服務
cd ../server
npm install
npm run dev


測試方式:

# 連線到容器內的 mongosh
docker exec -it week11-mongo mongosh -u root -p password123 --authenticationDatabase admin

# 在 Shell 內執行以下指令：
use week11
db.participants.find().pretty()
db.participants.getIndexes()