import { ADD_TO_CART_SUCCESS, REMOVE_FROM_CART_SUCCESS } from './types/cart';

export function addToCartAction(productObj){
    //console.log("OBJ IN ACTION: ",productObj);
    return{
        type: ADD_TO_CART_SUCCESS,
        payload:{
            uuid: productObj.uuid,
            product_name: productObj.name,
            quantity_ordered: productObj.quantityOrdered,
            price: productObj.price, 
            quantity_in_stock:productObj.quantityInStock
        }
    }
}

export function removeFromCartAction(productRemovedUUID){
    return{
        type: REMOVE_FROM_CART_SUCCESS,
        payload:{
            product_removed_uuid: productRemovedUUID
        }
    }
}