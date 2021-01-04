import * as yup from 'yup';

const yString = yup.string();
const yNumber =yup.number();
export default yup.object().shape({
	email: yString.email('Invalid email address').required('Email is required!'),
    title: yString.required('Product Title is required!'),
    startingTime: yString.required('Starting Time is required!'),
    close_time: yString.required('Ending Time is required!'),
    detail: yString.required('detail is required!'),
    video_link: yString.required('video link is required!'),
    price: yString.required('Starting Price is required!'),
    price: yString.required('Price is required!'),
	stock: yNumber.required('Stock is required!')
});
