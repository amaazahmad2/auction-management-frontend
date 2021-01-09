import {axios} from "axios";
import { getError, removeError } from "./errorAction";
import{API_URL} from "../../services/config"



import { LOGIN_SUCCESS, LOGIN_FAIL, GET_ERROR } from './../actions/types/auth';


const apiEndpoint = API_URL + "/users/login/";

export function loginUserAction(userObj){
    return{
        type: LOGIN_SUCCESS,
        payload:{
            uuid:userObj.uuid,
            token:userObj.token,
            email: userObj.email,
            phone_number: userObj.phone_number,
            username: userObj.username,
            name: userObj.name,
            birthday: userObj.birthday,
            gender: userObj.gender,
            is_seller:true
        }
    }
}