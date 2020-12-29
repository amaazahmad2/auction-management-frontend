import {axios} from "axios";
import { getError, removeError } from "./errorAction";
import{API_URL} from "../../services/config"



import { LOGIN_SUCCESS, LOGIN_FAIL, GET_ERROR } from './../actions/types/auth';


const apiEndpoint = API_URL + "/users/login/";

export async function loginUser(){
    return{
        type: LOGIN_SUCCESS,
        payload:{

        }
    }
}