import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

function QuotePrice() {
  const [formVariable] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [language, setLanguage] = useState([]);

  const fetchLanguages = async () => {
    const response = await axios.get(`https://localhost:7122/api/Language`);
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
      title: "FirstLanguage",
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
      title: "SecondLanguage",
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
      title: "PricePerPage",
      dataIndex: "pricePerPage",
      key: "pricePerPage",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Space>
          <Popconfirm
            title="Delete Category"
            description="Are you sure to delete this language?"
            onConfirm={() => handleDeleteLanguage(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            style={{ background: "orange" }}
            onClick={() => {
              setVisibleEditModal(true);
              formVariable.setFieldsValue(data);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  async function fetchQuotePrice() {
    const response = await axios.get("https://localhost:7122/api/QuotePrice");
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
      const response = await axios.post(
        "https://localhost:7122/api/QuotePrice",
        values
      );
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
      >
        Add New QuotePrice
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        title="Add New QuotePrice"
        onCancel={() => setIsOpen(false)}
        onOk={handleOk}
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            label="First Language"
            name={"firstLanguageId"}
            rules={[
              {
                required: true,
                message: "Please Input First Language",
              },
            ]}
          >
            <Select options={language} />
          </Form.Item>
          <Form.Item
            label="Second Language "
            name={"secondLanguageId"}
            rules={[
              {
                required: true,
                message: "Please Input Second Language",
              },
            ]}
          >
            <Select options={language} />
          </Form.Item>
          <Form.Item
            label="Price Page"
            name={"pricePerPage"}
            rules={[
              {
                required: true,
                message: "Please Input Price Per Page",
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
