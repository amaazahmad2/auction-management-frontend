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
import { createProductService } from "../../../services/productsServices";
function ProductCreate() {


    const [images, setImages] = useState([]);
    const [type, setType] = useState({});
    const [isFeatured,setisFeatured] = useState({});
    const [tags, setTags] = useState(["latest",
    "popular",
    "newww"]);
    
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
            imageArray[key]['is_featured'] = false;

        }
        values['images'] = imageArray;
        values['tags'] = tags;
        values['type'] = type;
        
        

        const createProductServiceResponse =  createProductService(
            values
        );

        console.log(JSON.stringify(values));
        

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
                        setTags={setTagsSelect}
                        tags={tags}
                        type={type}
                        isFeatured = {isFeatured}
                        setisFeatured ={setisFeatured}
                        setType={setProductType}
                        onSubmit={onSubmit}
                        images = {images}
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