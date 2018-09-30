import * as actionTypes from '../../actions/actionTypes'

let initState = {
    
}
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TAGLIST:
            return {
                 ...state,
                 tagList: action.data
            }
        default:
            return state
    }
}