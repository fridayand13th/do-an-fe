import { TMenu } from "@@types/constants/menu";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const BEE_EYE_MENU: TMenu[] = [
  {
    category: "dashboard",
    showCategory: false,
    items: [
      {
        icon: AiOutlineHome,
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
        icon: CgProfile,
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
  {
    category: "search",
    showCategory: false,
    items: [
      {
        icon: AiOutlineSearch,
        menuName: "Tìm kiếm",
        defaultPath: "/search",
        subMenu: [],
      },
    ],
  },
];

export default BEE_EYE_MENU;
