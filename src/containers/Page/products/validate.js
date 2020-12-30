import * as yup from 'yup';

const yString = yup.string();
export default yup.object().shape({
	email: yString.email('Invalid email address').required('Email is required!'),
    productTitle: yString.required('Product Title is required!'),
    startingTime: yString.required('Starting Time is required!'),
    close_time: yString.required('Ending Time is required!'),
    detail: yString.required('detail is required!'),
    video_link: yString.required('video link is required!'),
    starting_price: yString.required('Starting Price is required!'),
    price: yString.required('Price is required!'),
	stock: yString.required('Stock is required!')
});
