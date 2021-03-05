const egateRouter = require('express').Router()

egateRouter.post('/push', (req, res, next) => {
    res.json("egateRouter Push Working")
})

egateRouter.get('/pull', (req, res, next) => {
    res.json("egateRouter Pull Working")
})

module.exports = egateRouter;