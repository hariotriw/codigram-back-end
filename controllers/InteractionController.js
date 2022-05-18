const {Post, User, Comment, Like} = require('../models')
const { strGenerator} = require('../helpers/strRandom')

class InteractionController {

    // fungsi like post
    static async likePost(req, res){
        try {
            let PostId = req.params.PostId
            let { UserId, likeFlag} = req.body;
            let strId = strGenerator(10)
            
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
                // --- ternary ---
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
        } catch (err) {
            res.json(err)
        }
    }

    // fungsi like post
    static async commentPost(req, res){
        try {
            // user id dari access token
            let UserId = "2c7cb6df-9867-4ecd-aaa6-ba105c155282"
            let PostId = req.params.PostId
            let { comment} = req.body
            let strId = strGenerator(12)
            
            let foundPost = await Post.findOne({
                where: {
                    strId: PostId
                }
            })

            let foundUser = await User.findOne({
                where: {
                    uuid: UserId
                }
            })

            if(foundPost){
                console.log('post found')

                if(foundUser){
                    let result = await Comment.create({
                        strId, UserId, PostId, comment
                    })
                    console.log('berhasil menambahkan comment')
    
                    if(result){
                        res.status(201).json({message: 'comment added succesfully!!'}) 
                    } else {
                        res.status(403).json({message: 'failed to add comment'})
                    }
                } else {
                    res.status(404).json({message: 'User Invalid!'})
                }
            } else {
                res.status(404).json({message: 'Post not found!'})
            }   
        } catch (err) {
            res.json(err)
        }
    }

    // fungsi fetch comments from post
    static async commentFetch(req, res){
        
        try {
            // user id dari access token
            let UserId = "2c7cb6df-9867-4ecd-aaa6-ba105c155282"
            let PostId = req.params.PostId
            // let strId = strGenerator(10)
            
            let foundPost = await Post.findOne({
                where: {
                    strId: PostId
                }
            })
            console.log(foundPost)

            if(foundPost){
                console.log('post found')

                let result = await Comment.findAll({
                    where: {
                        PostId
                    }, 
                    include: [{
                        model: User,
                        foreignKey: 'uuid',
                        attributes: { exclude: ['id', 'email', 'password', 'status', 'createdAt', 'updatedAt'] }
                    }],
                    attributes: { exclude: ['id', 'strId', 'createdAt', 'updatedAt'] }
                })
                console.log(result)

                res.status(200).json({
                    countComments: result.length,
                    comments: result
                })
            } else {
                res.status(404).json({
                    message: 'post not found'
                })
            }
            
            
        } catch (err) {
            res.json(err)
        }
    }

    // fungsi delete comment
    static async commentdestroy(req, res){
        try {
            // user id dari access token
            let UserId = "2c7cb6df-9867-4ecd-aaa6-ba105c155282"
            let PostId = req.params.PostId
            let strId = req.body.strId
            
            let foundPost = await Post.findOne({
                where: {
                    strId: PostId
                }
            })

            let foundUser = await User.findOne({
                where: {
                    uuid: UserId
                }
            })

            if(foundPost){
                console.log('post found')

                if(foundUser){
                    let matchComment = await Comment.findOne({
                        where: {
                            strId, UserId
                        }
                    })
                    if(matchComment) {
                        let result = await Comment.destroy({
                            where: {
                                strId
                            }
                        })

                        if(result) {
                            res.status(201).json({message: 'comment deleted succesfully'})
                        } else {
                            res.status(404).json({message: 'comment failed to delete'})

                        }
                    } else {
                        res.status(403).json({message: 'Can\'t Delete the comment' })
                    }
                } else {
                    res.status(404).json({message: 'User Invalid!'})
                }
            } else {
                res.status(404).json({message: 'Post not found!'})
            }   
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = InteractionController;