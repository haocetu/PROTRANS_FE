import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  InputNumber,
  Select,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
import { toast } from "react-toastify";

const DynamicDocumentsForm = () => {
  const [form] = useForm();
  const [notarizationType, setNotarizationType] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [language, setLanguage] = useState([]);

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
      const response = await api.post("Order", values);
      console.log(response.data.data);
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
            firstLanguageId: "",
            secondLanguageId: "",
            urlPath: "",
            fileType: "",
            pageNumber: 0,
            numberOfCopies: 0,
            notarizationRequest: false,
            numberOfNotarizatedCopies: 0,
            notarizationId: "",
            documentTypeId: "",
          },
        ],
      }}
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name!" }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: "Please enter your phone number!" }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please enter your address!" }]}
      >
        <Input placeholder="Address" />
      </Form.Item>

      <Form.List name="documents">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
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
                >
                  <Select options={language} />
                </Form.Item>

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
                >
                  <Select options={language} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "urlPath"]}
                  fieldKey={[fieldKey, "urlPath"]}
                  rules={[{ required: true, message: "URL Path is required" }]}
                >
                  <Input placeholder="URL Path" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "fileType"]}
                  fieldKey={[fieldKey, "fileType"]}
                  rules={[{ required: true, message: "File Type is required" }]}
                >
                  <Input placeholder="File Type" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "pageNumber"]}
                  fieldKey={[fieldKey, "pageNumber"]}
                  rules={[
                    { required: true, message: "Page Number is required" },
                  ]}
                >
                  <InputNumber placeholder="Page Number" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "numberOfCopies"]}
                  fieldKey={[fieldKey, "numberOfCopies"]}
                  rules={[
                    { required: true, message: "Number of Copies is required" },
                  ]}
                >
                  <InputNumber placeholder="Number of Copies" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "notarizationRequest"]}
                  valuePropName="checked"
                  fieldKey={[fieldKey, "notarizationRequest"]}
                >
                  <Checkbox>Notarization Request</Checkbox>
                </Form.Item>

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
                >
                  <InputNumber placeholder="Number of Notarized Copies" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "notarizationId"]}
                  fieldKey={[fieldKey, "notarizationId"]}
                  rules={[
                    { required: true, message: "Notarization ID is required" },
                  ]}
                >
                  <Select options={notarizationType} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "documentTypeId"]}
                  fieldKey={[fieldKey, "documentTypeId"]}
                  rules={[
                    { required: true, message: "Document Type ID is required" },
                  ]}
                >
                  <Select options={documentType} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Document
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicDocumentsForm;
