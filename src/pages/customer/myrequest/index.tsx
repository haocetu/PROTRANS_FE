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
  Popconfirm,
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

  async function handleEditRequest(status) {
    // console.log(values);
    // const filteredValues = { status: values.status };

    try {
      const response = await api.put(
        `Request/CustomerUpdate?requestId=${idRequest}`,
        { status }
      );
      console.log(response.data.data);
      formUpdate.resetFields();
      setIsOpen(false);
      fetchMyRequest();
      if (status === "Accept") {
        toast.success(
          "Bạn đã chấp nhận báo giá. Đơn hàng sẽ được tạo trong thời gian sớm nhất!"
        );
      } else if (status === "Refuse") {
        toast.info(
          "Bạn đã từ chối thành công. Yêu cầu này sẽ không còn hiệu lực nữa."
        );
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi: ", error);
      toast.error("Có lỗi xảy ra.");
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
        }}
        footer={[
          <Popconfirm
            key="refuse-popconfirm"
            title="Bạn có chắc chắn muốn từ chối không?"
            onConfirm={() => {
              handleEditRequest("Refuse");
              setIsOpen(false);
            }}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="primary" danger>
              Từ chối
            </Button>
          </Popconfirm>,
          <Popconfirm
            key="accept-popconfirm"
            title="Bạn có chắc chắn muốn chấp nhận không?"
            onConfirm={() => {
              handleEditRequest("Accept");
              setIsOpen(false);
            }}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="primary">Chấp nhận</Button>
          </Popconfirm>,
        ]}
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
                      <span>
                        <label>Ngôn ngữ gốc: </label>
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
                      <span>
                        <label>Ngôn ngữ cần dịch: </label>
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
                      <span>
                        <label>Số trang: </label>
                        {formUpdate.getFieldValue([
                          "documents",
                          name,
                          "pageNumber",
                        ])}
                      </span>
                      <span>
                        <label>Số bản cần dịch: </label>
                        {formUpdate.getFieldValue([
                          "documents",
                          name,
                          "numberOfCopies",
                        ])}
                      </span>
                      <span>
                        <label>Loại tài liệu: </label>
                        {(() => {
                          const documentTypeId = formUpdate.getFieldValue([
                            "documents",
                            name,
                            "documentTypeId",
                          ]);
                          if (!documentType || documentType.length === 0) {
                            return "Loading...";
                          }
                          const found = documentType.find(
                            (lang) => lang.value === documentTypeId
                          );
                          return found ? found.label : null;
                        })()}
                      </span>
                      <span>
                        <label>Tệp đính kèm: </label>
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
                    </div>
                    <div className="document-content">
                      <span>
                        <label>Yêu cầu công chứng: </label>
                        {(() => {
                          const notarizationRequest = formUpdate.getFieldValue([
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
                      <span>
                        <label>Loại công chứng: </label>
                        {(() => {
                          const notarizationId = formUpdate.getFieldValue([
                            "documents",
                            name,
                            "notarizationId",
                          ]);
                          if (
                            !notarizationType ||
                            notarizationType.length === 0
                          ) {
                            return "Loading...";
                          }
                          const found = notarizationType.find(
                            (lang) => lang.value === notarizationId
                          );
                          return found ? found.label : "Không có";
                        })()}
                      </span>
                      <span>
                        <label>Số bản công chứng: </label>
                        {formUpdate.getFieldValue([
                          "documents",
                          name,
                          "numberOfNotarizedCopies",
                        ])}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
}

export default MyRequest;
