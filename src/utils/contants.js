import icons from "./icons";
import path from "./path";

export const navigation = [
  { id: 1, value: "TRANG CHỦ", path: `/${path.HOME}` },
  { id: 2, value: "SẢN PHẨM", path: `/${path.PRODUCTS}` },
  { id: 3, value: "BLOGS", path: `/${path.BLOGS}` },
  { id: 4, value: "VỀ CHÚNG TÔI", path: `/${path.OUR_SERVICES}` },
  { id: 5, value: "HỎI ĐÁP", path: `/${path.FAQS}` },
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
    name: "MÔ TẢ",
  },
  {
    id: 2,
    name: "ĐỊA ĐIỂM",
  },
  {
    id: 3,
    name: "THANH TOÁN",
  },
  {
    id: 4,
    name: "NHẬN XÉT",
  },
];

const { MdDashboard, HiUserGroup, FiLogOut } = icons;

export const adminSideBar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `${path.DASHBOARD}`,
    icon: <MdDashboard />,
  },

  {
    id: 2,
    type: "SINGLE",
    text: "Quản lý người dùng",
    path: `${path.MANAGE_USERS}`,
    icon: <HiUserGroup />,
  },

  {
    id: 3,
    type: "SINGLE",
    text: "Quản lý shop",
    path: `${path.MANAGE_SHOPS}`,
    icon: <HiUserGroup />,
  },

  // {
  //   id: 4,
  //   type: "PARENT",
  //   text: "Quản lý người dùng",
  //   path: `${path.DASHBOARD}`,
  //   icon: <HiUserGroup />,
  //   submenu: [
  //     {
  //       text: "Yêu cầu 1",
  //       path: `${path.CREATE_SHOP}`,
  //     },
  //     {
  //       text: "Yêu cầu 2",
  //       path: `${path.CREATE_SHOP}`,
  //     },
  //   ],
  // },
  {
    id: 4,
    type: "SINGLE",
    text: "Đăng xuất",
    path: `/${path.LOGIN}`,
    icon: <FiLogOut />,
  },
];
