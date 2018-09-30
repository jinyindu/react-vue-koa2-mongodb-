import * as actionTypes from './actionTypes'
import http from '../../config/http'

let fetchGetTags = (data) => {
    return {
        type: actionTypes.TAGLIST,
        data
    }
}

export function getAllTags() {
    return dispatch => {
        http.post('/api/u/getAllTag', {}).then(res => {
            if (res.status == 200 && res.data.errcode == 0) {
                dispatch(fetchGetTags(res.data.data))
            }
        })
    }
}