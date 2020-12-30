import React from 'react';
import { withFormik } from 'formik';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '../../../components/uielements/form';
import validationSchema from './validate';
import Button from '../../../components/uielements/button';
import TextField from '../../../components/uielements/textfield';
import Radio, { RadioGroup } from '../../../components/uielements/radio';
import Checkbox from '../../../components/uielements/checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { NULL } from 'node-sass';

const RenderTextField = ({ error, errorText, ...props }) => {
  return (
    <div>
      <FormControl>
        <TextField error={error} {...props} />
        {error ? <FormHelperText>{errorText}</FormHelperText> : ''}
      </FormControl>
    </div>
  );        
};

const RenderDateTimeField = ({ error, errorText, ...props }) => {
    return (
      <div>
        <FormControl>
        <TextField
            error={error} {...props}
            InputLabelProps={{
            shrink: true,
            }}
        />
          {error ? <FormHelperText>{errorText}</FormHelperText> : ''}
        </FormControl>
      </div>
    );
  };

const RenderToggle = ({ id, error, errorText, label, value, onChange }) => (
  <div>
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            color="primary"
            onChange={() => onChange(id, !value)}
          />
        }
        label={label}
      />
      {error ? <FormHelperText>{errorText}</FormHelperText> : ''}
    </FormControl>
  </div>
);

// const isFeatured = ({ error, errorText, ...props}) =>{

// }


const RenderRadioGroup = ({ onChange, ...props }) => {
  return (
    <RadioGroup
      {...props}
      onChange={(event, value) => onChange(props.id, value)}
      color="primary"
    />
  );
};
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
}) => {
  return (
    <form className="mainFormsWrapper">
      <div className="mainFormsInfoWrapper">
        <div className="mainFormsInfoField">
          <RenderTextField
            label="Product Title"
            id="productTitle"
            value={values.productTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.productTitle && touched.productTitle}
            errorText={errors.productTitle}
          />
        </div>
        
      <div className="mateFormsCheckList">
        <h4 className="radiButtonHeader">Is Featured Product</h4>
        <RenderRadioGroup
          label="Is Featured Product"
          id="featureProduct"
          value={values.featureProduct}
          onChange={setFieldValue}
          color="primary"
        >
          <div className="mateFormsRadioList">
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes"
              color="primary"
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="Yes"
              color="primary"
            />
          </div>
        </RenderRadioGroup>
      </div>
      <div className="mainFormsInfoField">

      <FormControl>
        <InputLabel id="demo-simple-select-label">Product type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=""
          onChange={handleChange}
        >   
          <MenuItem value={10}>auction product</MenuItem>
          <MenuItem value={20}>limited product</MenuItem>
        </Select>
      </FormControl>
      </div>
        
        <div className="mainFormsInfoField">
        <RenderDateTimeField
            id="startingTime"
            label="Starting Time"
            type="datetime-local"
            value={values.startingTime}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.startingTime && touched.startingTime}
            errorText={errors.startingTime}
        />
        </div>
        <div className="mainFormsInfoField">
        <RenderDateTimeField
            id="close_time"
            label="Closing Time"
            type="datetime-local"
            value={values.close_time}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.close_time && touched.close_time}
            errorText={errors.close_time}
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
            id="video_link"
            value={values.video_link}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.video_link && touched.video_link}
            errorText={errors.video_link}
          />
        </div>
        {values.product_type === 'auction' && (
            <div className="mainFormsInfoField">
            <RenderTextField
              label="Enter starting price"
              id="starting_price"
              type="number"
              value={values.starting_price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.starting_price && touched.starting_price}
              errorText={errors.starting_price}
            />
          </div>
        )}
        {values.product_type === 'limited' && (
            <div className="mainFormsInfoField">
            <RenderTextField
              label="Enter starting price"
              id="starting_price"
              type="number"
              value={values.starting_price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.starting_price && touched.starting_price}
              errorText={errors.starting_price}
            />
          </div>
        
  
        )}
        </div>

      <div className="mateFormsFooter">
        <div className="mateFormsChecBoxList">
          <RenderToggle
            label="I agree all statements in terms of service"
            id="agredTerms"
            value={values.agredTerms}
            onChange={setFieldValue}
            onBlur={handleBlur}
            error={!errors.agredTerms && touched.agredTerms}
            errorText={'Please agree'}
          />
        </div>
        <div className="mateFormsSubmit">
          <Button
            className={values.agredTerms ? 'mateFormsSubmitBtn' : ''}
            onClick={() => onSubmit(values)}
            disabled={!values.agredTerms}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="mateFormsClearBtn"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    firstName: '',
    close_time: '',
    product_type:'auction',
    starting_price:null,
    price: null,
    stock: null,
    startingTime:'',
    endingTime:'',
    description: '',
    link_video:'',
    agredTerms: false,
  }),
  validationSchema,
  displayName: 'BasicForm',
})(MyInnerForm);
