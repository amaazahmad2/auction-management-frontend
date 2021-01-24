import { getDefaultPath } from "../../helpers/urlSync";

const options = [
  // {
  //   label: 'sidebar.dashboard',
  //   key: 'dashboard',
  // },
  {
    label: "sidebar.blankPage",
    key: "blank-page",
  },
  {
    label: "Create Product",
    key: "seller/create-product",
  },
  {
    label: "List of Products",
    key: "list-of-products",
  },
  {
    label:"Checkout Page",
    key:'checkout'
  },
  {
    label:"My Products",
    key:"my-products"
  }
];
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
