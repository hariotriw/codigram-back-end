const {Router} = require('express')
const postRoutes = Router()
const {PostController} = require('../../controllers')
// const { authentication } = require('../../middlewares/auth')

postRoutes.get("/", PostController.index)
postRoutes.get("/my-posts", PostController.myPosts)
postRoutes.get("/explore", PostController.explore)
postRoutes.post("/create", PostController.store)
postRoutes.get("/post/:strId", PostController.show)
postRoutes.get("/edit/:strId", PostController.edit)
postRoutes.post("/update/:strId", PostController.update)
postRoutes.post("/delete/:strId", PostController.destroy)

// postRoutes.post("/post/:PostId/like", PostController.likePost)
// postRoutes.get("/post/:PostId/countLike", PostController.countLike)

// articleRoutes.get("/", authentication, ArticleController.index)
// articleRoutes.post("/create", authentication, ArticleController.store)
// articleRoutes.get("/show/:id", authentication, ArticleController.show)
// articleRoutes.post("/update", authentication, ArticleController.update)
// articleRoutes.get("/delete/:id", authentication, ArticleController.destroy)

module.exports = postRoutes;
