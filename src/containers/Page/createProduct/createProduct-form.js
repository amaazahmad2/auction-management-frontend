import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withFormik } from "formik";
import {
  FormControl,
  FormHelperText,
} from "../../../components/uielements/form";
import validationSchema from "./validate";
import Button from "../../../components/uielements/button";
import TextField from "../../../components/uielements/textfield";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const RenderTextField = ({ error, errorText, ...props }) => {
  return (
    <div>
      <FormControl>
        <TextField error={error} {...props} />
        {error ? <FormHelperText>{errorText}</FormHelperText> : ""}
      </FormControl>
    </div>
  );
};

const RenderDateTimeField = ({ error, errorText, ...props }) => {
  return (
    <div>
      <FormControl>
        <TextField
          error={error}
          {...props}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {error ? <FormHelperText>{errorText}</FormHelperText> : ""}
      </FormControl>
    </div>
  );
};

function makeImagesArray(images) {
  let imageArray = [];

  for (const [key] of Object.entries(images)) {
    imageArray[key] = key;
  }
  return imageArray;
}

const MyInnerForm = ({
  values,
  touched,
  errors,
  dirty,
  isSubmitting,
  handleChange,
  handleBlur,
  handleReset,
  setFieldValue,
  onSubmit,
  tags,
  setTags,
  isFeatured,
  setisFeatured,
  images,
  type,
  setType,
}) => {
  function handleStartingDate() {
    let startTime = new Date(document.getElementById("open_Time").value);
    let endObj = document.getElementById("close_Time");
    let endTime = null;
    if (endObj) {
      endTime = new Date(endObj.value);
    }

    if (startTime <= Date.now() || (endTime != null && startTime >= endTime)) {
      alert(
        "Start time cannot be less than current date or greater than end date"
      );
      document.getElementById("open_Time").value = "";
    }
  }
  function handleEndingDate() {
    let endTime = new Date(document.getElementById("close_Time").value);

    if (
      endTime <= Date.now() ||
      endTime <= new Date(document.getElementById("open_Time").value)
    ) {
      document.getElementById("close_Time").value = "";
      alert("End time cannot be less than current date or open date");
    }
  }

  return (
    <form className="mainFormsWrapper">
      <div
        className="container"
        style={{
          color: "white",
          backgroundColor: "white",
          borderRadius: "7px",
          width: "fit-content",
          padding: "5px",
        }}
      >
        <div className="mainFormsInfoWrapper">
          <div className="mainFormsInfoField">
            <RenderTextField
              required
              label="Product Title"
              id="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.title && touched.title}
              errorText={errors.title}
            />
          </div>

          <div className="mainFormsInfoField">
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Featured Image
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isFeatured}
                onChange={setisFeatured}
              >
                {makeImagesArray(images).map((key) => (
                  <MenuItem value={key}>{"image - " + key} </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mainFormsInfoField">
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Product type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={setType}
              >
                <MenuItem value={"auction"}>auction product</MenuItem>
                <MenuItem value={"limited"}>limited product</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mainFormsInfoField">
            <RenderDateTimeField
              id="open_Time"
              label="Starting Time"
              type="datetime-local"
              value={values.open_Time}
              onChange={() => {
                handleStartingDate();
              }}
              onBlur={handleBlur}
              error={errors.open_Time && touched.open_Time}
              errorText={errors.open_Time}
            />
          </div>
          <div className="mainFormsInfoField">
            <RenderDateTimeField
              id="close_Time"
              label="Closing Time"
              type="datetime-local"
              value={values.close_Time}
              onChange={() => {
                handleEndingDate();
              }}
              onBlur={handleBlur}
              error={errors.close_Time && touched.close_Time}
              errorText={errors.close_Time}
            />
          </div>
          <div className="mainFormsInfoField">
            <RenderTextField
              label="Enter product Detail"
              id="detail"
              value={values.detail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.detail && touched.detail}
              errorText={errors.detail}
            />
          </div>
          <div className="mainFormsInfoField">
            <RenderTextField
              label="Enter video link"
              id="link_video"
              value={values.link_video}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.link_video && touched.link_video}
              errorText={errors.link_video}
            />
          </div>
          <div className="mainFormsInfoField">
            <FormControl>
              <Autocomplete
                multiple
                id="tags-filled"
                options={[]}
                // value={values.tags}
                onChange={(event, newValue) => {
                  setTags(newValue);
                }}
                defaultValue=""
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    placeholder="tags"
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="mainFormsInfoField">
            <RenderTextField
              label="Price"
              id="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.price && touched.price}
              errorText={errors.price}
            />
          </div>

          {type === "limited" && (
            <div className="mainFormsInfoField">
              <RenderTextField
                label="Stock"
                id="stock"
                type="number"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.stock && touched.stocks}
                errorText={errors.stock}
              />
            </div>
          )}
        </div>

        <div className="mateFormsFooter">
          <div className="mateFormsSubmit">
            <Button
              className={values.agredTerms ? "mateFormsSubmitBtn" : ""}
              onClick={() => onSubmit(values)}
            >
              Submit
            </Button>
            <Button
              color="secondary"
              className="mateFormsClearBtn"
              onClick={handleReset}
              // disabled={!dirty || isSubmitting}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    close_time: "",
    title: "",
    type: "",
    price: 0,
    stock: 0,
    open_time: "",
    detail: "",
    status: "",
    link_video: "",
  }),
  validationSchema,
  displayName: "BasicForm",
})(MyInnerForm);
