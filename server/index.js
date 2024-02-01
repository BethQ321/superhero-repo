const { seed, client } = require("./db");
const express = require("express");
const app = express();
app.use(express.json({ limit: "200mb" }));
app.engine("html", require("ejs").renderFile);
const path = require("path");
const http = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(http);
app.use(
  cors({
    origin: "https://shield-shop.onrender.com",
  })
);
const users = {};

try {
  require("../env");
} catch (error) {
  console.log("if running locally make env.js file");
}

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

app.use(cors());
app.get("/", (req, res) =>
  res.render(path.join(__dirname, "../public/index.html"), {
    GITHUB_CLIENT: process.env.GITHUB_CLIENT,
  })
);

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));
const init = async () => {
  await client.connect();
  console.log("connected to database");
  if (process.env.SYNC) {
    await seed();
    console.log("Create your tables and seed data");
  }
  const port = process.env.PORT || 5501;
  http.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
};
init();
