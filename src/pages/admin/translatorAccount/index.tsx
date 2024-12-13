import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Spin,
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
  LoadingOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import "./index.css";
import dayjs from "dayjs";

function TranslatorAccount() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [agency, setAgency] = useState([]);
  const [language, setLanguage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);

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
      title: "Mã",
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
              cursor: "pointer",
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
      fetchTranslatorAccount();
      formVariable.resetFields();
      toast.success("Tạo thành công tài khoản cho dịch thuật viên.");
    } catch (error) {
      toast.error("Tạo thất bại. " + error.response.data.message);
    }
  }

  async function fetchTranslatorAccount() {
    setLoading(true);
    try {
      const response = await api.get("Account/GetAllTranslator");
      setDataSource(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Danh sách trống.");
      setLoading(false);
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
          formVariable.setFieldsValue({
            skills: [{}],
          });
          setIsOpen(true);
        }}
      >
        <PlusOutlined />
        Tạo tài khoản mới
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={{
          spinning: loading,
          indicator: <Spin />,
        }}
      ></Table>
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          formVariable.resetFields();
        }}
        cancelText="Hủy"
        okText="Tạo tài khoản mới"
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
                message: "* vui lòng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name={"fullName"}
            rules={[
              {
                required: true,
                message: "* vui lòng nhập",
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
                message: "* vui lòng nhập",
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
                message: "* vui lòng nhập",
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
                message: "* vui lòng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name={"password"}
            rules={[
              {
                required: true,
                message: "* vui lòng nhập",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name={"dob"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <DatePicker
              placeholder="Chọn ngày"
              disabledDate={(current) => {
                return (
                  current &&
                  current > dayjs().subtract(16, "years").endOf("day")
                );
              }}
              defaultPickerValue={dayjs().subtract(16, "years")}
            />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="Male">Nam</Radio>
              <Radio value="Female">Nữ</Radio>
              <Radio value="Other">Khác</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Chi nhánh"
            name={"agencyId"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Select options={agency} placeholder="Chọn chi nhánh" />
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
                      Ngôn ngữ
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
                              message: "* vui lòng chọn",
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
                              message: "* vui lòng chọn",
                            },
                          ]}
                          label="Chứng chỉ"
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
                    Thêm ngôn ngữ
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
