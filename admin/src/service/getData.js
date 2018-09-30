import {
    post,
    fetch
} from '../config/fetch';
import {
    getStore
} from '../config/mUtils'


/**
 * 账号密码登录
 */
export const accountLogin = (username, password) => post('/api3/u/signin', {
    username: username,
    password: password
});

/**
 * 全部博客分类
 *
 */
export const getCategory = () => post('/api3/u/getAllCategory', {});

/**
 * 全部标签
 *
 */
export const getTags = () => post('/api3/u/getAllTag')

/**
 * 添加文章
 * @param {*} options
 */
export const addPost = (options) => post('/api3/u/addPost', options)
/**
 * 查询文章
 * @param {*} options
 */
export const getAllPost = (options) => post('/api3/u/getAllPosts', options)

/**
 * 查询单个文章
 */
export const getPostById = (options) => post('/api3/u/getPostById', options)

//修改文章
export const updatePost = (options) => post('/api3/u/updatePost', options)

//删除文章
export const delPost = (id) => post('/api3/u/delPost', {
    id: id
})
