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
  const [openTime, setOpenTime] = useState([]);
  const [closeTime, setCloseTime] = useState([]);

  const setTagsSelect = (e) => {
    setTags(e);
  };

  const setOpeningTime = (e) => {
    let startTime = new Date(e.target.value);
    let endObj = document.getElementById("close_time");
    let endTime = null;
    if (endObj) {
      endTime = new Date(endObj.value);
    }

    if (startTime <= Date.now() || (endTime != null && startTime >= endTime)) {
      alert(
        "Start time cannot be less than current date or greater than end date"
      );
      document.getElementById("open_time").value = "";
      e.target.value = null;
    }

    setOpenTime(e.target.value);
  };

  const setClosingTime = (e) => {
    let endTime = new Date(e.target.value);

    if (
      endTime <= Date.now() ||
      endTime <= new Date(document.getElementById("open_time").value)
    ) {
      document.getElementById("close_time").value = "";
      e.target.value = null;
      alert("End time cannot be less than current date or open date");
    }
    setCloseTime(e.target.value);
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
    values["open_time"] = openTime;
    values["close_time"] = closeTime;

    // if (values["close_Time"] == null) {
    //   alert("Closing Time is required!");
    // }
    // if (values["open_time"] == null) {
    //   alert("Starting time is required!");
    // }

    const createProductServiceResponse = await createProductService(values);
    console.log("product service response:", createProductServiceResponse);
    console.log("values array:", values);
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
            setOpeningTime={setOpeningTime}
            setClosingTime={setClosingTime}
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
