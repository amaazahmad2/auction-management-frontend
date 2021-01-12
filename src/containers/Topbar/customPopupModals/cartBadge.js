import React from "react";
import Icon from "../../../components/uielements/icon";
import cartIcon from "./../../../images/cart_icon.png";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import './cartBadge.css';
import {store} from './../../../redux/store'

export default function CartBadge() {

    const [itemCount, setItemCount]=React.useState(0);

    React.useEffect(()=>{
        setItemCount(store.getState().cart.length);
    },[store.getState().cart.length])

    return (
        <div>
            <NotificationBadge className="cartBadge" count={itemCount} effect={Effect.SCALE} />
            <Icon>
                <img
                    style={{height:'inherit', width:'inherit'}}
                    src={cartIcon}
                    alt=""
                ></img>
            </Icon>
        </div>
    );
}
