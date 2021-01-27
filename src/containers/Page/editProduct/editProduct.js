import {ProductCreate} from '../createProduct/create-product';
import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import { FullColumn } from "../../../components/utility/rowColumn";
import Papersheet from "../../../components/utility/papersheet";

export default () => (
    <LayoutWrapper>
      <FullColumn>
        <Papersheet title="Edit product">
          <ProductCreate isEditPage={true} />
        </Papersheet>
      </FullColumn>
    </LayoutWrapper>
  );