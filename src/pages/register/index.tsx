import { Button, DatePicker, Form, Input, Radio } from "antd";
import Authenlayout from "../../components/auth-layout";
import "./index.css";
import { toast } from "react-toastify";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    console.log("hello");
    try {
      await api.post("Authentication/Register", values);
      toast.success("Register Succesffuly");

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Authenlayout>
      <h3 className="Register__h3">Register Your Account</h3>
      <Form
        name="userForm"
        onFinish={handleRegister}
        initialValues={{
          role: "ADMIN",
        }}
        layout="vertical"
      >
        <Form.Item
          label="Tên Tài khoản"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Họ và Tên"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone number" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ:"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Ngày Sinh:"
          name="dob"
          rules={[
            { required: true, message: "Please select your date of birth!" },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name={"confirmPassword"}
          rules={[
            {
              required: true,
              message: "Please Input Confirm Password",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input type="password" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Authenlayout>
  );
}

export default Register;
