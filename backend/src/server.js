const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initSocket } = require("./websocket/socket");

const server = http.createServer(app);

initSocket(server);
app.use(cors({
  origin: "*", // allow all (for now)
}));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});