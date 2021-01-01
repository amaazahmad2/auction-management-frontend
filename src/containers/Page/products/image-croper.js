import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
import LayoutWrapper from '../../../components/utility/layoutWrapper';

function ImageCrop({images, setImages}) {
  const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };
//   const [images, setImages] = useState({});

  return (
    <LayoutWrapper>

    <MultiImageInput
        theme="light"
        images={images}
        setImages={setImages}
        cropConfig={{ crop, ruleOfThirds: true }}
    />
    </LayoutWrapper>

  );
}

export default ImageCrop;