const clavisRouter = require('express').Router()

clavisRouter.post('/push', (req, res, next) => {
    res.json("clavisRouter Push Working")
})

clavisRouter.get('/pull', (req, res, next) => {
    res.json("clavisRouter Pull Working")
})

module.exports = clavisRouter;