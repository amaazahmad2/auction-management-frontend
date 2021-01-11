import { ADD_TO_CART_SUCCESS, REMOVE_FROM_CART_SUCCESS } from './../actions/types/cart';

const initialState={
    uuid: null,
            product_name: null,
            quantity_ordered:null,
            price: null
}

export default function cart(state = initialState, action) {
    if (action.type === ADD_TO_CART_SUCCESS) {
        
        return {
            ...state,
            uuid: action.payload.uuid,
            product_name: action.payload.name,
            quantity_ordered: action.payload.quantity,
            price: action.payload.price, 
        };
    } 
    else if(action.type === REMOVE_FROM_CART_SUCCESS){
        
    }
    else{
        return {
            ...state,
            uuid: null,
            product_name: null,
            quantity_ordered: null,
            price: null, 
        };
    }
}