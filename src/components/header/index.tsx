import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
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
        <li>Phiên Dịch</li>
        <li>Chuyên Ngành</li>
        <li>Bảng Giá</li>
      </ul>
      <div className="header__right">
        <div className="header__account">
          <UserOutlined
            size={100}
            className="icon"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
