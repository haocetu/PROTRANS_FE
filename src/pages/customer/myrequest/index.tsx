import { CheckOutlined, CloseOutlined, FormOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function MyRequest() {
  const [formUpdate] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [datasource, setDataSource] = useState([]);
  const [idRequest, SetidRequest] = useState("");
  const account = useSelector((store) => store.user);

  console.log(account.Id);
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
      toast.success("Xác nhận đơn hàng thành công");
    } catch (error) {
      console.error("Error updating request:", error);
    }
  }

  async function fetchMyRequest() {
    const response = await api.get(
      `Request/GetStatusQuoted?customerId=${account.Id}`
    );
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchMyRequest();
  }, []);
  return (
    <div className="MyReuqest">
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
              <Select.Option value="Accept">Chấp nhận</Select.Option>
              <Select.Option value="Refuse">Từ chối </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MyRequest;
