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

export async function createProductService(){
    const apiEndpoint = API_URL + "/users/become-seller"
    const config = {
        headers: {
          "content-type": "application/json",
          "Authorization": "Token "+localStorage.token,
        }
    }

    // const resp = await axios.post(apiEndpoint, body, config)
    //         .then((response) => {
    //             // if(response.status === 201)
    //             // {
    //             //   this.setState({class: "success" });
    //             //   this.setState({message:"User registered SuccessFully" });
    //             // }
    //             // if(response.status===200)
    //             // {
    //             //   this.setState({message: response.data.message });
    //             //   this.setState({class: "error" });
    //             // }
    //             // this.setState({open:true});
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
}