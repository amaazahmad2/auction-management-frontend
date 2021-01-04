import React from 'react';
import { withFormik } from 'formik';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '../../../components/uielements/form';
import Input from '@material-ui/core/Input';
import validationSchema from './validate';
import Button from '../../../components/uielements/button';
import TextField from '../../../components/uielements/textfield';
import Radio, { RadioGroup } from '../../../components/uielements/radio';
import Checkbox from '../../../components/uielements/checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

const handleChangeMulti=(event)=>{
  // const { options } = event.target;
  // const value = [];
  // for (let i = 0, l = options.length; i < l; i += 1) {
  //   if (options[i].selected) {
  //     value.push(options[i].value);
  //   }
  // // this.setState(tags:value);
  // console.log(value);
  
  console.log(event.target.value)
  //this.setState({values.tags:[1,2,3]});
}

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
  tags,
  setTags,
  type,
  setType,
}) => {
  return (
    <form className="mainFormsWrapper">
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
        
      {/* <div className="mateFormsCheckList">
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
      </div> */}
      <div className="mainFormsInfoField">

      <FormControl>
        <InputLabel id="demo-simple-select-label">Product type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={setType}
        >   
          <MenuItem value={'auction'}>auction product</MenuItem>
          <MenuItem value={'limited'}>limited product</MenuItem>
        </Select>
      </FormControl>
      </div>
        
        <div className="mainFormsInfoField">
        <RenderDateTimeField
            id="startingTime"
            label="Starting Time"
            type="datetime-local"
            value={values.open_Time}
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
            value={values.link_video}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.video_link && touched.video_link}
            errorText={errors.video_link}
          />
        </div>
        <div className="mainFormsInfoField">

      <FormControl>
        <InputLabel id="tag-label">Tags</InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // id="tags"
          value={tags}
          onChange={setTags}
          // renderValue={(selected) => selected.join(', ')}
          input={<Input />}

        >   
          <MenuItem value={'t1'}>t1</MenuItem>
          <MenuItem value={'t2'}>t2</MenuItem>
          <MenuItem value={'t3'}>t3</MenuItem>
          <MenuItem value={'t4'}>t4</MenuItem>
          <MenuItem value={'t5'}>t5</MenuItem>

        </Select>
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
        
        {type === 'limited' && (
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
        {/* <div className="mateFormsChecBoxList">
          <RenderToggle
            label="I agree all statements in terms of service"
            id="agredTerms"
            value={values.agredTerms}
            onChange={setFieldValue}
            onBlur={handleBlur}
            error={!errors.agredTerms && touched.agredTerms}
            errorText={'Please agree'}
          /> */}
        {/* </div> */}
        <div className="mateFormsSubmit">
          <Button
            className={values.agredTerms ? 'mateFormsSubmitBtn' : ''}
            onClick={() => onSubmit(values)}
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
    close_time: '',
    title:'',
    type:'',
    price: null,
    stock: null,
    close_time:'',
    open_time:'',
    detail: '',
    link_video:'',
  }),
  validationSchema,
  displayName: 'BasicForm',
})(MyInnerForm);
