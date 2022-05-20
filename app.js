const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const routes = require('./routes')
app.use(routes)
app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})