import axios from "axios"

const initialState = {
    user: {},
    loading: false,
    errorMessage: '',
}

const LOGIN_USER = 'LOGIN_USER'
const GET_USER = 'GET_USER'

export function loginUser(user) {
    const action = {
        type: LOGIN_USER,
        payload: user,
    }

    return action
}

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, {user: action.payload})
        default:
            return state
    }
}

export function getRandomUser() {
    const randomUser = axios
        .get('https://randomuser.me/api/')
        .then(res => res.data.results[0])
        .catch(error => error.message)

    const action = {
        type: GET_USER,
        payload: randomUser,
    }

    return action
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_PENDING':
            return Object.assign({}, state, {loading: true})
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload, loading: false})
        case GET_USER + '_REJECTED':
            return Object.assign({}, state, {errorMessage: action.payload})
        default:
            return state
    }
}