import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Value } from "sass";

function Notarization() {
  const [formVariable] = useForm();
  const [formUpdate] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "TypeNotarization",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Is Deleted",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (isDeleted ? "Yes" : "No"),
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
              SetidCategory(id);
              formVariable.setFieldsValue(data);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  async function fetchNotarization() {
    const response = await axios.get("https://localhost:7122/api/Notarization");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  async function handleSubmit(values) {
    console.log(values);

    const response = await axios.post(
      "https://localhost:7122/api/Notarization",
      values
    );
    setDataSource([...dataSource, values]);
    formVariable.resetFields();
    handleHideModal();
  }

  async function handleEditLanguage(value) {
    const updateCategory = formUpdate.getFieldsValue();
    console.log(updateCategory);
    axios
      .put(`https://localhost:7122/api/Language/${value.id}`, {
        name: value.name,
      })
      .then(() => {
        fetchLanguage();
        setVisibleEditModal(false);
      });
    console.log("cuong");
  }

  const handleDeleteLanguage = async (id) => {
    console.log(id);

    await axios.delete(`https://localhost:7122/api/Notarization/${id}`);

    const listAfterDelete = dataSource.filter(
      (notarization) => notarization.id != id
    );

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
    fetchNotarization();
  }, []);
  return (
    <div className="languagePage">
      <Button
        type="primary"
        onClick={() => {
          formVariable.resetFields();
          setIsOpen(true);
        }}
      >
        Add New Notarization
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        title="Add New Notarization"
        onCancel={handleHideModal}
        onOk={handleOk}
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            label="TypeNotarization"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please Input TypeNotarization",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name={"price"}
            rules={[
              {
                required: true,
                message: "Please Input Language",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={visibleEditModal}
        title="Update Langauge"
        onCancel={() => {
          setVisibleEditModal(false);
        }}
        onOk={() => {
          formUpdate.submit();
          handleEditLanguage(Value);
        }}
      >
        <Form form={formUpdate} onFinish={handleSubmit}>
          <Form.Item
            label="Langeuage Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please Input Language",
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

export default Notarization;
