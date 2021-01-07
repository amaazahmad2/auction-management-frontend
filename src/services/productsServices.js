import { API_URL } from './config';
import axios from 'axios';


export async function getListOfProducts(pageNum){
    const apiEndpoint = API_URL + "/product/list-products/?page="+pageNum;
    const config = {
        headers: {
          "content-type": "application/json",
          "Authorization": "Token "+localStorage.token,
        }
    }
    const resp = await axios.get(apiEndpoint, config)
    .then((response) =>{
        return response;
    })
    .catch((error) => {
        return error;
    });

    console.log(resp);
    //return resp;
}