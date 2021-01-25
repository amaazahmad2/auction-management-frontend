import Papersheet from "../../../components/utility/papersheet";
import React, { useState } from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import ImageCrop from "./image-croper";
import { FormsComponentWrapper, FormsMainWrapper } from "./product.style";
import { FullColumn } from "../../../components/utility/rowColumn";
import MyInnerForm from "./createProduct-form";
import { createProductService } from "../../../services/productsServices";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function ProductCreate() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [images, setImages] = useState({});
  const [type, setType] = useState({});
  const [message, setmessage] = useState({});
  const [snackBarClass, setsnackBarClass] = useState({});
  const [open, setOpen] = useState(false);
  const [isFeatured, setisFeatured] = useState({});
  const [tags, setTags] = useState([]);

  const setTagsSelect = (e) => {
    setTags(e);
  };

  const setProductType = (event) => {
    setType(event.target.value);
  };

  const setImageisFeatured = (event) => {
    setisFeatured(event.target.value);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (values) => {
    let imageArray = [];

    for (const [key, value] of Object.entries(images)) {
      imageArray[key] = {};
      imageArray[key]["image"] = value;
      if (key === isFeatured) {
        imageArray[key]["is_featured"] = true;
      } else {
        imageArray[key]["is_featured"] = false;
      }
    }
    values["images"] = imageArray;
    values["tags"] = tags;
    values["type"] = type;
    // if (values["close_Time"] == null) {
    //   alert("Closing time is required!");
    // }
    // if (values["open_Time"] == null) {
    //   alert("Starting time is required!");
    // }

    const createProductServiceResponse = await createProductService(values);
    console.log("ppppp:", createProductServiceResponse);

    if (createProductServiceResponse.data.status === "success") {
      setmessage(createProductServiceResponse.data.Message);
      setsnackBarClass("success");
      handleClick();
    } else {
      setsnackBarClass("error");
      setmessage("Unable to create product");
      handleClick();
    }
  };

  return (
    <FormsMainWrapper>
      <FormsComponentWrapper
        className="mateFormsComponent"
        style={{
          color: "white",
          backgroundColor: "white",
          borderRadius: "7px",
          width: "fit-content",
          padding: "5px",
        }}
      >
        <FullColumn>
          {/* <Counter /> */}
          <ImageCrop images={images} setImages={setImages} />
          <MyInnerForm
            setTags={setTagsSelect}
            tags={tags}
            type={type}
            isFeatured={isFeatured}
            setisFeatured={setImageisFeatured}
            setType={setProductType}
            onSubmit={onSubmit}
            images={images}
          />
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackBarClass}>
              {message}
            </Alert>
          </Snackbar>
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
