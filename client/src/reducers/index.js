import { GET_GAME , SET_LEVEL, SET_TOKEN, SET_ADMIN, SET_ID} from '../actions'
const initialState = {
    level : 0,
    levels : [],
    id : 0,
    isAdmin : true,
    accessToken : ""
}

export const reducer = (state=initialState, action={}) => {
    switch (action.type) {
        case GET_GAME : 
            return {...state, levels : action.payload}
        case SET_TOKEN :
            localStorage.setItem("accessToken", action.payload)
            return {...state, accessToken : action.payload}
        case SET_ADMIN :
            localStorage.setItem("isAdmin", action.payload)
            return {...state, isAdmin : action.payload}
        case SET_LEVEL :
            console.log('in reducer', action.payload);
            localStorage.setItem("playerLevel", action.payload)
            return {...state, level : action.payload}
        case SET_ID :
            localStorage.setItem("userId", action.payload)
            return {...state, id : action.payload}
        default:
            return {...state}
    }
}