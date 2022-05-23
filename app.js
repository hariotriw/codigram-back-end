const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const cors = require('cors')
const bodyParser = require("body-parser")
const multer = require('multer')
const path = require('path')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname, "public")))
app.use('/public/uploads/posts', express.static('./public/uploads/posts'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/posts')
      },
      filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(
            null, 
            Date.now() + path.parse(file.originalname).name + path.extname(file.originalname)
        )
      }
})
const upload = multer({storage})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const routes = require('./routes');
app.use(routes)

app.post("/api/upload", upload.single('image'), (req, res) => {
    console.log('masuk ke route')
    let finalImageURL = req.protocol + "://" + req.get("host") + "/public/uploads/posts/" + req.file.filename
    res.json({status: 200, image: finalImageURL})
})
app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})