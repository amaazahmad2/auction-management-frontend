import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from "../actions/types/auth";

const initialState = {
    token: null,
    uuid: null,
    email: null,
    phone_number: null,
    username: null,
    name: null,
    birthday: null,
    gender: null,
};

export default function user(state = initialState, action) {
    if (action.type === LOGIN_SUCCESS) {
        
        return {
            ...state,
            uuid: action.payload.uuid,
            token: action.payload.token,
            email: action.payload.email,
            phone_number: action.payload.phone_number,
            username: action.payload.username,
            name: action.payload.name,
            birthday: action.payload.birthday,
            gender: action.payload.gender,
            is_seller:action.payload.is_seller,
            coins: action.payload.coins
        };
    } else if (action.type === LOGIN_FAIL) {
    } else if (action.type === LOGOUT_SUCCESS) {
        return {
            ...state,
            token: null,
            uuid: null,
            email: null,
            phone_number: null,
            username: null,
            name: null,
            birthday: null,
            gender: null,
            is_seller:null,
            coins:null
        };
    }
    return state;
}
