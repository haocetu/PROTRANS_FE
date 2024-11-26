import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, MenuProps, message } from "antd";
import { logout } from "../../redux/features/userSlice";
import { RootState } from "../../redux/rootReducer";

function Header() {
  const navigate = useNavigate();
  const account = useSelector((store: RootState) => store.accountmanage);
  const dispatch = useDispatch();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click left button", e);
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
      navigate("/");
    }
    if (key === "MyRequest") {
      navigate("/myrequest");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "My Request Page",
      key: "MyRequest",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="/bank-images/ProTranslogo_standard.png"
          alt="logo"
          className="header__logo"
          width={150}
          onClick={() => navigate("/")}
        />
      </div>
      <ul className="header__navigation">
        <li>Giới Thiệu</li>
        <li>Dịch Thuật</li>
        <li
          onClick={() => {
            if (account) {
              navigate("/sendrequest");
              window.scrollTo(0, 0);
            } else {
              navigate("/login");
            }
          }}
        >
          Gửi yêu cầu
        </li>
        <li>Chuyên Ngành</li>
        <li onClick={() => navigate("/quotePageDesign")}>Bảng Giá</li>
      </ul>
      <div className="header__right">
        <div className="header__account">
          {account ? (
            <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
              <UserOutlined />
              {account.Username}
            </Dropdown.Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
