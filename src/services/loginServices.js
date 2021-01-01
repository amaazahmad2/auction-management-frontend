import { API_URL } from './config';
import axios from 'axios';




export async function loginUserService(username,password ){
    const apiEndpoint = API_URL + "/users/login/";
    const userObj={username:username, password: password};
    const config = {
        headers: {
          "content-type": "application/json",
        }
    }
    // const {data:response} = await 
    const resp = await axios.post(apiEndpoint,userObj,config)
    .then((response) =>{
        // console.log(response);
        // if(response.status === 200) //successfully logged-in
        //     return {...response.data};
        // if(response.status===401)   //invalid username/password
        // {
        //     console.log("INVALID PASSWORD");
        //     return response.status;
        // }
        return response;
    })
    .catch((error) => {
        //console.log("ERROR");
        //console.log(error.status);
        return error;
    });

    return resp;
}

export async function googleLoginService(first_name,last_name,email,google_token ){
    const apiEndpoint = API_URL + "/users/googlelogin/";
    const userObj={first_name:first_name, last_name:last_name, email:email, google_token:google_token};
    const config = {
        headers: {
          "content-type": "application/json",
        }
    }
    const resp = await axios.post(apiEndpoint,userObj,config)
    .then((response) =>{
        return response;
    })
    .catch((error) => {
        return error;
    });
    return resp;
}

export async function facebookLoginService(first_name,last_name,email,facebook_token ){
    const apiEndpoint = API_URL + "/users/facebooklogin/";
    const userObj={first_name:first_name, last_name:last_name, email:email, facebook_token:facebook_token};
    const config = {
        headers: {
          "content-type": "application/json",
        }
    }
    console.log("OBJ PASSED TO FACEBOOK: ",userObj);
    const resp = await axios.post(apiEndpoint,userObj,config)
    .then((response) =>{
        return response;
    })
    .catch((error) => {
        return error;
    });
    return resp;
}