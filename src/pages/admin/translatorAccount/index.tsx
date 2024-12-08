import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
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
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import "./index.css";

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

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await api.put(`Account/Toggle?id=${id}`);
      toast.success(
        `Tài khoản đã được ${!currentStatus ? "khóa" : "kích hoạt"} thành công.`
      );

      // Cập nhật lại danh sách sau khi trạng thái được thay đổi
      fetchTranslatorAccount();
    } catch (error) {
      // Hiển thị thông báo lỗi
      toast.error("Cập nhật trạng thái thất bại. Vui lòng thử lại.");
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Trạng thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) =>
        isDeleted ? (
          <div className="status-inactive">Ngưng hoạt động</div>
        ) : (
          <div className="status-active">Đang hoạt động</div>
        ),
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Popconfirm
          title={`Bạn có chắc chắn muốn ${
            !data.isDeleted
              ? "khóa tài khoản này?"
              : "kích hoạt lại tài khoản này?"
          }`}
          onConfirm={() => handleToggleStatus(id, data.isDeleted)}
          onCancel={() => {}}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <button
            style={{
              color: "white",
              backgroundColor: data.isDeleted ? "#23d783" : "#e03955",
              padding: 5,
              width: 80,
              borderRadius: 8,
              borderWidth: 0,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {data.isDeleted ? (
              <div>
                <UnlockOutlined />
                &nbsp; Mở
              </div>
            ) : (
              <div>
                <LockOutlined />
                &nbsp; Khóa
              </div>
            )}
          </button>
        </Popconfirm>
      ),
    },
  ];

  async function handleSubmit(values) {
    console.log(values);
    try {
      const response = await api.post("Account/Translator", values);
      setDataSource(response.data.data);
      formVariable.resetFields();
      toast.success("Tạo thành công tài khoản cho dịch thuật viên.");
    } catch (error) {
      toast.error("Tạo thất bại.");
    }
  }

  async function fetchTranslatorAccount() {
    try {
      const response = await api.get("Account/GetAllTranslator");
      setDataSource(response.data.data);
    } catch (error) {
      toast.error("Danh sách trống.");
    }
  }

  useEffect(() => {
    fetchTranslatorAccount();
    fetchRole();
  }, []);

  return (
    <div className="translator">
      <Button
        className="button-add"
        type="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PlusOutlined />
        Tạo tài khoản mới
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
