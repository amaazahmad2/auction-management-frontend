import { API_URL } from './config';
import { LOGIN_SUCCESS, LOGIN_FAIL, GET_ERROR } from '../redux/actions/types/auth';
import axios from 'axios';

const apiEndpoint = API_URL + "/users/login/";


export async function loginUserService(username,password ){
    const userObj={username:username, password: password};
    const config = {
        headers: {
          "content-type": "application/json",
        }
    }
    // const {data:response} = await 
    await axios.post(apiEndpoint,userObj,config)
    .then((response) =>{
        // console.log(response);
        // if(response.status === 200) //successfully logged-in
        //     return {...response.data};
        // if(response.status===401)   //invalid username/password
        // {
        //     console.log("INVALID PASSWORD");
        //     return response.status;
        // }
        console.log(response);
        const returnObj={
            status: response.status,
            data: {...response.data}
        };
        console.log("RETURN OBJ: ",returnObj)
        return returnObj;
    })
    .catch((error) => {
        //console.log("ERROR");
        //console.log(error.status);
        return error.status;
    });


}