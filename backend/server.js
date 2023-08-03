require("dotenv").config();

const express = require("express"); // importing express
const app = express(); // calling express
const cors = require("cors"); //
const DbConnect = require("./database");

const cookieParser = require("cookie-parser");
const router = require("./routes");
const ACTIONS = require("./actions");
const { ChannelListInstance } = require("twilio/lib/rest/chat/v3/channel");

// creating an HTTP server using the http module in Node.js and assigning it to the server variable. The created server can handle incoming HTTP requests and route them to the appropriate handlers defined in the provided app instance.

const server = require("http").createServer(app);

app.use(cookieParser());
// app.use(cookieParser()) is a middleware function used in Express.js applications to parse cookies from incoming HTTP requests. It allows you to access and manipulate cookies in your routes and middleware functions.
// cors options
const corsOptions = {
  credentials: true,
  origin: [process.env.FRONT_URL],
};

// applying cors
app.use(cors(corsOptions));

// Any files located in the "storage" directory can be accessed from the client-side using URLs starting with "/storage". For example, if there is a file named "image.jpg" inside the "storage" directory, it can be accessed using the URL "/storage/image.jpg".

// This approach is commonly used to serve files like images, CSS stylesheets, JavaScript files, or any other static assets required by the client-side of a web application. It simplifies the process of serving such files and allows the server to handle the file serving efficiently without the need for custom route handlers.

app.use("/storage", express.static("storage"));

const PORT = process.env.PORT || 5500;

DbConnect();
app.use(express.json({ limit: "8mb" })); // Add the JSON body parsing middleware

app.use(router); //Registering it with Express app.

app.get("/", (req, res) => {
  res.send("Hello from express JS");
});

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_URL, // allowing the local frontend server
    methods: ["GET", "POST"],
  },
});

// using websocket server SOCKETS

// For keep track of what socket id is associated with which user

const socketUserMap = {};

io.on("connection", socket => {
  console.log("new connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = user;

    //  retrieving the list of connected clients in the specified `roomId` using `io.sockets.adapter.rooms.get(roomId)`. If the room exists, it returns an array of clients, and if the room doesn't exist, it returns an empty array. The `Array.from` function is used to convert the returned value to an actual array.

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    // Getting all the clients

    clients.forEach(clientId => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      // emitting event for own
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });

    // joining the room
    socket.join(roomId);
    // console.log(clients);
  });

  // Handle relay ice

  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // using relay  ->  to send from client to server
  // using DESCRIPTION -> to send from server to client

  // Handle relay SDP (SESSION DESCRIPTION)

  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  // ~  defining event listeners for the ACTIONS.MUTE and ACTIONS.UNMUTE events on a Socket.IO server. They handle muting and un-muting actions received from clients in a specific room and propagate the corresponding actions to all other clients in the same room.

  //& setting up an event listener for the ACTIONS.MUTE and ACTIONS.UNMUTE event. When this event is received, it executes a callback function with the provided payload { roomId, userId }.

  // then retrieving the list of clients (clientId) in the roomId room using io.sockets.adapter.rooms.get(roomId). If the room doesn't exist or is empty, it falls back to an empty array.

  //and iterating over each clientId and emitting the ACTIONS.MUTE event to each client in the room using io.to(clientId).emit(). The event payload contains the peerId (socket ID of the emitting client) and the userId of the user who initiated the mute action.

  socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach(clientId => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  //& setting up an event listener for the ACTIONS.UNMUTE event. When this event is received, it executes a callback function with the provided payload { roomId, userId }.

  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach(clientId => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  //& setting up an event listener for the ACTIONS.CODE_CHANGE event. When this event is received, it executes a callback function with the provided payload { roomId, userId, message }.

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    // console.log("Receiving", code);

    // io.to(roomId).emit(ACTIONS.CODE_CHANGE, {
    //   code,
    // });

    // doing the same thing as above but with socket.in the same room as the client we received from the code from and emitting the code to all the clients in the room except the client we received the code from (socket.id) using socket.in(roomId).emit() instead of io.to(roomId).emit(). This is because we don't want to send the code back to the client who sent it in the first place. This is a common pattern in Socket.IO to send events to all clients in a room except the sender.This is equivalent to the following code: socket.broadcast.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });

    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
      code,
    });
  });
  socket.on(ACTIONS.SYNC_CODE, ({ peerId, code }) => {
    io.to(peerId).emit(ACTIONS.CODE_CHANGE, {
      code,
    });
  });
  // Leaving the room

  const leaveRoom = ({ roomId }) => {
    // getting all the rooms in the socket

    const { rooms } = socket; // room map
    Array.from(rooms).forEach(roomId => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

      clients.forEach(clientId => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMap[clientId]?.id,
        });
      });

      // leaving the room ie removing connections from the socket
      socket.leave(roomId);
    });

    // deleting from = socketUserMap
    delete socketUserMap[socket.id];
  };
  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);

  // socket.on("disconnecting", leaveRoom) registers an event listener for the "disconnecting" event on the socket object. When the socket is in the process of disconnecting from the server, the leaveRoom function is invoked. This allows for executing necessary actions, such as cleaning up resources or notifying other users about the disconnection, when a socket is about to disconnect.
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
