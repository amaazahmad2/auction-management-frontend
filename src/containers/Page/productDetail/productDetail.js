import React, { Component } from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";

export default class ProductDetail extends Component {
    render() {
        return (
            <LayoutWrapper>
                <FullColumn>
                    <Papersheet title="Product Detail"></Papersheet>
                </FullColumn>
            </LayoutWrapper>
        );
    }
}


