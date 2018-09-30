/**
 * 封装axios
 */
import axios from 'axios';
import { Message } from 'element-ui';
import { baseUrl } from './env';

axios.defaults.timeout = 5000;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    config => {
        //config.data = JSON.stringify(config.data);
        // config.headers = {
        //     'Content-Type': 'application/json'
        // }
        return config
    },
    error => {
        return Promise.reject(err)
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

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
      axios.get(url,{
        params:params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
    })
}


/**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
*/

export function post(url,data = {}){
     return new Promise((resolve,reject) => {
       axios.post(url,data)
            .then(response => {
              resolve(response.data);
            },err => {
              reject(err)
            })
     })
   }
