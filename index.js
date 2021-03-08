const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const clavis = require('./clavis');
const egate = require('./egate');

const server = express()
server.use(cors())
server.use(bodyParser.json())

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database is connected!!');
});

server.get("/", (req, res, next) => {
    res.json({MESSAGE: "SERVER TEST SUCCESS"})
})

server.use(egate);
server.use(clavis);

server.listen(5000, () => console.log("Server is running at port 5000"))