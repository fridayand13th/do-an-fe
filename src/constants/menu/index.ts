import { TMenu } from "@@types/constants/menu";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const BEE_EYE_MENU: TMenu[] = [
  {
    category: "dashboard",
    showCategory: false,
    items: [
      {
        icon: AiOutlineHome, // Updated icon
        menuName: "HOME",
        defaultPath: "/dashboard",
        subMenu: [],
      },
    ],
  },
  {
    category: "key",
    showCategory: false,
    items: [
      {
        icon: CgProfile, // Updated icon
        menuName: "Tài khoản",
        defaultPath: "/my-account",
        subMenu: [
          {
            link: "/my-account",
            subtitle: "Tài khoản của tôi",
          },
          {
            link: "/my-account/change-password",
            subtitle: "Đổi mật khẩu",
          },
        ],
      },
    ],
  },
];

export default BEE_EYE_MENU;
