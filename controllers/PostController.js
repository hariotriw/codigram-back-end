const {Post, User, Comment, Like} = require('../models')
const { strGenerator} = require('../helpers/strRandom')

class PostController {
    
    // --- fungsi untuk merender dan menampilkan semua data users ---
    static async index(req, res){
        try {
            let result = await Post.findAll({
                order: [
                    ['id', 'asc']
                ]
            })

            res.json({posts:result})
            // res.render('./user/index.ejs', {users:result})
        } catch (err) {
            res.json(err)
        }
    }
       
    // --- fungsi untuk mengelola form create di back-end ---
    static async store(req, res){
        try {
            let { UserId, image, caption} = req.body;
            let strId = strGenerator(10)

            let post = await Post.create({
                strId, UserId, image, caption
            })

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
            let id = req.params.uuid
            // let result = User.findOne({
            //     where: {
            //         id: id
            //     }
            // })
            let result = await User.findByPk(id);
            // console.log(result)

            res.json({user: result})
            // res.render('./user/show.ejs', {user: result})
            
        } catch (err) {
            res.json(err)
        }
    }
    
    // --- fungsi untuk mengelola form edit user di back-end ---
    static async update(req, res){
        try {
            let { uuid, username, email, password, fullname, avatar, status} = req.body;

            let result = await User.update({
                fullname: fullname,
                id_card: id_card,
                type_card: type_card
            }, {
                where: {
                    id: +id
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
            let id = req.params.id

            let result = await User.destroy({
                where: {
                    id: id
                }
            })

            // res.redirect('/users')
            res.json('berhasil menghapus user')
            
        } catch (err) {
            res.json(err)
        }
    }

    // fungsi like post
    static async likePost(req, res){
        try {
            let PostId = req.params.PostId
            // let PostId = "VtvNPWljxo"
            let { UserId, likeFlag} = req.body;
            let strId = strGenerator(10)
            // if(+likeFlag === 0){
            //     likeFlag = 1
            // } else {
            //     likeFlag = 0
            // }
            // console.log(likeFlag)
            // let newLikeFlag = !likeFlag
            // console.log(newLikeFlag)
            
            let foundLiked = await Like.findOne({
                where: {
                    UserId, PostId
                }
            })

            if(foundLiked){
                console.log('liked found')
                foundLiked.likeFlag = !foundLiked.likeFlag
                let user = await Like.update({
                     likeFlag: +foundLiked.likeFlag
                }, {
                where: {
                    UserId, PostId
                    }
                })
                1 === +foundLiked.likeFlag ? res.status(201).json({message: 'liked succesfully!!'}) : res.status(201).json({message: 'unliked succesfully!!'}) 
                // res.status(201).json({message: 'liked succesfully!!'}) 
            } else {
                console.log('liked not found')
                // let user = await Like.create({
                //     strId, UserId, PostId, likeFlag
                // })
                // console.log('Create new like')
                let foundUser = await User.findOne({
                    where: {
                        uuid: UserId
                    }
                })
                let foundPost = await Post.findOne({
                    where: {
                        strId: PostId
                    }
                })
                // foundUser && foundPost ? await Like.create({
                //     strId, UserId, PostId, likeFlag
                // }) : 
                //     !foundUser && foundPost ? res.status(404).json({message: 'invalid user'}) :
                //         foundUser && !foundPost ? res.status(404).json({message: 'invalid post'}) : res.status(404).json({message: 'invalid action'})
                if(foundUser && foundPost) {
                    let likeFlag = +1
                    await Like.create({
                        strId, UserId, PostId, likeFlag
                    })
                    res.status(201).json({message: 'Liked succesfully!'})
                } else if(!foundUser && foundPost) {
                    res.status(404).json({message: 'invalid user'})
                } else if (foundUser && !foundPost) {
                    res.status(404).json({message: 'invalid post'})
                } else {
                    res.status(404).json({message: 'invalid action'})
                }
               
            }

            

            // res.json(foundLiked)
            // res.json(likee)
            // res.json('berhasil menambahkan like')
            
        } catch (err) {
            res.json(err)
        }
    }

    // count likes
    // --- fungsi untuk merender dan menampilkan semua data users ---
    static async countLike(req, res){
        try {
            // user id dari access token
            let UserId = "2c7cb6df-9867-4ecd-aaa6-ba105c155282"
            let PostId = req.params.PostId
            // let result = await Like.findAll({
            //     include: [{
            //         model: User,
            //         foreignKey: 'uuid'
            //     }],
            //     order: [
            //         ['id', 'asc']
            //     ]
            // })

            let result = await Like.findAll({
                include: [{
                    model: User,
                    foreignKey: 'uuid',
                    attributes: { exclude: ['id', 'email', 'password', 'status', 'createdAt', 'updatedAt'] }
                }],
                attributes: { exclude: ['id', 'strId', 'createdAt', 'updatedAt'] }
                
            })

            res.json({
                count: result.length,
                usersLiking: result
            })
            // res.render('./user/index.ejs', {users:result})
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = PostController;