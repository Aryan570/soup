const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const httpServer = http.createServer();
const { connectToDatabase } = require('./lib/mongodb');
// async function check(){
//   const {db} = await connectToDatabase();
// }
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Hello from server');
  async function ch() {
    const { db } = await connectToDatabase();
    const res = db.collection("readings").watch([], { fullDocument: 'updateLookup' });
    // console.log(res)
    res.on("change", (e) => {
      // Core of the project
      if (e.operationType === 'insert') {
        // console.log(e.fullDocument);
        // socket.emit('new_data', { current, voltage ,power ,Time});
        socket.emit('new_data', e.fullDocument);
        // console.log(fkk)
        // fkk.push({e.fullDocument.current,e.fullDocument.voltage});
      }
    })
  }
  ch();
})
httpServer.listen(3002);