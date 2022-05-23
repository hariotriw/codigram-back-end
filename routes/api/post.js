const {Router} = require('express')
const postRoutes = Router()
const {PostController} = require('../../controllers')
// const { authentication } = require('../../middlewares/auth')
// const bodyParser = require("body-parser")
// const multer = require('multer')
// const path = require('path')

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname, "public")))

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads')
//       },
//       filename: function (req, file, cb) {
//         // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(
//             null, 
//             path.parse(file.originalname).name + Date.now() + path.extname(file.originalname)
//         )
//       }
// })
// const upload = multer({storage})

postRoutes.get("/", PostController.index)
postRoutes.post("/create", PostController.store)
postRoutes.get("/post/:strId", PostController.show)
postRoutes.post("/update", PostController.update)
postRoutes.get("/delete/:id", PostController.destroy)

// postRoutes.post("/upload", upload.single('photo'), (req, res) => {
//     let finalImageURL = req.protocol + "://" + req.get("host" + "/uploads") + req.file.filename
//     res.json({status: 200, image: finalImageURL})
// })

// postRoutes.post("/post/:PostId/like", PostController.likePost)
// postRoutes.get("/post/:PostId/countLike", PostController.countLike)

// articleRoutes.get("/", authentication, ArticleController.index)
// articleRoutes.post("/create", authentication, ArticleController.store)
// articleRoutes.get("/show/:id", authentication, ArticleController.show)
// articleRoutes.post("/update", authentication, ArticleController.update)
// articleRoutes.get("/delete/:id", authentication, ArticleController.destroy)

module.exports = postRoutes;
