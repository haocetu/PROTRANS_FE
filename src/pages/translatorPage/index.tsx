import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
  Upload,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useForm } from "antd/es/form/Form";
import {
  CarryOutOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  EditOutlined,
  EyeOutlined,
  EyeTwoTone,
  FileOutlined,
  FileSyncOutlined,
  FolderOutlined,
  FormOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import uploadFileFire from "../../utils/upload";
import { Value } from "sass";

function Translator() {
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
  };
  const [formVariable] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const UserAccount = useSelector((store: RootState) => store.accountmanage);
  const UserAccount2 = useSelector(
    (store: RootState) => store.accountmanage.Id
  );

  const [language, setLanguage] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  console.log(UserAccount);

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

  useEffect(() => {
    fetchLanguages();
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
      title: "Thời hạn",
      dataIndex: "deadline",
      key: "deadline",
      sorter: (a, b) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix(),
      render: (deadline) => {
        return dayjs(deadline).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      title: "Chi tiết",
      dataIndex: "document",
      key: "document",
      align: "center" as const,
      render: (document) => (
        <div style={{ textAlign: "center" as const }}>
          <Tooltip title="Xem chi tiết tài liệu">
            <EyeOutlined
              style={{
                cursor: "pointer",
                fontSize: selectedDocumentId === document.id ? "24px" : "18px",
                color: selectedDocumentId === document.id ? "#1890ff" : "black",
              }}
              onClick={() => {
                setSelectedDocument(document);
                setSelectedDocumentId(document.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "Translating" ? (
          <div className="status-translating">
            <FileSyncOutlined />
            &nbsp; Đang dịch
          </div>
        ) : (
          <span>{status}</span>
        ),
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      align: "center" as const,
      render: (id, data) => (
        <Popconfirm
          title="Bạn có chắc chắn đã hoàn thành việc dịch thuật?"
          onConfirm={() => {
            // handleCompleteDocument(id);
            setIsOpen(true);
          }}
          okText="Có"
          cancelText="Hủy"
        >
          <Tooltip title="Hoàn thành dịch">
            <button
              style={{
                color: "white",
                backgroundColor: "green",
                padding: 5,
                borderRadius: 8,
                borderWidth: 0,
                fontSize: 12,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <EditOutlined style={{ fontSize: "18px", fontWeight: "bold" }} />
            </button>
          </Tooltip>
        </Popconfirm>
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

  async function handleCompleteDocument() {
    // try {
    //   let uploadedUrl = "";
    //   if (urlPath) {
    //     uploadedUrl = await uploadFileFire(urlPath);
    //   }
    //   console.log(uploadedUrl);
    //   const response = await api.put(
    //     `AssignmentTranslation/Complete?id=${id}&urlPath=${uploadedUrl}`
    //   );
    //   console.log(response.data.data);
    //   toast.success("Đã cập nhật thành công.");
    //   fetchAssignment();
    // } catch (error) {
    //   toast.error("Cập nhật thất bại.");
    // }
  }

  const fetchAssignment = async () => {
    console.log(UserAccount2);
    try {
      setLoading(true);
      const response = await api.get(
        `AssignmentTranslation/GetTranslating?id=${UserAccount2}`
      );

      setDataSource(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UserAccount2) {
      fetchAssignment();
    }
  }, [UserAccount2]);

  return (
    <div className="container">
      <div className="document-details">
        <h1>CHI TIẾT TÀI LIỆU</h1>
        {selectedDocument ? (
          <div className="details-grid">
            <div className="details-row">
              <span>Ngôn ngữ gốc</span>
              <span>
                :{" "}
                {(() => {
                  const firstLanguageId = selectedDocument.firstLanguageId;
                  if (!language || language.length === 0) {
                    return "Loading...";
                  }
                  const foundLanguage = language.find(
                    (lang) => lang.value === firstLanguageId
                  );
                  return foundLanguage ? foundLanguage.label : null;
                })()}
              </span>
            </div>
            <div className="details-row">
              <span>Ngôn ngữ cần dịch</span>
              <span>
                :{" "}
                {(() => {
                  const firstLanguageId = selectedDocument.secondLanguageId;
                  if (!language || language.length === 0) {
                    return "Loading...";
                  }
                  const foundLanguage = language.find(
                    (lang) => lang.value === firstLanguageId
                  );
                  return foundLanguage ? foundLanguage.label : null;
                })()}
              </span>
            </div>
            <div className="details-row">
              <span>Mã tài liệu</span>
              <span>: {selectedDocument.code}</span>
            </div>
            <div className="details-row">
              <span>Loại tài liệu</span>
              <span>
                :{" "}
                {(() => {
                  const documentTypeId = selectedDocument.documentTypeId;
                  if (!documentType || documentType.length === 0) {
                    return "Loading...";
                  }
                  const foundLanguage = documentType.find(
                    (lang) => lang.value === documentTypeId
                  );
                  return foundLanguage ? foundLanguage.label : null;
                })()}
              </span>
            </div>
            <div className="details-row">
              <span>Số trang</span>
              <span>: {selectedDocument.pageNumber}</span>
            </div>
            <div className="details-row">
              <span>Số bản cần dịch</span>
              <span>: {selectedDocument.numberOfCopies}</span>
            </div>
            <div className="details-row">
              <span>Yêu cầu công chứng</span>
              <span>
                : {selectedDocument.notarizationRequest ? "Có" : "Không"}
              </span>
            </div>
            <div className="details-row">
              <span>Loại công chứng</span>
              <span>
                :{" "}
                {(() => {
                  const notarizationId = selectedDocument.notarizationId;
                  if (!notarizationType || notarizationType.length === 0) {
                    return "Loading...";
                  }
                  const foundLanguage = notarizationType.find(
                    (lang) => lang.value === notarizationId
                  );
                  return foundLanguage ? foundLanguage.label : "Không";
                })()}
              </span>
            </div>
            <div className="details-row">
              <span>Số bản công chứng</span>
              <span>: {selectedDocument.numberOfNotarizedCopies}</span>
            </div>
            <div className="details-row">
              <span>Tệp đính kèm</span>
              <span>
                :{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
                >
                  Xem
                </a>
                <Modal
                  closable={false}
                  visible={isModalVisible}
                  onCancel={closeModal}
                  footer={null}
                  width="80%"
                >
                  <iframe
                    src={selectedDocument.urlPath}
                    style={{
                      width: "100%",
                      height: "80vh",
                      border: "none",
                    }}
                    title="Xem tài liệu"
                  ></iframe>
                </Modal>
              </span>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>
            Chọn một tài liệu để xem chi tiết
          </p>
        )}
      </div>
      <Table
        style={{ width: "50%" }}
        columns={columns}
        loading={{
          spinning: loading,
          indicator: <Spin />,
        }}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>

      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={() => {
          formVariable.resetFields();
          setIsOpen(false);
        }}
        title="Gửi tệp đã dịch"
        // footer={[
        //   <Space>
        //     <Button
        //       key="cancel"
        //       onClick={() => {
        //         formVariable.resetFields();
        //         setIsOpen(false);
        //       }}
        //       style={{
        //         padding: "5px 15px",
        //         backgroundColor: "red",
        //         border: "1px solid #d9d9d9",
        //         borderRadius: "5px",
        //         cursor: "pointer",
        //         color: "white",
        //       }}
        //     >
        //       Hủy
        //     </Button>
        //     ,
        //     <Button
        //       key="cancel"
        //       onClick={() => {
        //         formVariable.submit();
        //         setIsOpen(false);
        //       }}
        //       style={{
        //         padding: "5px 25px",
        //         backgroundColor: "Green",
        //         border: "1px solid #d9d9d9",
        //         borderRadius: "5px",
        //         cursor: "pointer",
        //         color: "white",
        //       }}
        //     >
        //       Gửi
        //     </Button>
        //     ,
        //   </Space>,
        // ]}
      >
        <Form form={formVariable} onFinish={() => handleCompleteDocument()}>
          <Form.Item
            label="Tệp"
            name={"urlPath"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Translator;
