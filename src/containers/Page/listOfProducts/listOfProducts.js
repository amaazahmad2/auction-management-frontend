import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { FullColumn } from "../../../components/utility/rowColumn";
import hit from "./hit";
import Hit from "./products";

// let dummy = [];
// for (var i = 0; i < 10; ++i) {
//   dummy.push(
//     new Hit(
//       {
//         image:
//           "https://png.pngtree.com/element_our/sm/20180323/sm_5ab4a26e8d73b.jpg",
//       },
//       { price: 1200 }
//     )
//   );
// }

// let pp = (element) => {
//   return <Hit hit={element}></Hit>;
// };

export default () => (
  <LayoutWrapper>
    <FullColumn>
      <Papersheet title="List of Products"></Papersheet>
    </FullColumn>
  </LayoutWrapper>
);
