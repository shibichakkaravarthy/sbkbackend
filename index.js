const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const clavis = require('./clavis')
const egate = require('./egate')

const server = express()
server.use(cors())
// server.use(bodyParser())

server.get("/", (req, res, next) => {
    res.json({MESSAGE: "SERVER TEST SUCCESS"})
})

server.use('/egate', egate)
server.use('/clavis', clavis)

server.listen(5000, () => console.log("Server is running at port 5000"))