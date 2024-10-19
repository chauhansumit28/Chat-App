const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require('dotenv/config');
const { app, server } = require("./socket/socket.js"); // Importing app and server

const PORT = 7000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.static("files"));
app.use("/", express.static("public"));
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Define routes
const userRouter = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");
app.use("/api/user", userRouter);
app.use("/api/message", messageRoute);

// Connect to MongoDB
const DB = "mongodb://mongoadmin:mongoadmin@localhost:27017/chat-app?authSource=admin";
mongoose.connect(DB)
    .then(() => {
        console.log('DB connection successful');
        server.listen(PORT, () => {
            console.log(`Express Server listening on ${PORT}`);
        });
    })
    .catch(err => console.error(err));

// Default route
app.get("/welcome", async (req, res) => {
    res.json({
        message: "Welcome mtt",
        status: 200,
    });
});

module.exports = app;
