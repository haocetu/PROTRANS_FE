import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { EditOutlined, PlusOutlined, StopOutlined } from "@ant-design/icons";

function QuotePrice() {
  const [formVariable] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [language, setLanguage] = useState([]);

  const fetchLanguages = async () => {
    const response = await api.get(`Language`);
    const data = response.data.data;
    console.log({ data });

    const list = data.map((language) => ({
      value: language.id,
      label: <span>{language.name}</span>,
    }));

    setLanguage(list);
  };
  // const fetchLanguages = async () => {
  //   const response = await axios.get(`https://localhost:7122/api/Language`);
  //   const data = response.data.data;
  //   console.log({ data });

  //   const list = data.flatMap((language) => [
  //     {
  //       value: language.firstLanguageId,
  //       label: <span>{language.name}</span>,
  //     },
  //     {
  //       value: language.secondLanguageId,
  //       label: <span>{language.name}</span>,
  //     },
  //   ]);

  //   console.log(list);
  //   setLanguage(list);
  // };

  useEffect(() => {
    fetchLanguages();
  }, []);

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
      title: "Ngôn ngữ gốc",
      dataIndex: "firstLanguageId", // Use firstLanguageId from QuotePrice data
      key: "firstLanguageId",
      render: (firstLanguageId) => {
        // Check if category is available and initialized
        if (!language || language.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const foundLanguage = language.find(
          (lang) => lang.value === firstLanguageId
        );
        return foundLanguage ? foundLanguage.label : "Unknown Category";
      },
    },
    {
      title: "Ngôn ngữ cần dịch",
      dataIndex: "secondLanguageId", // Use secondLanguageId from QuotePrice data
      key: "secondLanguageId",
      render: (secondLanguageId) => {
        // Check if category is available and initialized
        if (!language || language.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const foundLanguage = language.find(
          (lang) => lang.value === secondLanguageId
        );
        return foundLanguage ? foundLanguage.label : "Unknown Category";
      },
    },
    {
      title: "Giá (VNĐ/trang)",
      dataIndex: "pricePerPage",
      key: "pricePerPage",
      render: (text) => {
        return text !== null ? text.toLocaleString("vi-VN") : text;
      },
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Space>
          <Popconfirm
            title="Delete Category"
            description="Are you sure to delete this language?"
            // onConfirm={() => handleDeleteLanguage(id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Ngưng dịch">
              <Button type="primary" danger>
                <StopOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Cập nhật">
            <Button
              type="primary"
              style={{ background: "orange" }}
              onClick={() => {
                // setVisibleEditModal(true);
                formVariable.setFieldsValue(data);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
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

  async function fetchQuotePrice() {
    const response = await api.get("QuotePrice");
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchQuotePrice();
  }, []);

  async function handleSubmit(values) {
    console.log(values);
    try {
      console.log(values);
      const response = await api.post("QuotePrice", values);
      console.log(response.data.data);
      setDataSource([...dataSource, response.data.data]);
      formVariable.resetFields();
      setIsOpen(false);
    } catch (error) {
      console.log("Create fail");
    }
  }

  function handleOk() {
    formVariable.submit();
  }

  return (
    <div className="quotePricePage">
      <Button
        type="primary"
        onClick={() => {
          formVariable.resetFields();
          setIsOpen(true);
        }}
        style={{ marginBottom: "10px" }}
      >
        <PlusOutlined />
        Tạo báo giá mới
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>
      <Modal
        open={isOpen}
        title="Tạo báo giá mới"
        onCancel={() => setIsOpen(false)}
        onOk={handleOk}
        cancelText="Đóng"
        okText="Tạo"
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            label="Ngôn ngữ gốc"
            name={"firstLanguageId"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Select options={language} />
          </Form.Item>
          <Form.Item
            label="Ngôn ngữ cần dịch"
            name={"secondLanguageId"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Select options={language} />
          </Form.Item>
          <Form.Item
            label="Giá"
            name={"pricePerPage"}
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
    </div>
  );
}

export default QuotePrice;
