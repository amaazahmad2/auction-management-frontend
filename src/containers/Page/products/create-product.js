import { Button } from '@material-ui/core';
import axios from "axios";
import{API_URL} from "../../../config"

import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ImageCrop from './image-croper'
import { FormsComponentWrapper, FormsMainWrapper } from '../products/product.style';
import { FullColumn } from '../../../components/utility/rowColumn';
import MyInnerForm from './createProduct-form'
import { set } from 'immutable';
function ProductCreate() {

       
const [images, setImages] = useState({});
const [close_time, setClose_time] = useState({});
const [type, setType] = useState({});
const [price, setPrice] = useState({});
const [stock, setStock] = useState({});
const [open_time, setOpen_time] = useState({});
const [detail, setDetail] = useState({});
const [link_video, setLink_video] = useState({});
const [status, setStatus] = useState({});
const [tags, setTags] = useState([]);
const [title, setTitle] = useState({});

const setTagsSelect=(event)=>{
    setTags(event.target.value)
}

const setProductType=(event)=>{
    setType(event.target.value)

}

const onSubmit=(values)=>{
     let imageArray =[];
   
    for (const [key, value] of Object.entries(images)) {
        imageArray[key] = new Object();
        imageArray[key]['image']=value;
    }
    values['images']=imageArray;
    values['tags']=tags;
    values['type']=type;

    // console.log(values);
    const config = {
        headers: {
          "content-type": "application/json",
          "Authorization" : "Bearer 105c1a72cf9aeaacad5be7359540eabb9c5559d0"
        },
      };
      const body = JSON.stringify(values);
      axios
        .post(API_URL.concat("/product/create-product/"), body, config)
        .then((response) =>{
            // if(response.status === 201)
            // {
            //   this.setState({class: "success" });
            //   this.setState({message:"User registered SuccessFully" });
            // }
            // if(response.status===200)
            // {
            //   this.setState({message: response.data.message });
            //   this.setState({class: "error" });
            // }
            // this.setState({open:true});
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

}



    return (
        <FormsMainWrapper>
          	<FormsComponentWrapper className="mateFormsComponent">
				<FullColumn>
					{/* <Counter /> */}
                    <ImageCrop images={images} setImages={setImages}/>
                    <MyInnerForm 
                        // setTitle={setTitle}
                        // setClose_time={setClose_time}
                        // setType={setType}
                        // setPrice={setPrice}
                        // setStock={setStock}
                        // setOpen_time={setOpen_time}
                        // setLink_video={setLink_video}
                        // setStatus={setStatus}
                        setTags={setTagsSelect}
                        tags={tags}
                        type={type}
                        setType={setProductType}
                        // setDetail={setDetail}
                        // values={{title,stock}}
                        onSubmit={onSubmit}

                    />
				</FullColumn>
			</FormsComponentWrapper>
        </FormsMainWrapper>
    );
}
export default ProductCreate;