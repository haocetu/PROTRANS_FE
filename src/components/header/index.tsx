import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, MenuProps, message } from "antd";
import { logout } from "../../redux/features/userSlice";
import { RootState } from "../../redux/rootReducer";

function Header() {
  const navigate = useNavigate();
  const account = useSelector((store: RootState) => store.accountmanage);
  const dispatch = useDispatch();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
      navigate("/login");
    }
    if (key === "ManagerPage") {
      navigate("/dashboardmanager");
    }
    if (key === "AdminPage") {
      navigate("/dashboardadmin");
    }
    if (key === "TranslatorPage") {
      navigate("/traslator");
    }
    if (key === "StaffPage") {
      navigate("/dashboardstaff");
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
      label: "Staff Page",
      key: "StaffPage",
      icon: <UserOutlined />,
    },
    {
      label: "Translator Page",
      key: "TranslatorPage",
      icon: <UserOutlined />,
    },
    {
      label: "Admin Page",
      key: "AdminPage",
      icon: <UserOutlined />,
    },
    {
      label: "Manager Page",
      key: "ManagerPage",
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
        />
      </div>
      <ul className="header__navigation">
        <li>Giới Thiệu</li>
        <li>Dịch Thuật</li>
        <li onClick={() => navigate("/sendrequest")}>Gửi yêu cầu</li>
        <li>Chuyên Ngành</li>
        <li onClick={() => navigate("/quotePageDesign")}>Bảng Giá</li>
      </ul>
      <div className="header__right">
        <div className="header__account">
          {account ? (
            <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
              {account.Username}
            </Dropdown.Button>
          ) : (
            <UserOutlined
              size={100}
              className="icon"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
