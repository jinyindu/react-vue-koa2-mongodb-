/**
 * 博客reducers
 */
import * as actionTypes from '../../actions/actionTypes'

let initState = {
}
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.BLOGLIST:
            return {
                ...state,
                pageData: action.payload
            }
        case actionTypes.BLOGDETAIL:
            return {
                ...state,
                detailData: action.data
            }
        case actionTypes.BLOGTOP:
            return {
                ...state,
                newsDataList: action.data
            }
        default:
            return state
    }
}