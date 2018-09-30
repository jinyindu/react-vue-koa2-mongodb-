var mongoose = require('mongoose')
var Post = mongoose.model('Post')


/**
 * 根据全部文章
 * @param {*} username 
 */
exports.getAllPosts = async (page, pageSize, categoryId,key) => {
    var page = Math.abs(parseInt(page || 1, 10))
    var size = Math.abs(parseInt(pageSize)) || 10
    var res = []

    key = key? key : ''
    var params = {
        published: true,
        $or:[
            { 'title': { '$regex': key, $options: '$i' } },
            { 'content': { '$regex': key, $options: '$i' } }
        ]
    }
    if (categoryId) {
        params.category = categoryId
    }

    let posts = await Post.find(params).populate('category')

    var totalCount = posts.length
    var pageCount = Math.ceil(totalCount / size)

    if (page > pageCount) {
        page = pageCount
    }
    res = {
        list: posts.slice((page - 1) * size, page * size),
        page: page,
        pageCount: pageCount,
        total: totalCount
    }
    return res
}
/**
 * 根据ID查询文章详情
 * @param {*} id 
 */
exports.getPostsById = async (postId) => {

    var item = await Post
        .findOne({
            _id: postId
        })
        .populate('category')
        .exec();

    return item
}

/**
 * 查询最新文章
 */
exports.getPostTop10 = async (top) => {
    let res = []
    await Post
        .find({
            published: true
        }, function (err, posts) {
            if (!err) {
                res = posts
            }
        })
        .sort()
        .limit(top);

    return res
}