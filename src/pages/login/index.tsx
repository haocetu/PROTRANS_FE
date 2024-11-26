import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Authenlayout from "../../components/auth-layout";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/api";
import { toast } from "react-toastify";
import { login } from "../../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../redux/rootReducer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.accountmanage);

  const handleLogin = async (values) => {
    try {
      const response = await api.post("Authentication/Login", values);

      const token = response.data.token; // Assuming response.data.data contains the JWT token
      localStorage.setItem("token", token);

      localStorage.getItem("token");
      console.log(localStorage.getItem("token"));

      const decoded = jwtDecode(response.data.token);
      dispatch(login(decoded));

      if (decoded?.role === "Customer") {
        toast.success("Đăng nhập thành công.");
        navigate("/");
      } else if (decoded?.role === "Staff") {
        toast.success("Đăng nhập thành công.");
        navigate("/dashboardstaff");
      } else if (decoded?.role === "Admin") {
        toast.success("Đăng nhập thành công.");
        navigate("/dashboardadmin");
      } else if (decoded?.role === "Shipper") {
        toast.error("Shipper không được đăng nhập vào hệ thống");
        navigate("/login");
      } else if (decoded?.role === "Translator") {
        toast.success("Đăng nhập thành công.");
        navigate("/traslator");
      } else if (decoded?.role === "Manager") {
        toast.success("Đăng nhập thành công.");
        navigate("/dashboardmanager");
      }
    } catch (error) {
      toast.error("Tên đăng nhập hoặc mật khẩu không hợp lệ.");
    }
  };
  return (
    <Authenlayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Xếp theo chiều dọc
          alignItems: "center", // Căn giữa theo chiều ngang
          gap: "20px", // Tạo khoảng cách giữa các phần tử
        }}
      >
        <img
          src="/bank-images/ProTranslogo.png"
          alt="Logo"
          style={{
            width: "80px", // Chiều rộng tối đa
            height: "auto", // Tự động điều chỉnh chiều cao để giữ tỉ lệ
            maxHeight: "150px", // Chiều cao tối đa
            objectFit: "contain", // Giữ nguyên tỉ lệ ảnh
          }}
        />
        <h3 className="login__h3">Đăng nhập</h3>
        <Form
          labelCol={{
            span: 24,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              style={{ width: "300px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu.",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ width: "300px" }}
              type="password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "300px" }}>
            Đăng nhập
          </Button>
        </Form>
        <div className="link">
          Bạn không có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </Authenlayout>
  );
}

export default Login;
