import { getDefaultPath } from "../../helpers/urlSync";
import {store} from "../../redux/store"

const options = [
  {
    label: "Create Product",
    key: "seller/create-product",
  },
  {
    label: "List of Products",
    key: "list-of-products",
  },
  
];

// const isSeller = store.getState().user.is_seller;
// if(isSeller === true){
//   options.push({
//     label:"My Products",
//     key:"my-products"
//   })
// }

const getBreadcrumbOption = () => {
  const preKeys = getDefaultPath();
  let parent, activeChildren;
  options.forEach((option) => {
    if (preKeys[option.key]) {
      parent = option;
      (option.children || []).forEach((child) => {
        if (preKeys[child.key]) {
          activeChildren = child;
        }
      });
    }
  });
  return { parent, activeChildren };
};
export default options;
export { getBreadcrumbOption };
