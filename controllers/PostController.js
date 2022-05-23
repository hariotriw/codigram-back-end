const {Post, User, Comment, Like} = require('../models')
const { Op } = require("sequelize");
const { strGenerator} = require('../helpers/strRandom')
const jwt = require('../helpers/jwtHelpers')

class PostController {
    
    // --- fungsi untuk merender dan menampilkan semua data users ---
    static async index(req, res){
        try {
            
            let result = await Post.findAll({
                include: [{
                        model: User,
                        foreignKey: 'uuid',
                        attributes: { exclude: ['id', 'email', 'password', 'status', 'createdAt', 'updatedAt'] }
                    },{
                        model: Comment,
                        foreignKey: 'strId'
                    },{
                        model: Like,
                        foreignKey: 'strId'
                    }]
            })

            res.json({posts:result})
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk merender dan menampilkan semua data posts dri users ---
    static async myPosts(req, res){
        try {
            // console.log('masuk ke post controller')
            const access_token = req.headers['access-token']
            // console.log(access_token)
            let verifyToken = jwt.tokenVerifier(access_token, 'secret')
            console.log(verifyToken)
            let uuid = verifyToken.uuid
            console.log(req.body)
            
            let result = await Post.findAll({
                where: {
                    UserId: uuid
                }
            })

            res.json({posts:result})
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk merender dan menampilkan semua data posts dri users ---
    static async explore(req, res){
        try {
            // console.log('masuk ke post controller')
            const access_token = req.headers['access-token']
            // console.log(access_token)
            let verifyToken = jwt.tokenVerifier(access_token, 'secret')
            console.log(verifyToken)
            let uuid = verifyToken.uuid
            console.log(req.body)
            
            // let result = await Post.findAll({
            //     where: {
            //         UserId: uuid
            //     }
            // })
            let result = await Post.findAll({
                where: {
                    UserId: {
                        [Op.notIn]: [uuid]
                    }
                }
            })

            res.json({posts:result})
        } catch (err) {
            res.json(err)
        }
    }
       
    // --- fungsi untuk mengelola form create di back-end ---
    static async store(req, res){
        try {
            console.log('masuk ke post controller')
            const access_token = req.headers['access-token']
            // console.log(access_token)
            let verifyToken = jwt.tokenVerifier(access_token, 'secret')
            console.log(verifyToken)
            let uuid = verifyToken.uuid
            console.log(req.body)
            let { image, caption} = req.body;
            let strId = strGenerator(10)
            console.log(strId)
            
            let post = await Post.create({
                strId, UserId:uuid, image, caption
            })
            console.log(post)

            res.json(post)
            // res.json('berhasil menambahkan user')
            // res.redirect('/users')
            
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk merender dan menampilkan sebuah data user ---
    static async show(req, res){
        try {
            let strId = req.params.strId
            console.log(strId);
            
            let post = await Post.findOne({
                where: {
                    strId
                },
                include: [{
                    model: User,
                    foreignKey: 'uuid',
                    attributes: { exclude: ['id', 'email', 'password', 'status', 'createdAt', 'updatedAt'] }
                },{
                    model: Comment,
                    foreignKey: 'strId'
                },{
                    model: Like,
                    foreignKey: 'strId'
                }]
            })
            // console.log(result)

            res.json(post)
            // res.json({post: result})
            // res.render('./user/show.ejs', {user: result})
            
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola form edit user di back-end ---
    static async edit(req, res){
        try {
            let strId = req.params.strId
            console.log(strId);
            
            let post = await Post.findOne({
                where: {
                    strId: strId
                }
               
            })
            // console.log(result)

            res.json(post)

            // res.redirect('/users')
            // res.json('berhasil mengubah user')
        } catch (err) {
            res.json(err)
        }
    }

    // --- fungsi untuk mengelola form edit user di back-end ---
    static async update(req, res){
        try {
            console.log(req.params.strId)
            console.log(req.body)
            let strId = req.params.strId
            let { caption } = req.body;

            let result = await Post.update({
                caption: caption
            }, {
                where: {
                    strId: strId
                }
            })

            // res.redirect('/users')
            res.json('berhasil mengubah user')
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola delete sebuah user di back-end ---
    static async destroy(req, res){
        try {
            console.log('masuk controller')
            console.log(req.body)
            const { UserId, strId} = req.body
            // let id = req.params.id

            let result = await Post.destroy({
                where: {
                    UserId: UserId, strId: strId
                }
            })

            // res.redirect('/users')
            res.json('berhasil menghapus user')
            
        } catch (err) {
            res.json(err)
        }
    }

    // fungsi like post
    // static async likePost(req, res){
    //     try {
    //         let PostId = req.params.PostId
    //         // let PostId = "VtvNPWljxo"
    //         let { UserId, likeFlag} = req.body;
    //         let strId = strGenerator(10)
    //         // if(+likeFlag === 0){
    //         //     likeFlag = 1
    //         // } else {
    //         //     likeFlag = 0
    //         // }
    //         // console.log(likeFlag)
    //         // let newLikeFlag = !likeFlag
    //         // console.log(newLikeFlag)
            
    //         let foundLiked = await Like.findOne({
    //             where: {
    //                 UserId, PostId
    //             }
    //         })

    //         if(foundLiked){
    //             console.log('liked found')
    //             foundLiked.likeFlag = !foundLiked.likeFlag
    //             let user = await Like.update({
    //                  likeFlag: +foundLiked.likeFlag
    //             }, {
    //             where: {
    //                 UserId, PostId
    //                 }
    //             })
    //             1 === +foundLiked.likeFlag ? res.status(201).json({message: 'liked succesfully!!'}) : res.status(201).json({message: 'unliked succesfully!!'}) 
    //             // res.status(201).json({message: 'liked succesfully!!'}) 
    //         } else {
    //             console.log('liked not found')
    //             // let user = await Like.create({
    //             //     strId, UserId, PostId, likeFlag
    //             // })
    //             // console.log('Create new like')
    //             let foundUser = await User.findOne({
    //                 where: {
    //                     uuid: UserId
    //                 }
    //             })
    //             let foundPost = await Post.findOne({
    //                 where: {
    //                     strId: PostId
    //                 }
    //             })
    //             // foundUser && foundPost ? await Like.create({
    //             //     strId, UserId, PostId, likeFlag
    //             // }) : 
    //             //     !foundUser && foundPost ? res.status(404).json({message: 'invalid user'}) :
    //             //         foundUser && !foundPost ? res.status(404).json({message: 'invalid post'}) : res.status(404).json({message: 'invalid action'})
    //             if(foundUser && foundPost) {
    //                 let likeFlag = +1
    //                 await Like.create({
    //                     strId, UserId, PostId, likeFlag
    //                 })
    //                 res.status(201).json({message: 'Liked succesfully!'})

    //             } else if(!foundUser && foundPost) {
    //                 res.status(404).json({message: 'invalid user'})

    //             } else if (foundUser && !foundPost) {
    //                 res.status(404).json({message: 'invalid post'})

    //             } else {
    //                 res.status(404).json({message: 'invalid action'})
    //             }
               
    //         }

            

    //         // res.json(foundLiked)
    //         // res.json(likee)
    //         // res.json('berhasil menambahkan like')
            
    //     } catch (err) {
    //         res.json(err)
    //     }
    // }

    // count likes
    // --- fungsi untuk merender dan menampilkan semua data users ---
    // static async countLike(req, res){
    //     try {
    //         // user id dari access token
    //         let UserId = "2c7cb6df-9867-4ecd-aaa6-ba105c155282"
    //         let PostId = req.params.PostId

    //         // let result = await Like.findAll({
    //         //     include: [{
    //         //         model: User,
    //         //         foreignKey: 'uuid'
    //         //     }],
    //         //     order: [
    //         //         ['id', 'asc']
    //         //     ]
    //         // })

    //         let result = await Like.findAll({
    //             include: [{
    //                 model: User,
    //                 foreignKey: 'uuid',
    //                 attributes: { exclude: ['id', 'email', 'password', 'status', 'createdAt', 'updatedAt'] }
    //             }],
    //             attributes: { exclude: ['id', 'strId', 'createdAt', 'updatedAt'] }
                
    //         })

    //         res.json({
    //             count: result.length,
    //             usersLiking: result
    //         })
    //         // res.render('./user/index.ejs', {users:result})
    //     } catch (err) {
    //         res.json(err)
    //     }
    // }
}

module.exports = PostController;