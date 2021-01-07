import { Button } from '@material-ui/core';
import axios from "axios";
import { API_URL } from "../../../services/config"
import Papersheet from "../../../components/utility/papersheet";
import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ImageCrop from './image-croper'
import { FormsComponentWrapper, FormsMainWrapper } from './product.style';
import { FullColumn } from '../../../components/utility/rowColumn';
import MyInnerForm from './createProduct-form'
import { set } from 'immutable';
import DateAndTimePickers from './dateAndTimePicker';

function ProductCreate() {


    const [images, setImages] = useState({});
    const [type, setType] = useState({});
    const [tags, setTags] = useState([]);
    
    const setTagsSelect = (event) => {
        setTags(event.target.value)
    }

    const setProductType = (event) => {
        setType(event.target.value)

    }

    const onSubmit = (values) => {
        let imageArray = [];

        for (const [key, value] of Object.entries(images)) {
            imageArray[key] = new Object();
            imageArray[key]['image'] = value;
        }
        values['images'] = imageArray;
        values['tags'] = tags;
        values['type'] = type;

        // const config = {
        //     headers: {
        //         "content-type": "application/json",
        //         "Authorization": "Token " + localStorage.getItem('token'),
        //     },
        // };
        // const body = JSON.stringify(values);

        console.log(values);
        

    }



    return (
        <FormsMainWrapper>
            <FormsComponentWrapper className="mateFormsComponent" style={{
                color: "white", backgroundColor: "white", borderRadius: "7px",
                width: "fit-content", padding: "5px"
            }}>
                <FullColumn>
                    {/* <Counter /> */}
                    <ImageCrop images={images} setImages={setImages} />
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
//export default ProductCreate;

export default () => (
    <LayoutWrapper>
        <FullColumn>
            <Papersheet title="Create Product">
                <ProductCreate />
            </Papersheet>
        </FullColumn>
    </LayoutWrapper>
);