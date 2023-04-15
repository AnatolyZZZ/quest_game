export const GET_GAME = 'GET_GAME', SET_TOKEN='SET_ACCESS_TOKEN', SET_ADMIN = "SET_ADMIN", SET_LEVEL = 'SET_LEVEL', SET_ID = 'SET_ID'

export const getGame =  () => async (dispatch) => {
    const res = await fetch('/api/levels');
    if (res.ok) {
        const data = await res.json();
        dispatch({
            type: GET_GAME,
            payload : data
        })
    } else  {
        dispatch({
                type: GET_GAME,
                payload : []
        })
    }   
}

export const setToken = (token) => {
    return {
        type : SET_TOKEN,
        payload : token
    }
}

export const setAdmin = (admin) => {
    return {
        type : SET_ADMIN,
        payload : admin
    }
}

export const setPlayerLevel = (level) => {
    return {
        type : SET_LEVEL,
        payload : level
    }
}

export const setUserId = (id) => {
    return {
        type : SET_ID,
        payload : id
    }
}


