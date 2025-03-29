const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dbConnect = require("./config/dbConnect.js");
require("dotenv").config();
const sessionMiddleware = require("./middleware/sessionMiddleware");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", // Allow frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
  );

app.use(sessionMiddleware);

// Attach session middleware to Socket.io
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Database Connection
dbConnect();

// Pass Socket.io instance to noteSockets
require("./sockets/noteSockets")(io);


const port = 5000
server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
