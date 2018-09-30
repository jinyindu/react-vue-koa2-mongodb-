import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000


/****
 * http request 拦截器
*/
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/****
 * http response 拦截器
*/
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default {
    get(url,param){
        return new Promise((resolve,reject) => {
            axios({
                method: 'get',
                url,
                params: param
            }).then(res => {
                resolve(res)
            },err => {
                reject(err)
            })
        })
    },
    post(url,data){
        return new Promise((resolve,reject) => {
            axios({
                method: 'post',
                url,
                data: data
            }).then(res => {
                resolve(res)
            },err => {
                reject(err)
            })
        })
    }
}
