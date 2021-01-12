import React from "react";
import Icon from "../../../components/uielements/icon";
import cartIcon from "./../../../images/cart_icon.png";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import './cartBadge.css';
import {store} from './../../../redux/store'
import {useSelector} from 'react-redux';

export default function CartBadge() {

    const itemCount = useSelector(state=>state.cart.length)

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
