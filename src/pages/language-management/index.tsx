import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Value } from "sass";
import api from "../../config/api";
import { PlusOutlined, StopOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function Language() {
  const [formVariable] = useForm();
  const [formUpdate] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [idLanguage, setIdLanguage] = useState("");
  const token = localStorage.getItem("token");

  console.log("TOKEN: ", token);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => {
        const currentPage = pagination.current || 1;
        const pageSize = pagination.pageSize || 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) =>
        isDeleted ? (
          <div className="status-inactive">Vô hiệu hóa</div>
        ) : (
          <div className="status-active">Hoạt động</div>
        ),
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Space>
          <Popconfirm
            title={data.name}
            description="Bạn có chắc chắn muốn vô hiệu hóa ngôn ngữ này?"
            onConfirm={() => handleDeleteLanguage(id)}
            okText="Có"
            cancelText="Đóng"
          >
            <Tooltip title="Vô hiệu hóa">
              <Button type="primary" danger>
                <StopOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
          {/* <Button
            type="primary"
            style={{ background: "orange" }}
            onClick={() => {
              setVisibleEditModal(true);
              formVariable.setFieldsValue(data);
            }}
          >
            Cập nhật
          </Button> */}
        </Space>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  async function fetchLanguage() {
    console.log("token", token);
    const response = await api.get("Language");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  async function handleSubmit(values) {
    console.log(values);

    const response = await api.post("Language", values);
    toast.success("Thêm ngôn ngữ mới thành công.");
    setDataSource([...dataSource, values]);
    formVariable.resetFields();
    handleHideModal();
  }

  // async function handleEditLanguage(value) {
  //   const updateCategory = formUpdate.getFieldsValue();
  //   console.log(updateCategory);
  //   api
  //     .put(`Language/${value.id}`, {
  //       name: value.name,
  //     })
  //     .then(() => {
  //       fetchLanguage();
  //       setVisibleEditModal(false);
  //     });
  //   console.log("cuong");
  // }
  // const handleSubmit = async (values) => {
  //   console.log(values.id);

  //   try {
  //     if (values.id) {
  //       //Update
  //       await api.put(
  //         `Language/${values.id}`,
  //         values
  //       );
  //       console.log("ha1");
  //     } else {
  //       await axios.post("https://localhost:7122/api/Language", values);
  //       console.log("ha2");
  //     }
  //     fetchLanguage();
  //     setIsOpen(false);
  //     handleHideModal();
  //   } catch (error) {
  //     alert("fsdf");
  //   }
  // };

  const handleDeleteLanguage = async (id) => {
    console.log(id);

    await api.delete(`Language/${id}`);
    toast.success("Vô hiệu hóa ngôn ngữ thành công.");

    const listAfterDelete = dataSource.filter((language) => language.id != id);

    setDataSource(listAfterDelete);
  };

  function handleShowModal() {
    setIsOpen(true);
  }

  function handleHideModal() {
    setIsOpen(false);
  }

  function handleOk() {
    formVariable.submit();
  }

  useEffect(() => {
    fetchLanguage();
  }, []);
  return (
    <div className="languagePage">
      <Button
        type="primary"
        onClick={() => {
          formVariable.resetFields();
          setIsOpen(true);
        }}
        style={{ marginBottom: "10px" }}
      >
        <PlusOutlined />
        Thêm ngôn ngữ mới
      </Button>
      <Table
        style={{ width: "1200px" }}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>
      <Modal
        open={isOpen}
        title="Thêm ngôn ngữ mới"
        onCancel={handleHideModal}
        onOk={handleOk}
        cancelText="Đóng"
        okText="Thêm"
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            label="Ngôn ngữ"
            name={"name"}
            rules={[
              {
                required: true,
                message: "* vui lòng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={visibleEditModal}
        title="Cập nhật ngôn ngữ"
        onCancel={() => {
          setVisibleEditModal(false);
        }}
        onOk={() => {
          formUpdate.submit();
          // handleEditLanguage(Value);
        }}
      >
        <Form form={formUpdate} onFinish={handleSubmit}>
          <Form.Item
            label="Ngôn ngữ"
            name={"name"}
            rules={[
              {
                required: true,
                message: "*vui lòng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Language;
