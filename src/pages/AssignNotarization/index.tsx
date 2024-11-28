import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { AuditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

function AssignNotarization() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shipper, setShipper] = useState([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [language, setLanguage] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);
  const [documentType, setDocumentType] = useState([]);

  useEffect(() => {
    fetchDocumentType();
    fetchNotarizationType();
    fetchLanguages();
    fetchShipper();
    fetchDocument();
  }, []);

  const fetchDocumentType = async () => {
    const response = await api.get("DocumentType");
    const data = response.data.data;
    const list = data.map((Document) => ({
      value: Document.id,
      label: <span>{Document.name}</span>,
    }));
    setDocumentType(list);
  };

  const fetchNotarizationType = async () => {
    const response = await api.get("Notarization");
    const data = response.data.data;
    const list = data.map((notarization) => ({
      value: notarization.id,
      label: <span>{notarization.name}</span>,
    }));
    setNotarizationType(list);
  };

  const fetchLanguages = async () => {
    const response = await api.get("Language");
    const data = response.data.data;
    const list = data.map((language) => ({
      value: language.id,
      label: <span>{language.name}</span>,
    }));
    setLanguage(list);
  };

  const fetchShipper = async () => {
    const response = await api.get("Account/GetAllShipper");
    const data = response.data.data;
    const list = data.map((ship) => ({
      value: ship.id,
      label: <span>{ship.fullName}</span>,
    }));
    setShipper(list);
  };

  const fetchDocument = async () => {
    try {
      const response = await api.get("Document/GetDocumentsToBeNotarized");
      setDataSource(response.data.data);
    } catch (error) {
      toast.error("Fail");
    }
  };

  const columns = [
    {
      title: "Chọn",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedDocumentIds.includes(record.id)}
          onChange={() => handleSelectDocument(record.id)}
        />
      ),
    },
    {
      title: "Ngôn ngữ gốc",
      dataIndex: "firstLanguageId",
      key: "firstLanguageId",
      render: (firstLanguageId) => {
        if (!language || language.length === 0) return null;
        const foundLanguage = language.find(
          (lang) => lang.value === firstLanguageId
        );
        return foundLanguage ? foundLanguage.label : null;
      },
    },
    {
      title: "Ngôn ngữ dịch",
      dataIndex: "secondLanguageId",
      key: "secondLanguageId",
      render: (secondLanguageId) => {
        if (!language || language.length === 0) return null;
        const foundLanguage = language.find(
          (lang) => lang.value === secondLanguageId
        );
        return foundLanguage ? foundLanguage.label : null;
      },
    },
    {
      title: "Mã tài liệu",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Số Trang",
      dataIndex: "pageNumber",
      key: "pageNumber",
    },
    {
      title: "Loại tài liệu",
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
      title: "Yêu cầu công chứng",
      dataIndex: "notarizationRequest",
      key: "notarizationRequest",
      render: (notarizationRequest) => (notarizationRequest ? "Có" : "Không"),
    },
    {
      title: "Số bản công chứng",
      dataIndex: "numberOfNotarizedCopies",
      key: "numberOfNotarizedCopies",
    },
    {
      title: "Loại công chứng",
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
  ];

  const handleSelectDocument = (id) => {
    if (selectedDocumentIds.includes(id)) {
      setSelectedDocumentIds(
        selectedDocumentIds.filter((docId) => docId !== id)
      );
    } else {
      setSelectedDocumentIds([...selectedDocumentIds, id]);
    }
  };

  const handleAssignNotarization = () => {
    if (selectedDocumentIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một tài liệu để giao việc.");
      return;
    }
    setIsOpen(true);
  };

  const handlesubmitNotarization = async (values) => {
    const payload = {
      documentId: selectedDocumentIds,
      deadline: values.deadline,
      shipperId: values.shipperId,
    };

    try {
      const response = await api.post("AssignmentNotarization", payload);
      formVariable.resetFields();
      toast.success("Giao việc thành công.");
      setIsOpen(false);
      fetchDocument();
    } catch (error) {
      toast.error("Giao việc thất bại!");
    }
  };

  return (
    <div className="AssignNotarizationPage">
      <Button
        type="primary"
        onClick={handleAssignNotarization}
        style={{ marginBottom: 16 }}
      >
        Giao việc
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        title="Giao việc công chứng"
        onCancel={() => setIsOpen(false)}
        onOk={() => formVariable.submit()}
      >
        <Form form={formVariable} onFinish={handlesubmitNotarization}>
          <Form.Item
            label="Nhân viên"
            name={"shipperId"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <Select options={shipper} />
          </Form.Item>
          <Form.Item
            label="Thời hạn"
            name={"deadline"}
            rules={[
              {
                required: true,
                message: "* vui lòng chọn",
              },
            ]}
          >
            <DatePicker placeholder="Chọn ngày" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AssignNotarization;
