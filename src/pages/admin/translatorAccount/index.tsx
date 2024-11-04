import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/api";
import { useForm } from "antd/es/form/Form";
import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function TranslatorAccount() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [agency, setAgency] = useState([]);
  const [language, setLanguage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState([]);

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

  const fetchlanguage = async () => {
    const response = await api.get("Language");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((language) => ({
      value: language.id,
      label: <span>{language.name}</span>,
    }));

    setLanguage(list);
  };

  useEffect(() => {
    fetchlanguage();
  }, []);

  const fetchRole = async () => {
    const response = await api.get("Role");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((role) => ({
      value: role.id,
      label: <span>{role.name}</span>,
    }));

    setRole(list);
  };

  const columns = [
    {
      title: "Tên Người Dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Tên Đầy Đủ",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Vai Trò",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId) => {
        // Check if category is available and initialized
        if (!role || role.length === 0) return null;

        // Find the category by ID and return its name
        const foundrole = role.find((rol) => rol.value === roleId);
        return foundrole ? foundrole.label : null;
      },
    },
    {
      title: "Chi nhánh",
      dataIndex: "agencyId",
      key: "agencyId",
      render: (agencyId) => {
        // Check if category is available and initialized
        if (!agency || agency.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const foundagency = agency.find((agen) => agen.value === agencyId);
        return foundagency ? foundagency.label : "Unknown Category";
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (isDeleted ? "Stop" : "Active"),
    },
  ];

  async function handleSubmit(values) {
    console.log(values);
    try {
      const response = await api.post("Account/Translator", values);
      setDataSource(response.data.data);
      formVariable.resetFields();
      toast.success("Tạo thành công tài khoản cho dịch thuật viên");
    } catch (error) {
      toast.error("tạo thất bại");
    }
  }

  async function fetchTranslatorAccount() {
    try {
      const response = await api.get("Account/GetAllTranslator");
      setDataSource(response.data.data);
      toast.success("Chào mừng đến trang Account");
    } catch (error) {
      toast.error("Không có Account nào");
    }
  }

  useEffect(() => {
    fetchTranslatorAccount();
    fetchRole();
  }, []);

  return (
    <div className="translator">
      <Button
        type="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Thêm Dịch Thuật Viên Mới
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={() => {
          formVariable.submit();
        }}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={formVariable}
          onFinish={handleSubmit}
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
            label="Họ và tên "
            name={"fullName"}
            rules={[
              {
                required: true,
                message: "Please Input Second Language",
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
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

          <Form.List name="skills">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "block", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Divider
                      orientation="left"
                      style={{ borderColor: "black" }}
                    >
                      Kỹ Năng
                    </Divider>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, "languageId"]}
                          fieldKey={[fieldKey, "languageId"]}
                          rules={[
                            {
                              required: true,
                              message: "chọn ngôn ngữ",
                            },
                          ]}
                          label="Ngôn ngữ"
                        >
                          <Select options={language} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, "certificateUrl"]}
                          fieldKey={[fieldKey, "certificateUrl"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui gửi ảnh bằng cấp",
                            },
                          ]}
                          label="Bằng Cấp"
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ fontSize: "24px", color: "red" }} // Tùy chỉnh kích thước và màu nếu muốn
                      />
                    </Form.Item>
                  </Space>
                ))}

                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "160px" }}
                  >
                    Thêm tài liệu
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
}

export default TranslatorAccount;
