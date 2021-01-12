import { ADD_TO_CART_SUCCESS, REMOVE_FROM_CART_SUCCESS } from './types/cart';

export function addToCartAction(productObj){
    console.log("OBJ IN ACTION: ",productObj);
    return{
        type: ADD_TO_CART_SUCCESS,
        payload:{
            uuid: productObj.uuid,
            product_name: productObj.name,
            quantity_ordered: productObj.quantity,
            price: productObj.price, 
        }
    }
}

export function removeFromCart(productObj){
    return{
        type: REMOVE_FROM_CART_SUCCESS,
        payload:{
            //implement payload here
        }
    }
}