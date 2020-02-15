const {
    Router
} = require('express')
const LogEntry = require('../models/logEntry')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const entries = await LogEntry.find()
        console.log(entries)
        res.json(entries)

    } catch (error) {
        next(error)
    }


})

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body)
        const createdEntry = await logEntry.save()
        res.json(createdEntry)
    } catch (error) {
        console.log(error.name)

        if (error.name === 'ValidationError') {
            res.status(422)
        }
        next(error)
    }
    console.log(req.body)

})

module.exports = router