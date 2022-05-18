const {Router} = require('express')
const authRoutes = Router()
const {AuthController} = require('../../controllers')

authRoutes.post("/register", AuthController.register)
authRoutes.post("/login", AuthController.login)
authRoutes.post("/logout", AuthController.logout)

module.exports = authRoutes;