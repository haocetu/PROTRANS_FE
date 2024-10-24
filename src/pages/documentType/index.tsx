import React, { useEffect, useState } from "react";
import { Col, Row, Switch } from "antd";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  InputNumber,
  Select,
  Divider,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
import { toast } from "react-toastify";

const DynamicDocumentsForm = () => {
  const [form] = useForm();
  const [notarizationType, setNotarizationType] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [language, setLanguage] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotarizationType = async () => {
    const response = await api.get("Notarization");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((notarization) => ({
      value: notarization.id,
      label: <span>{notarization.name}</span>,
    }));

    setNotarizationType(list);
  };

  useEffect(() => {
    fetchNotarizationType();
  }, []);

  //----------------------------------------

  const fetchDocumentType = async () => {
    const response = await api.get("DocumentType");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((Document) => ({
      value: Document.id,
      label: <span>{Document.name}</span>,
    }));

    setDocumentType(list);
  };

  useEffect(() => {
    fetchDocumentType();
  }, []);

  //----------------------------------------------------

  const fetchLanguages = async () => {
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
    fetchLanguages();
  }, []);

  //-------------------------------------------------

  async function handleSubmit(values) {
    console.log("Order", values);

    try {
      const response = await api.post("Order", values, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log(response.data.data);
      toast.success("Order created successfully!");
      form.resetFields();
    } catch (error) {
      toast.error("Create Order Fail");
    }
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        fullName: "",
        phoneNumber: "",
        address: "",
        documents: [
          {
            firstLanguageId: null,
            secondLanguageId: null,
            urlPath: null,
            fileType: null,
            pageNumber: null,
            numberOfCopies: 1,
            notarizationRequest: false,
            numberOfNotarizatedCopies: null,
            notarizationId: null,
            documentTypeId: null,
          },
        ],
      }}
    >
      <Row gutter={16}>
        {" "}
        <Col span={8}>
          {" "}
          <Form.Item
            label="Tên khách hàng"
            name="fullName"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input placeholder="Tên khách hàng" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="documents">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "block", marginBottom: 8 }}
                align="baseline"
              >
                <Divider orientation="left" style={{ borderColor: "black" }}>
                  Tài liệu
                </Divider>
                <Row gutter={16}>
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      name={[name, "firstLanguageId"]}
                      fieldKey={[fieldKey, "firstLanguageId"]}
                      rules={[
                        {
                          required: true,
                          message: "First Language ID is required",
                        },
                      ]}
                      label="Ngôn ngữ gốc"
                    >
                      <Select options={language} placeholder="Ngôn ngữ gốc" />
                    </Form.Item>
                  </Col>

                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      name={[name, "secondLanguageId"]}
                      fieldKey={[fieldKey, "secondLanguageId"]}
                      rules={[
                        {
                          required: true,
                          message: "Second Language ID is required",
                        },
                      ]}
                      label="Ngôn ngữ cần dịch"
                    >
                      <Select
                        options={language}
                        placeholder="Ngôn ngữ cần dịch"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      name={[name, "documentTypeId"]}
                      fieldKey={[fieldKey, "documentTypeId"]}
                      rules={[
                        {
                          required: true,
                          message: "Document Type ID is required",
                        },
                      ]}
                      label="Loại tài liệu"
                    >
                      <Select
                        options={documentType}
                        placeholder="Loại tài liệu"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      {...restField}
                      name={[name, "pageNumber"]}
                      fieldKey={[fieldKey, "pageNumber"]}
                      rules={[
                        { required: true, message: "Page Number is required" },
                      ]}
                      label="Số trang"
                    >
                      <InputNumber
                        min={1}
                        placeholder="Số trang"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "fileType"]}
                      fieldKey={[fieldKey, "fileType"]}
                      rules={[
                        { required: true, message: "File Type is required" },
                      ]}
                      label="Loại tệp"
                    >
                      <Select placeholder="Loại tệp">
                        <Select.Option value="Hard">Hard</Select.Option>
                        <Select.Option value="Soft">Soft</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "numberOfCopies"]}
                      fieldKey={[fieldKey, "numberOfCopies"]}
                      rules={[
                        {
                          required: true,
                          message: "Number of Copies is required",
                        },
                      ]}
                      label="Số bản cần dịch"
                    >
                      <InputNumber
                        min={1}
                        placeholder="Số bản cần dịch"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "urlPath"]}
                      fieldKey={[fieldKey, "urlPath"]}
                      rules={[
                        { required: true, message: "URL Path is required" },
                      ]}
                      label="Đường dẫn"
                    >
                      <Input placeholder="Đường dẫn" />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      {...restField}
                      name={[name, "notarizationRequest"]}
                      valuePropName="checked"
                      fieldKey={[fieldKey, "notarizationRequest"]}
                      label="Công chứng"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      {...restField}
                      name={[name, "notarizationId"]}
                      fieldKey={[fieldKey, "notarizationId"]}
                      rules={[
                        {
                          required: true,
                          message: "Notarization ID is required",
                        },
                      ]}
                      label="Loại công chứng"
                    >
                      <Select
                        options={notarizationType}
                        placeholder="Loại công chứng"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "numberOfNotarizatedCopies"]}
                      fieldKey={[fieldKey, "numberOfNotarizatedCopies"]}
                      rules={[
                        {
                          required: true,
                          message: "Number of Notarized Copies is required",
                        },
                      ]}
                      label="Số bản công chứng"
                    >
                      <InputNumber
                        min={0}
                        placeholder="Số bản công chứng"
                        style={{ width: "100%" }}
                      />
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

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
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

      <Form.Item style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" htmlType="submit" style={{ width: "160px" }}>
          Tạo đơn hàng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicDocumentsForm;
