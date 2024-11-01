import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function ShipperAndStaff() {
  const [formVariable] = useForm();
  const [agency, setAgency] = useState([]);
  const [role, setRole] = useState([]);
  const [datasource, setDataSource] = useState([]);

  const fetchAgency = async () => {
    const response = await api.get("Agency");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((agency) => ({
      value: agency.id,
      label: <span>{agency.name}</span>,
    }));

    setAgency(list);
  };

  useEffect(() => {
    fetchAgency();
  }, []);

  const fetchRole = async () => {
    const response = await api.get("Role/ShipperAndStaff");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((role) => ({
      value: role.id,
      label: <span>{role.name}</span>,
    }));

    setRole(list);
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handlesubmitAccount = async (values) => {
    console.log(values);
    try {
      const response = await api.post("Account", values);
      setDataSource(response.data.data);
      formVariable.resetFields();
      toast.success("Tạo thành Công");
    } catch (error) {
      toast.error("Assign fail");
    }
  };

  // const fetchShipperAndStaffAccount = async () => {
  //   try {
  //     const response = await api.get("Account/GetStaffAndShipper");
  //     console.log(response.data.data);
  //     setDataSource(response.data.data);
  //   } catch (error) {
  //     toast.error("Fail");
  //   }
  // };

  // useEffect(() => {
  //   fetchShipperAndStaffAccount();
  // }, []);

  return (
    <Form
      form={formVariable}
      labelCol={{
        span: 24,
      }}
      onFinish={handlesubmitAccount}
    >
      <Form.Item
        label="Tên người dùng"
        name={"userName"}
        rules={[
          {
            required: true,
            message: "Please Input Tên người dùng",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Họ và Tên"
        name={"fullName"}
        rules={[
          {
            required: true,
            message: "Please Input Họ và Tên",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name={"email"}
        rules={[
          {
            required: true,
            message: "Please Input Email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name={"phoneNumber"}
        rules={[
          {
            required: true,
            message: "Please Input Số điện thoại",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name={"address"}
        rules={[
          {
            required: true,
            message: "Please Input Địa chỉ",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật Khẩu"
        name={"password"}
        rules={[
          {
            required: true,
            message: "Please Input Mật Khẩu",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Ngày tháng năm sinh"
        name={"dob"}
        rules={[
          {
            required: true,
            message: "Please Input ngày tháng năm sinh",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Giới tính"
        name={"gender"}
        rules={[
          {
            required: true,
            message: "Please Input Giới tính",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="chọn giới tính"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Vai trò"
        name={"roleId"}
        rules={[
          {
            required: true,
            message: "Please Input Vai trò",
          },
        ]}
      >
        <Select options={role} />
      </Form.Item>
      <Form.Item
        label="Chi nhánh"
        name={"agencyId"}
        rules={[
          {
            required: true,
            message: "Please Input Chi nhánh",
          },
        ]}
      >
        <Select options={agency} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
          <Button type="default" onClick={() => formVariable.resetFields()}>
            hủy
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default ShipperAndStaff;
