const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const auth = require('../middleware/auth');

const messageroute = express.Router();

messageroute.post("/send/:id",auth,sendMessage)
messageroute.get("/receiver/:id",auth,getMessage)


module.exports = messageroute;