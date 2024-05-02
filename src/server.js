const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const httpServer = http.createServer();
const { connectToDatabase } = require('./lib/mongodb');
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
let collec = "bulb";
io.on('connection', (socket) => {
  console.log('Hello from server');
  socket.on("collec_name",(name)=>{
    console.log("listening for collection - ",name);
    collec = name;
    // if (name.toLowerCase() == "bulb"){
    //   console.log("Im here");
    //   collec = "readings";
    // }
    // ch();
  })
  async function ch() {
    const { db } = await connectToDatabase();
    const res = db.collection(collec).watch([], { fullDocument: 'updateLookup' });
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