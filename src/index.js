const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { notFound } = require('./middlewares')
const { errorHandler } = require('./middlewares')
const logs = require('./api/logs')

require('dotenv').config()


const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('mongodb connected...'))
  .catch((e) => console.log(e))



//middleware
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

//body parsing middleware
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello and we are here')
})

app.use('/api/logs', logs)

app.use(notFound)

/* eslint-disable-next-line no-unused-vars*/

app.use(errorHandler)



const port = process.env.PORT || 1337
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
