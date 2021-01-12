import {
    ADD_TO_CART_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
} from "./../actions/types/cart";
import { store } from "./../store";

// const initialState={
//     uuid: null,
//             product_name: null,
//             quantity_ordered:null,
//             price: null
// }

const initialState = [];

export default function cart(state = initialState, action) {
    if (action.type === ADD_TO_CART_SUCCESS) {
        //console.log(state.cart)
        if (state.length!=0) {
            const newState = [...state];

            for (let i = 0; i < state.length; i++) {
                if (action.payload.uuid === state[i].uuid) {
                    newState[i].quantity_ordered =
                        action.payload.quantity_ordered + state[i].quantity_ordered;
                    return newState;
                }
            }
        }

        return [
            ...state,
            {
                uuid: action.payload.uuid,
                product_name: action.payload.product_name,
                quantity_ordered: action.payload.quantity_ordered,
                price: action.payload.price,
            },
        ];
    } else if (action.type === REMOVE_FROM_CART_SUCCESS) {
    } else {
        return [...state];
    }
}
