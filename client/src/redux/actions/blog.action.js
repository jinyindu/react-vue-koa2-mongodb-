import * as actionTypes from './actionTypes'
import http from '../../config/http'

let fetchBlogsList = (data) => {
    return {
        type: actionTypes.BLOGLIST,
        payload: data
    }
}

let fetchBlogDetail = (data) => {
    return {
        type: actionTypes.BLOGDETAIL,
        data
    }
}

let fetchBlogCount = (data) => {
    return {
        type: actionTypes.BLOGCATECOUNT,
        data
    }
}

let fetchBlogTop = (data) => {
    return {
        type: actionTypes.BLOGTOP,
        data
    }
}
//博客列表
export function getBlogsList(data) {
    return dispatch => {
        http.post('/api/u/getAllPosts', data).then(res => {
            if (res.status == 200 && res.data.errcode == 0) {
                dispatch(fetchBlogsList(res.data.data))
            }
        })
    }
}

//博客详情
export function getBlogDetail(data){
    return dispatch => {
        http.post('/api/u/getPostById', data).then(res => {
            if (res.status == 200 && res.data.errcode == 0) {
                dispatch(fetchBlogDetail(res.data.data))
            }
        })
    }
}
//分类文章数量
export function getCatrgoriesCount(){
    return dispatch => {
        http.post('/api/u/getCategoryCount',{}).then(res => {
            if (res.status == 200 && res.data.errcode == 0) {
                dispatch(fetchBlogCount(res.data.data))
            }
        })
    }
}

export function getPostTop10(){
    return dispatch => {
        http.post('/api/u/getPostTop10',{}).then(res => {
            if (res.status == 200 && res.data.errcode == 0) {
                dispatch(fetchBlogTop(res.data.data))
            }
        })
    }
}
