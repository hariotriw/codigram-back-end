const {Router} = require('express')
const interactionRoutes = Router()
const {InteractionController} = require('../../controllers')
// const { authentication } = require('../../middlewares/auth')

interactionRoutes.post("/post/:PostId/like", InteractionController.likePost)
interactionRoutes.get("/post/:PostId/countLike", InteractionController.countLike)
interactionRoutes.get("/post/:PostId/comments", InteractionController.commentFetch)
interactionRoutes.post("/post/:PostId/comment/post", InteractionController.commentPost)
interactionRoutes.post("/post/:PostId/comment/delete", InteractionController.commentdestroy)

module.exports = interactionRoutes;
