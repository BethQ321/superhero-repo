const { seed, client } = require("./db");
const express = require("express");
const app = express();
app.use(express.json({limit: "200mb"}));
const path = require("path");


const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors'); // Import the cors module

const users = {}; // Initialize the users object
//socket stuff
//const io = require('socket.io')(5502)

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})




app.use(cors()); // Use cors middleware


app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api", require("./api"));

const init = async () => {
  await client.connect();
  console.log("connected to database");
 if(process.env.SYNC){
   console.log("create your tables and seed data");
  }
  await seed()


  const port = process.env.PORT || 5501;


  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};








init();
