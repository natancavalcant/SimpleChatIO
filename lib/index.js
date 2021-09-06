const express = require("express");
const path = require("path");

const app = express()
//const user = require("./models/user_model")
const http = require("http").Server(app);
const io = require("socket.io")(http);



app.use(express.static(path.join(__dirname, "view")));
app.set("views", path.join(__dirname, "view"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render(__dirname + "/view/index.html");
})

var messages = [];

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("sendMessage", value => {
    messages.push(value);
    socket.broadcast.emit("receivedMessage", value)
  })

  socket.emit("oldMessages", messages)

})

http.listen(3000);
