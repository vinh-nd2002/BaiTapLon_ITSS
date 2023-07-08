import icons from "./icons";
import path from "./path";

export const navigation = [
  { id: 1, value: "HOME", path: `/${path.HOME}` },
  { id: 2, value: "PRODUCTS", path: `/${path.PRODUCTS}` },
  { id: 3, value: "BLOGS", path: `/${path.BLOGS}` },
  { id: 4, value: "OUR SERVICES", path: `/${path.OUR_SERVICES}` },
  { id: 5, value: "FAQS", path: `/${path.FAQS}` },
];

const { FaShieldAlt, FaTruck, AiFillGift, BsFillReplyFill, BiSupport } = icons;
export const productsExtraList = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality Checked",
    icon: <FaShieldAlt color="white" size={25} />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <FaTruck color="white" size={25} />,
  },
  {
    id: 3,
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <AiFillGift color="white" size={25} />,
  },
  {
    id: 4,
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <BsFillReplyFill color="white" size={25} />,
  },
  {
    id: 5,
    title: "Support",
    sub: "Lifetime 24/7",
    icon: <BiSupport color="white" size={25} />,
  },
];

export const productTabs = [
  {
    id: 1,
    name: "Description",
  },
  {
    id: 2,
    name: "Delivery",
  },
  {
    id: 3,
    name: "Payment",
  },
  {
    id: 4,
    name: "Review",
  },
];
