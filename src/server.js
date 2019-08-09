const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://omni:stack@cluster0-cl6yy.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(express.json());
server.use(routes);

server.listen(2411)