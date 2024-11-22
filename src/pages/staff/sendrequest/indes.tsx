import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import uploadFileFire from "../../../utils/upload";
import "./index.scss";

function SendRequest() {
  const [formVariable] = useForm();
  const [language, setLanguage] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);
  const [documentType, setDocumentType] = useState([]);

  //--------------------------------
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    // onChange(info) {
    //   if (info.file.status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === "done") {
    //     toast.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     toast.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  //-----------------------------------------------
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

  //----------------------------------------------
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

  //----------------------------------------------
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

  async function handleSubmit(values) {
    console.log(values);

    // const originFileObj =
    //   values.documents[0]?.urlPath?.file?.originFileObj || null;

    // if (originFileObj) {
    //   const upFile = await uploadFileFire(originFileObj);
    //   values.documents[0].urlPath = upFile;
    // }

    for (let i = 0; i < values.documents.length; i++) {
      const document = values.documents[i];
      if (document?.urlPath?.file?.originFileObj) {
        const originFileObj = document.urlPath.file.originFileObj;
        const upFile = await uploadFileFire(originFileObj); // Upload each file individually
        values.documents[i].urlPath = upFile; // Ensure each document gets a unique URL
      }
    }

    try {
      const response = await api.post("Request", values);
      console.log(response.data.data);
      toast.success("Gửi yêu cầu thành công.");
      formVariable.resetFields();
    } catch (error) {
      toast.error("Gửi yêu cầu thất bại.");
    }
  }

  return (
    <div className="sendrequest">
      <div className="sendrequesttop">Gửi yêu cầu dịch thuật</div>
      <div className="sendrequestmiddle">
        <Form
          form={formVariable}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            deadline: "",
            phoneNumber: "",
            address: "",
            documents: [
              {
                firstLanguageId: null,
                secondLanguageId: null,
                urlPath: null,
                fileType: "Soft",
                pageNumber: 1,
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
                label="Thời gian yêu cầu"
                name="deadline"
                rules={[
                  { required: true, message: "Vui lòng chọn thời gian yêu cầu!" },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={4}>
              <Form.Item
                label="Yêu cầu nhận tài liệu"
                name="pickUpRequest"
                valuePropName="checked"
                rules={[
                  {
                    required: false,
                    message: "vui lòng chọn nhận tài liệu",
                  },
                ]}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Yêu cầu giao hàng"
                name="shipRequest"
                valuePropName="checked"
                rules={[
                  { required: false, message: "vui lòng chọn ship tài liệu" },
                ]}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={false}
                />
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
                    <Divider
                      orientation="left"
                      style={{ borderColor: "black" }}
                    >
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
                          <Select
                            options={language}
                            placeholder="Ngôn ngữ gốc"
                          />
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
                            {
                              required: true,
                              message: "Page Number is required",
                            },
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
                          label="Tệp"
                        >
                          {/* <Input placeholder="Đường dẫn" /> */}
                          <Upload {...props}>
                            <Button icon={<UploadOutlined />}>
                              Tải lên
                            </Button>
                          </Upload>
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

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit" style={{ width: "160px" }}>
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SendRequest;
