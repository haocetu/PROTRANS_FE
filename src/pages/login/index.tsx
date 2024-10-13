import { Button, Form, Input } from "antd";
import Authenlayout from "../../components/auth-layout";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../config/api";
import { toast } from "react-toastify";
import { login } from "../../redux/features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await api.post("Authentication/Login", values);
      toast.success("Successfull logged in");
      dispatch(login(response.data));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <Authenlayout>
      <h3 className="login__h3">Login Into Your Account</h3>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Login
        </Button>
      </Form>
      <div className="link">
        <Link to="/register">Register your Account</Link>
      </div>
    </Authenlayout>
  );

  <div>Login</div>;
}

export default Login;
