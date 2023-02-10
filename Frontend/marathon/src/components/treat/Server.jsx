import Server from "socket.io";
const io = new Server().attach("treat");

io.on("connection", (socket) => {
  socket.on("addItem", (data) => {
    console.log(data);
    socket.broadcast.emit("addItem", data);
  });
});
