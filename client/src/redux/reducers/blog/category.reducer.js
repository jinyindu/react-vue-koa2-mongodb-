import * as actionTypes from '../../actions/actionTypes'
//文章分类

let initState = {
}
export default (state = initState,action) => {
    switch (action.type) {
        case actionTypes.BLOGCATECOUNT:
            return {
                ...state,
                pageData: action.data
            }
        default:
            return state
    }
}