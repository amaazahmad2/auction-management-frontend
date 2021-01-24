
import React from 'react';
import MultiImageInput from 'react-multiple-image-input';
import LayoutWrapper from '../../../components/utility/layoutWrapper';

function ImageCrop({images, setImages}) {
  const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };

  return (
    <LayoutWrapper>

    <MultiImageInput max={10}
        theme="light"
        images={images}
        setImages={setImages}
        cropConfig={{ crop, ruleOfThirds: true }}
    />
    </LayoutWrapper>

  );
}

export default ImageCrop;