const {Router} = require('express')
const apiRoutes = Router()
const {AuthController} = require('../../controllers')

apiRoutes.post("/register", AuthController.register)
apiRoutes.post("/login", AuthController.login)
apiRoutes.post("/logout", AuthController.logout)

module.exports = apiRoutes;