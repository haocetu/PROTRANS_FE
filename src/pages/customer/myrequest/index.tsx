import {
  AlignRightOutlined,
  CheckCircleFilled,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
  CloseOutlined,
  CopyOutlined,
  EyeTwoTone,
  FormOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  PauseOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Spin,
  Switch,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { RootState } from "../../../redux/rootReducer";
import "./index.css";
import FormItem from "antd/es/form/FormItem";

function MyRequest() {
  const [formUpdate] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [datasource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [idRequest, setIdRequest] = useState("");
  const account = useSelector((store: RootState) => store.accountmanage);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);

  console.log(account.Id);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setActiveButton(status);
  };

  useEffect(() => {
    if (statusFilter === "") {
      setFilteredData(datasource);
    } else {
      const filtered =
        datasource?.filter((order) => order.status === statusFilter) || []; // Kiểm tra datasource không null
      setFilteredData(filtered);
    }
  }, [statusFilter, datasource]);

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
    // {
    //   title: "Tên khách hàng",
    //   dataIndex: "fullName",
    //   key: "fullName",
    // },
    // {
    //   title: "Số điện thoại",
    //   dataIndex: "phoneNumber",
    //   key: "phoneNumber",
    // },
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "address",
    //   key: "address",
    // },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    {
      title: "Thời hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline) => {
        return dayjs(deadline).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      title: "Giá ước tính (VNĐ)",
      dataIndex: "estimatedPrice",
      key: "estimatedPrice",
      render: (text) => {
        return text !== null ? text.toLocaleString("vi-VN") : text;
      },
    },
    {
      title: "Yêu cầu nhận tài liệu",
      dataIndex: "pickUpRequest",
      key: "pickUpRequest",
      render: (pickUpRequest) =>
        pickUpRequest ? (
          <CheckOutlined style={{ color: "green" }} />
        ) : (
          <CloseOutlined style={{ color: "red" }} />
        ),
    },
    {
      title: "Yêu cầu giao hàng",
      dataIndex: "shipRequest",
      key: "shipRequest",
      render: (shipRequest) =>
        shipRequest ? (
          <CheckOutlined style={{ color: "green" }} />
        ) : (
          <CloseOutlined style={{ color: "red" }} />
        ),
    },
    // {
    //   title: "Trạng thái xóa",
    //   dataIndex: "isDeleted",
    //   key: "isDeleted",
    //   render: (isDeleted) => (isDeleted ? "Có" : "Không"),
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case "Waitting":
            return (
              <div className="status-waiting">
                <ClockCircleOutlined />
                &nbsp; Chờ xử lý
              </div>
            );
          case "Quoted":
            return (
              <div className="status-quoted">
                <FormOutlined />
                &nbsp; Đã báo giá
              </div>
            );
          case "Refuse":
            return (
              <div className="status-refused">
                <CloseOutlined />
                &nbsp; Đã từ chối
              </div>
            );
          case "Accept":
            return (
              <div className="status-accepted">
                <CheckOutlined />
                &nbsp; Đã chấp nhận
              </div>
            );
          case "Finish":
            return (
              <div className="status-finished">
                <PauseOutlined />
                &nbsp; Kết thúc
              </div>
            );
          default:
            return status;
        }
      },
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id, data) => {
        if (data.status === "Quoted") {
          return (
            <Space>
              <EyeTwoTone
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setIsOpen(true);
                  setIdRequest(id);
                  const newData = { ...data };
                  console.log(newData);

                  const selectedRequest = datasource.find(
                    (request) => request.id === id
                  );
                  if (selectedRequest) {
                    // Chuyển đổi dữ liệu cho phù hợp với cấu trúc form yêu cầu
                    const newData = {
                      ...selectedRequest,
                      deadline: dayjs(selectedRequest.deadline),
                      documents: selectedRequest.documents || [],
                    };

                    console.log("Dữ liệu được thiết lập:", newData);

                    // Thiết lập giá trị cho form
                    formUpdate.setFieldsValue(newData);
                  }
                }}
              />
            </Space>
          );
        } else {
          // Nếu status không phải "Quoted", không render cột này
          return null;
        }
      },
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  async function handleEditRequest(values) {
    console.log(values);
    // const updateRequest = formUpdate.getFieldsValue();
    // updateRequest.pickUpRequest = updateRequest.pickUpRequest ? true : false;
    // updateRequest.shipRequest = updateRequest.shipRequest ? true : false;

    try {
      const response = await api.put(
        `Request/CustomerUpdate?requestId=${idRequest}`,
        values
      );
      console.log(response.data.data);
      formUpdate.resetFields();
      setIsOpen(false);
      fetchMyRequest();
      toast.success("Xác nhận đơn hàng thành công.");
    } catch (error) {
      console.error("Error updating request:", error);
    }
  }

  async function fetchMyRequest() {
    setLoading(true);
    const response = await api.get(
      `Request/GetByCustomerId?customerId=${account.Id}`
    );
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
    setFilteredData(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMyRequest();
  }, []);
  return (
    <div className="myrequest">
      <h1>YÊU CẦU CỦA BẠN</h1>
      <div>
        <Button
          className={`filter-button ${activeButton === "" ? "active" : ""}`}
          onClick={() => handleStatusFilter("")}
        >
          <AlignRightOutlined />
          Tất cả
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Waitting" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Waitting")}
        >
          <ClockCircleOutlined />
          Chờ xử lý
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Quoted" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Quoted")}
        >
          <FormOutlined />
          Đã báo giá
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Refuse" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Refuse")}
        >
          <CloseOutlined />
          Đã từ chối
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Accept" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Accept")}
        >
          <CheckOutlined />
          Đã chấp nhận
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Finish" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Finish")}
        >
          <PauseOutlined />
          Kết thúc
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={{
          spinning: loading,
          indicator: <Spin />,
        }}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          formUpdate.resetFields();
        }}
        onOk={() => {
          formUpdate.submit();
        }}
        closable={false}
        width={1200}
      >
        <Form form={formUpdate} onFinish={handleEditRequest}>
          <Form.List name="documents">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <div key={key}>
                    <Divider
                      orientation="left"
                      style={{ borderColor: "black" }}
                    >
                      Tài liệu {index + 1}
                    </Divider>
                    <div className="document-content">
                      <Form.Item
                        {...restField}
                        name={[name, "firstLanguageId"]}
                        fieldKey={[fieldKey, "firstLanguageId"]}
                        label="Ngôn ngữ gốc"
                      >
                        <span>
                          {(() => {
                            const firstLanguageId = formUpdate.getFieldValue([
                              "documents",
                              name,
                              "firstLanguageId",
                            ]);
                            if (!language || language.length === 0) {
                              return "Loading...";
                            }
                            const foundLanguage = language.find(
                              (lang) => lang.value === firstLanguageId
                            );
                            return foundLanguage ? foundLanguage.label : null;
                          })()}
                        </span>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "secondLanguageId"]}
                        fieldKey={[fieldKey, "secondLanguageId"]}
                        label="Ngôn ngữ cần dịch"
                      >
                        <span>
                          {(() => {
                            const secondLanguageId = formUpdate.getFieldValue([
                              "documents",
                              name,
                              "secondLanguageId",
                            ]);
                            if (!language || language.length === 0) {
                              return "Loading...";
                            }
                            const foundLanguage = language.find(
                              (lang) => lang.value === secondLanguageId
                            );
                            return foundLanguage ? foundLanguage.label : null;
                          })()}
                        </span>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "pageNumber"]}
                        fieldKey={[fieldKey, "pageNumber"]}
                        label="Số trang"
                      >
                        <span>
                          {formUpdate.getFieldValue([
                            "documents",
                            name,
                            "pageNumber",
                          ])}
                        </span>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "numberOfCopies"]}
                        fieldKey={[fieldKey, "numberOfCopies"]}
                        label="Số bản cần dịch"
                      >
                        <span>
                          {formUpdate.getFieldValue([
                            "documents",
                            name,
                            "numberOfCopies",
                          ])}
                        </span>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "documentTypeId"]}
                        fieldKey={[fieldKey, "documentTypeId"]}
                        rules={[
                          {
                            required: false,
                            message: "* vui lòng chọn",
                          },
                        ]}
                        label="Loại tài liệu"
                      >
                        <span>
                          {(() => {
                            const documentTypeId = formUpdate.getFieldValue([
                              "documents",
                              name,
                              "documentTypeId",
                            ]);
                            if (!documentType || documentType.length === 0) {
                              return "Loading...";
                            }
                            const foundLanguage = documentType.find(
                              (lang) => lang.value === documentTypeId
                            );
                            return foundLanguage ? foundLanguage.label : null;
                          })()}
                        </span>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "urlPath"]}
                        fieldKey={[fieldKey, "urlPath"]}
                        label="Tệp đính kèm"
                      >
                        <span>
                          {(() => {
                            const urlPath = formUpdate.getFieldValue([
                              "documents",
                              name,
                              "urlPath",
                            ]);
                            return urlPath ? (
                              <a
                                href={urlPath}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <CopyOutlined />
                              </a>
                            ) : null;
                          })()}
                        </span>
                      </Form.Item>
                    </div>
                    <div className="document-content">
                      <Form.Item
                        {...restField}
                        name={[name, "notarizationRequest"]}
                        fieldKey={[fieldKey, "notarizationRequest"]}
                        label="Yêu cầu công chứng"
                      >
                        <span>
                          {(() => {
                            const notarizationRequest =
                              formUpdate.getFieldValue([
                                "documents",
                                name,
                                "notarizationRequest",
                              ]);
                            return notarizationRequest ? (
                              <CheckCircleFilled style={{ color: "green" }} />
                            ) : (
                              <CloseCircleFilled style={{ color: "red" }} />
                            );
                          })()}
                        </span>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "notarizationId"]}
                        fieldKey={[fieldKey, "notarizationId"]}
                        rules={[
                          {
                            required: false,
                            message: "* vui lòng chọn",
                          },
                        ]}
                        label="Loại công chứng"
                      >
                        <Select
                          options={notarizationType}
                          placeholder="Loại công chứng"
                          style={{ width: "400px" }}
                          disabled={
                            !formUpdate.getFieldValue([
                              "documents",
                              name,
                              "notarizationRequest",
                            ])
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "numberOfNotarizedCopies"]}
                        fieldKey={[fieldKey, "numberOfNotarizedCopies"]}
                        label="Số bản công chứng"
                      >
                        <span>
                          {formUpdate.getFieldValue([
                            "documents",
                            name,
                            "numberOfNotarizedCopies",
                          ])}
                        </span>
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>
          <Form.Item
            label="Trạng thái"
            name={"status"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Select placeholder="Trạng thái">
              <Select.Option value="Accept">Chấp nhận</Select.Option>
              <Select.Option value="Refuse">Từ chối</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MyRequest;
