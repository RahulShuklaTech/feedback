import { ADD_USER, GET_USERS, GOT_USERS, SET_USER } from "../actions/userActions";

let initialState = {
    users: [],
    loading: false,
    user: []

}

export default function userReducer(state = initialState, action) {

    switch (action.type) {

        case GET_USERS:
            return { ...state, loading: true }

        case GOT_USERS:
            let userCopy = [...state.users];
            userCopy.push(...action.payload)
            return { ...state,users: userCopy, loading: false }

        case SET_USER: 
            let user = action.payload;
            return {...state, user}

        

        default:
            return state;
    }
}