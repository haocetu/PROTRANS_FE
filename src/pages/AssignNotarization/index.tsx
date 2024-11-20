import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { AuditOutlined, FileProtectOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDocument } from "../../redux/features/documentItem";

function AssignNotarization() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shipper, setShipper] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [dataAssignNotarite, setDataAssignNotarite] = useState([]);
  const [language, setLanguage] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  // const dispatch = useDispatch();

  // //-------------------------------------

  // function handlegetValue(e) {
  //   console.log(e);
  //   console.log("hi");
  //   dispatch(
  //     addDocument({
  //       id: e.id,
  //       firstlanguaged: e.firstLanguageId,
  //       secondLanguageId: e.secondLanguageId,
  //       code: e.id,
  //     })
  //   );
  //   return toast.success("Add Documents Success");
  // }

  // //-------------------------------------

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
  //---------------------------------------------
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

  //=======================================================
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

  //=====================================================
  const fetchShipper = async () => {
    const response = await api.get("Account/GetAllShipper");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((ship) => ({
      value: ship.id,
      label: <span>{ship.fullName}</span>,
    }));

    setShipper(list);
  };

  useEffect(() => {
    fetchShipper();
  }, []);

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
      title: "Mã Đơn Hàng",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Loại Tệp",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Số Trang",
      dataIndex: "pageNumber",
      key: "pageNumber",
    },
    {
      title: "Số bản Copy",
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
      title: "Số Bản Copy Công Chứng",
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
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Space>
          <AuditOutlined
            onClick={() => {
              setIsOpen(true);
              setSelectedDocumentId(id);
            }}
          />
          {/* <Button
            onClick={() => {
              handlegetValue(data);
            }}
          >
            Add Task list
          </Button> */}
        </Space>
      ),
    },
  ];

  const handlesubmitNotarization = async (values) => {
    const payload = {
      documentId: selectedDocumentId,
      deadline: values.deadline,
      shipperId: values.shipperId,
    };

    try {
      const response = await api.post("AssignmentNotarization", payload);
      setDataAssignNotarite(response.data.data);
      formVariable.resetFields();
      toast.success("Assign Translator success");
      setIsOpen(false);
    } catch (error) {
      toast.error("Assign fail");
    }
    console.log("payload:", payload);
  };

  const fetchDocument = async () => {
    try {
      const response = await api.get("Document");
      console.log(response.data.data);
      setDataSource(response.data.data);
    } catch (error) {
      toast.error("Fail");
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  return (
    <div className="AssignNotarizationPage">
      <Link to="tasknotarizationlist">
        <FileProtectOutlined style={{ fontSize: "50px", color: "orange" }} />
      </Link>

      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        title="Giao Việc Công Chứng"
        onCancel={() => setIsOpen(false)}
        onOk={() => formVariable.submit()}
      >
        <Form form={formVariable} onFinish={handlesubmitNotarization}>
          <Form.Item
            label="người đi công chứng"
            name={"shipperId"}
            rules={[
              {
                required: true,
                message: "Please Input Shipper",
              },
            ]}
          >
            <Select options={shipper} />
          </Form.Item>
          <Form.Item
            label="Thời hạn nộp"
            name={"deadline"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thời hạn nộp",
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

export default AssignNotarization;