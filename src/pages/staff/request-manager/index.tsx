import { DatePicker, Form, Input, Modal, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import { FormOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function RequestManager() {
  const [formUpdate] = useForm();
  const [datasource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idRequest, SetidRequest] = useState("");
  // const [language, setLanguage] = useState([]);
  // const [documentType, setDocumentType] = useState([]);
  // const [notarizationType, setNotarizationType] = useState([]);

  // const props: UploadProps = {
  //   name: "file",
  //   action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       toast.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       toast.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  // ========================================
  // const fetchNotarizationType = async () => {
  //   const response = await api.get("Notarization");
  //   const data = response.data.data;
  //   console.log({ data });

  //   const list = data.map((notarization) => ({
  //     value: notarization.id,
  //     label: <span>{notarization.name}</span>,
  //   }));

  //   setNotarizationType(list);
  // };

  // useEffect(() => {
  //   fetchNotarizationType();
  // }, []);

  // =========================================
  // const fetchDocumentType = async () => {
  //   const response = await api.get("DocumentType");
  //   const data = response.data.data;
  //   console.log({ data });

  //   const list = data.map((Document) => ({
  //     value: Document.id,
  //     label: <span>{Document.name}</span>,
  //   }));

  //   setDocumentType(list);
  // };

  // useEffect(() => {
  //   fetchDocumentType();
  // }, []);

  //==========================================
  // const fetchLanguages = async () => {
  //   const response = await api.get("Language");
  //   const data = response.data.data;
  //   console.log({ data });

  //   const list = data.map((language) => ({
  //     value: language.id,
  //     label: <span>{language.name}</span>,
  //   }));

  //   setLanguage(list);
  // };

  // useEffect(() => {
  //   fetchLanguages();
  // }, []);

  const columns = [
    {
      title: "Tên Khách hàng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline) => {
        return dayjs(deadline).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      title: "Giá ước tính",
      dataIndex: "estimatedPrice",
      key: "estimatedPrice",
    },
    {
      title: "Yêu cầu nhận tài liệu",
      dataIndex: "pickUpRequest",
      key: "pickUpRequest",
      render: (pickUpRequest) => (pickUpRequest ? "Có" : "Không"),
    },
    {
      title: "Yêu cầu ship",
      dataIndex: "shipRequest",
      key: "shipRequest",
      render: (shipRequest) => (shipRequest ? "Có" : "Không"),
    },
    {
      title: "Trạng Thái xóa",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (isDeleted ? "Có" : "Không"),
    },
    {
      title: "trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Space>
          <FormOutlined
            onClick={() => {
              setIsOpen(true);
              SetidRequest(id);
              const newData = { ...data };
              console.log(newData);

              for (const key of Object.keys(data)) {
                const value = newData[key];

                const date: any = new Date(value);
                // const time: any = date.getTime();
                //|| isNaN(time)
                if (typeof value === "number") {
                } else {
                  newData[key] = dayjs(value);
                }
              }
              console.log(newData);
              formUpdate.setFieldsValue(newData);
            }}
          />
        </Space>
      ),
    },
  ];

  // async function handleEditRequest(value) {
  //   const updateRequest = formUpdate.getFieldsValue();
  //   console.log("day laf:", updateRequest);

  //   try {
  //     // Gửi yêu cầu PUT với requestId và payload updateRequest
  //     const response = await api.put(
  //       `Request/StaffUpdate?requestId=${idRequest}`,
  //       value
  //     );

  //     console.log("Response:", response);
  //   } catch (error) {
  //     console.error("Error updating request:", error);
  //   }
  // }
  async function handleEditRequest() {
    const updateRequest = formUpdate.getFieldsValue();

    // Chuyển đổi các giá trị boolean của Switch cho pickUpRequest và shipRequest
    updateRequest.pickUpRequest = updateRequest.pickUpRequest ? true : false;
    updateRequest.shipRequest = updateRequest.shipRequest ? true : false;

    console.log(updateRequest);
    try {
      // Gửi yêu cầu PUT với requestId và payload updateRequest
      const response = await api.put(
        `Request/StaffUpdate?requestId=${idRequest}`,
        updateRequest
      );

      fetchRequest();
      formUpdate.resetFields();
      toast.success("Gửi báo giá thành công.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Gửi báo giá thất bại.");
    }
  }

  async function fetchRequest() {
    const response = await api.get("Request/GetStatusWaitting");
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchRequest();
  }, []);
  return (
    <div className="requestmanager">
      <Table columns={columns} dataSource={datasource} />

      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          formUpdate.resetFields();
        }}
        onOk={() => {
          formUpdate.submit();
        }}
      >
        <Form form={formUpdate} onFinish={handleEditRequest}>
          <Form.Item
            label="Thời hạn"
            name={"deadline"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thời hạn",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Giá ước tính"
            name={"estimatedPrice"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá ước tính",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Yêu cầu nhận hồ sơ"
            name={"pickUpRequest"}
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Yêu cầu",
              },
            ]}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={false}
            />
          </Form.Item> */}
          {/* <Form.Item
            label="Yêu cầu giao hồ sơ"
            name={"shipRequest"}
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Yêu cầu",
              },
            ]}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={false}
            />
          </Form.Item> */}
          <Form.Item
            label="Trạng thái"
            name={"status"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trạng thái",
              },
            ]}
          >
            <Select placeholder="Trạng thái">
              <Select.Option value="Waitting">Đang xử lí</Select.Option>
              <Select.Option value="Quoted">Đã báo giá</Select.Option>
              <Select.Option value="Cancel">Hủy</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default RequestManager;
