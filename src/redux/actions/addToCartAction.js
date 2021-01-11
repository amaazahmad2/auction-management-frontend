import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE } from './../actions/types/cart';

export function addToCartAction(productObj){
    return{
        type: ADD_TO_CART_SUCCESS,
        payload:{
            // uuid:userObj.uuid,
            // token:userObj.token,
            // email: userObj.email,
            // phone_number: userObj.phone_number,
            // username: userObj.username,
            // name: userObj.name,
            // birthday: userObj.birthday,
            // gender: userObj.gender,
            // is_seller:false
            product_name: productObj.name,
            quantity_ordered: productObj.quantity,
            price: productObj.price, 
        }
    }
}