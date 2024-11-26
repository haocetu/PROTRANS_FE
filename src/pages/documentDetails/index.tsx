import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useParams } from "react-router-dom";
import { ContainerOutlined, FileZipOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function DocumentDetails() {
  const [formVariable] = useForm();
  const { id } = useParams();
  const [document, setDocument] = useState<Document[]>();
  const [translator, setTranslator] = useState([]);
  const [language, setLanguage] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectsecondlanguageId, setSelectsecondlanguageId] = useState(null);
  const [selectfirstlanguageId, setSelectfirstlanguageId] = useState(null);
  const [dataAssignTrans, setDataAssignTrans] = useState([]);
  //---------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  //------------------------------------------------
  const fetchNotarizationType = async () => {
    const response = await api.get("Notarization");
    setIsFetching(false);
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

  //-----------------------------------------
  const fetchLanguages = async () => {
    const response = await api.get("Language");
    setIsFetching(false);
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

  //-----------------------------------------------------

  const fetchDocumentType = async () => {
    const response = await api.get("DocumentType");
    setIsFetching(false);
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

  //--------------------------------------------------------
  const columns = [
    {
      title: "Ngôn Ngữ Gốc",
      dataIndex: "firstLanguageId",
      key: "firstLanguageId",
      render: (firstLanguageId) => {
        // Check if category is available and initialized
        if (!language || language.length === 0) return null;

        // Find the category by ID and return its name
        const foundLanguage = language.find(
          (lang) => lang.value === firstLanguageId
        );
        return foundLanguage ? foundLanguage.label : null;
      },
    },
    {
      title: "Ngôn Ngữ Dịch",
      dataIndex: "secondLanguageId",
      key: "secondLanguageId",
      render: (secondLanguageId) => {
        // Check if category is available and initialized
        if (!language || language.length === 0) return null;

        // Find the category by ID and return its name
        const foundLanguage = language.find(
          (lang) => lang.value === secondLanguageId
        );
        return foundLanguage ? foundLanguage.label : null;
      },
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tệp",
      dataIndex: "urlPath",
      key: "urlPath",
      render: (urlPath) => {
        // Check if there is a URL to render
        return urlPath ? (
          <a href={urlPath} target="_blank" rel="noopener noreferrer">
            <FileZipOutlined />
          </a>
        ) : null;
      },
    },
    {
      title: "Loại Tài Liệu",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Số Trang",
      dataIndex: "pageNumber",
      key: "pageNumber",
    },
    {
      title: "Số Trang Công Chứng",
      dataIndex: "numberOfCopies",
      key: "numberOfCopies",
    },
    {
      title: "Yêu Cầu Công Chứng",
      dataIndex: "notarizationRequest",
      key: "notarizationRequest",
      render: (notarizationRequest) => (notarizationRequest ? "Có" : "Không"),
    },
    {
      title: "Số bản Photo Công Chứng",
      dataIndex: "numberOfNotarizedCopies",
      key: "numberOfNotarizedCopies",
    },
    {
      title: "Loại Công Chứng",
      dataIndex: "notarizationId",
      key: "notarizationId",
      render: (notarizationId) => {
        // Check if category is available and initialized
        if (!notarizationType || notarizationType.length === 0) return null;

        // Find the category by ID and return its name
        const foundnotarizationType = notarizationType.find(
          (lang) => lang.value === notarizationId
        );
        return foundnotarizationType ? foundnotarizationType.label : null;
      },
    },
    {
      title: "Loại Tài Liệu",
      dataIndex: "documentTypeId",
      key: "documentTypeId",
      render: (documentTypeId) => {
        // Check if category is available and initialized
        if (!documentType || documentType.length === 0) return null;

        // Find the category by ID and return its name
        const founddocumentType = documentType.find(
          (lang) => lang.value === documentTypeId
        );
        return founddocumentType ? founddocumentType.label : null;
      },
    },
    {
      title: "Trạng Thái Dịch",
      dataIndex: "translationStatus",
      key: "translationStatus",
    },
    {
      title: "Trạng Thái Công Chứng",
      dataIndex: "notarizationStatus",
      key: "notarizationStatus",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, data) =>
        data.translationStatus === "Processing" &&
        (data.notarizationStatus === "PickedUp" ||
          data.notarizationStatus === "None") ? (
          <ContainerOutlined
            onClick={() => {
              console.log(data.firstLanguageId);
              console.log(data.secondLanguageId);
              setSelectfirstlanguageId(data.firstLanguageId);
              setSelectsecondlanguageId(data.secondLanguageId);
              setSelectedDocumentId(id);
              setIsOpen(true);
            }}
          />
        ) : null,
    },
  ];

  // async function fetchDocument() {
  //   const response = await api.get("Document");
  //   console.log(response.data.data);
  //   setDocument(response.data.data);
  // }

  // useEffect(() => {
  //   fetchDocument();
  // }, []);

  //----------------------Điều Phối-----------------------------------//
  const fetchTranslator = async (
    selectfirstlanguageId,
    selectsecondlanguageId
  ) => {
    console.log(selectfirstlanguageId);
    console.log(selectsecondlanguageId);
    try {
      const response = await api.get(
        `Account/GetBy2LanguageId?firstLanguageId=${selectfirstlanguageId}&secondLanguageId=${selectsecondlanguageId}&documentId=${selectedDocumentId}`
      );
      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      console.log(data);

      const list = data.map((Account) => ({
        value: Account.id,
        label: (
          <span
            style={{
              whiteSpace: "normal",
              width: "auto",
              maxWidth: "none",
              display: "inline-block",
            }}
          >
            <strong>
              {Account.fullName} -{" "}
              <small style={{ color: "#888" }}>
                {Account.agencyName} {"("}cách {Account.distance} km{")"} - Đang
                nhận {Account.assignmentsInProgress} việc
              </small>
            </strong>
          </span>
        ),
      }));

      console.log(list);
      setTranslator(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectfirstlanguageId && selectsecondlanguageId && selectedDocumentId) {
      fetchTranslator(selectfirstlanguageId, selectsecondlanguageId);
    }
  }, [selectfirstlanguageId, selectsecondlanguageId, selectedDocumentId]);
  //---------------------AssignmentTranslation--------------------------------//

  async function fetchAssignmentTranslation() {
    const response = await api.get("AssignmentTranslation");
    console.log(response.data.data);
    setDocument(response.data.data);
  }

  const handlesubmitAssignTrans = async (values) => {
    const payload = {
      translatorId: values.translatorId,
      status: "string",
      documentId: selectedDocumentId,
      deadline: values.deadline.toISOString(),
    };

    try {
      const response = await api.post("AssignmentTranslation", payload);
      setDataAssignTrans(response.data.data);
      formVariable.resetFields();
      toast.success("Assign Translator success");
      fetchDetaildocuments();
      setIsOpen(false);
    } catch (error) {
      toast.error("Assign fail");
    }
    console.log("payload:", payload);
  };

  useEffect(() => {
    fetchAssignmentTranslation();
  }, []);

  //----------------------------------------------------------------------------//
  const fetchDetaildocuments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`Document/GetByOrderId?id=${id}`);
      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      if (data.length > 0) {
        setDocument(data);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Không có dữ liệu");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetaildocuments();
  }, [id]);

  return (
    <div className="details">
      {loading ? (
        "Đang tải"
      ) : (
        <Table
          columns={columns}
          dataSource={document}
          rowKey="id"
          loading={isFetching}
        ></Table>
      )}
      <Modal
        open={isOpen}
        title="Giao Việc Dịch "
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          formVariable.submit();
        }}
      >
        <Form form={formVariable} onFinish={handlesubmitAssignTrans}>
          <Form.Item
            label="Người Dịch"
            name={"translatorId"}
            rules={[
              {
                required: true,
                message: "Please Input Translator",
              },
            ]}
          >
            <Select options={translator} />
          </Form.Item>
          <Form.Item
            label="Thời Gian Dịch"
            name={"deadline"}
            rules={[
              {
                required: true,
                message: "Please Input deadline",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DocumentDetails;
