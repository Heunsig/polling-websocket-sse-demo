import httpServer from "./httpServer.js";
import wsServer from "./wsServer.js";

httpServer.listen(3000, () => {
  console.log("Listening on port 3000");
});

wsServer.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
