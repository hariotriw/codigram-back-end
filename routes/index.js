const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.json('Ini Route Home');
})

// Api Routes
const userRoutes = require('./api/user.js')
const postRoutes = require('./api/post.js')
const interactionRoutes = require('./api/interaction')
const authRoutes = require('./api/auth.js')
route.use('/api/users', userRoutes)
route.use('/api/posts', postRoutes)
route.use('/api/posts', interactionRoutes)
route.use('/api/', authRoutes)

module.exports = route;