import { Button, DatePicker, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useParams } from "react-router-dom";
import { ContainerOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

function DocumentDetails() {
  const [formVariable] = useForm();
  const { id } = useParams();
  const [document, setDocument] = useState<Document[]>();
  const [language, setLanguage] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [notarizationType, setNotarizationType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  //------------------------------------------------
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

  //-----------------------------------------
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

  //-----------------------------------------------------

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

  //--------------------------------------------------------
  const columns = [
    {
      title: "First Language",
      dataIndex: "firstLanguageId",
      key: "firstLanguageId",
      render: (firstLanguageId) => {
        // Check if category is available and initialized
        if (!language || language.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const foundLanguage = language.find(
          (lang) => lang.value === firstLanguageId
        );
        return foundLanguage ? foundLanguage.label : "Unknown Category";
      },
    },
    {
      title: "Second Language",
      dataIndex: "secondLanguageId",
      key: "secondLanguageId",
      render: (secondLanguageId) => {
        // Check if category is available and initialized
        if (!language || language.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const foundLanguage = language.find(
          (lang) => lang.value === secondLanguageId
        );
        return foundLanguage ? foundLanguage.label : "Unknown Category";
      },
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Url Path",
      dataIndex: "urlPath",
      key: "urlPath",
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Page Number",
      dataIndex: "pageNumber",
      key: "pageNumber",
    },
    {
      title: "Number Copies",
      dataIndex: "numberOfCopies",
      key: "numberOfCopies",
    },
    {
      title: "Notarization",
      dataIndex: "notarizationRequest",
      key: "notarizationRequest",
    },
    {
      title: "Number Notarizated Copies",
      dataIndex: "numberOfNotarizatedCopies",
      key: "numberOfNotarizatedCopies",
    },
    {
      title: "notarization Type",
      dataIndex: "notarizationId",
      key: "notarizationId",
      render: (notarizationId) => {
        // Check if category is available and initialized
        if (!notarizationType || notarizationType.length === 0)
          return "Loading...";

        // Find the category by ID and return its name
        const foundnotarizationType = notarizationType.find(
          (lang) => lang.value === notarizationId
        );
        return foundnotarizationType
          ? foundnotarizationType.label
          : "Unknown Category";
      },
    },
    {
      title: "Document Type",
      dataIndex: "documentTypeId",
      key: "documentTypeId",
      render: (documentTypeId) => {
        // Check if category is available and initialized
        if (!documentType || documentType.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const founddocumentType = documentType.find(
          (lang) => lang.value === documentTypeId
        );
        return founddocumentType ? founddocumentType.label : "Unknown Category";
      },
    },
    {
      title: "Translation Status",
      dataIndex: "translationStatus",
      key: "translationStatus",
    },
    {
      title: "Notarization Status",
      dataIndex: "notarizationStatus",
      key: "notarizationStatus",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <ContainerOutlined
          onClick={() => {
            setIsOpen(true);
          }}
        />
      ),
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

  const fetchDetaildocuments = async () => {
    try {
      const response = await api.get(`Document/GetByOrderId?id=${id}`);
      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setDocument(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetaildocuments();
  }, [id]);

  return (
    <div className="details">
      <Table columns={columns} dataSource={document} rowKey="id"></Table>
      <Modal
        open={isOpen}
        title="Assign A Translator "
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          formVariable.submit();
        }}
      >
        <Form form={formVariable}>
          <Form.Item
            label="Translator"
            name={"translatorId"}
            rules={[
              {
                required: true,
                message: "Please Input Translator",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="deadline"
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
