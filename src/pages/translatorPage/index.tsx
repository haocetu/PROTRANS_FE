import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useForm } from "antd/es/form/Form";
import { FolderOutlined } from "@ant-design/icons";
import "./index.scss";

function Translator() {
  const [formDocument] = useForm();
  const [isOpendocument, setIsOpendocument] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const UserAccount = useSelector((store: RootState) => store.accountmanage);
  const UserAccount2 = useSelector(
    (store: RootState) => store.accountmanage.Id
  );
  const [idDocument, SetidDocuments] = useState("");
  const [language, setLanguage] = useState([]);

  const token = localStorage.getItem("token");

  console.log("day la token", token);

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

  const columns = [
    {
      title: "Thời Hạn Nộp",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Tài Liệu Dịch",
      dataIndex: "documentId",
      key: "documentId",
      render: (documentId, data) => (
        <FolderOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsOpendocument(true);
            SetidDocuments(documentId);
          }}
        />
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  console.log(idDocument);
  async function showDocument() {
    console.log(idDocument);
    try {
      // Gọi API với idDocument
      const response = await api.get(`Document/${idDocument}`);

      // Log dữ liệu trả về
      console.log("=============================");
      console.log(response.data.data);

      // Gán dữ liệu vào form để hiển thị
      formDocument.setFieldsValue(response.data.data);
    } catch (error) {
      console.error("Error fetching document data:", error);
      toast.error("Lấy tài liệu thất bại. Vui lòng thử lại!");
    }
  }

  useEffect(() => {
    if (idDocument) {
      showDocument();
    }
  }, [idDocument]);

  const fetchAssignment = async () => {
    console.log(UserAccount2);
    try {
      const response = await api.get(`AssignmentTranslation/${UserAccount2}`);
      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];

      console.log(data);
      setDataSource(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (UserAccount2) {
      fetchAssignment();
    }
  }, [UserAccount2]);

  return (
    <div className="translatorPage">
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpendocument}
        onCancel={() => {
          setIsOpendocument(false);
          formDocument.resetFields();
        }}
        footer={[
          <Button
            key="cancel"
            type="primary"
            danger
            onClick={() => {
              setIsOpendocument(false);
              formDocument.resetFields();
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form form={formDocument} onFinish={showDocument}>
          <Form.Item
            label="Ngôn ngữ gốc"
            name={"firstLanguageId"}
            style={{ color: "red" }}
          >
            <Select options={language} disabled style={{ color: "red" }} />
          </Form.Item>
          <Form.Item label="Ngôn ngữ dịch" name={"secondLanguageId"}>
            <Select options={language} disabled />
          </Form.Item>
          <Form.Item label="Mã tài liệu" name={"code"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Tài liệu" name={"urlPath"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="loại tài liệu" name={"fileType"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="số trang" name={"pageNumber"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="số bảng copy" name={"numberOfCopies"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Yêu cầu công chứng" name={"notarizationRequest"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="NumberOfCopies" name={"notarizationRequest"}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="số bản công chứng copies"
            name={"numberOfNotarizedCopies"}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="NumberOfNotarizatedCopies" name={"documentTypeId"}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Tài liệu" name={"urlPath"}>
            <a
              href={formDocument.getFieldValue("urlPath")}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              {formDocument.getFieldValue("urlPath") || "Tải tài liệu"}
            </a>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Translator;
