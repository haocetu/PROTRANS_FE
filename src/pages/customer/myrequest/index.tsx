import {
  AlignRightOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  FormOutlined,
  PauseOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import {
  Button,
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
import { RootState } from "../../../redux/rootReducer";
import "./index.css";

function MyRequest() {
  const [formUpdate] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [datasource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [idRequest, SetidRequest] = useState("");
  const account = useSelector((store: RootState) => store.accountmanage);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>(""); // Lưu trạng thái nút đang được nhấn

  console.log(account.Id);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setActiveButton(status);
  };

  useEffect(() => {
    if (statusFilter === "") {
      setFilteredData(datasource);
    } else {
      const filtered = datasource.filter(
        (order) => order.status === statusFilter
      );
      setFilteredData(filtered);
    }
  }, [statusFilter, datasource]);

  const columns = [
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
      title: "Yêu cầu giao hàng",
      dataIndex: "shipRequest",
      key: "shipRequest",
      render: (shipRequest) => (shipRequest ? "Có" : "Không"),
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
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, data) => {
        if (data.status === "Quoted") {
          return (
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
          );
        } else {
          // Nếu status không phải "Quoted", không render cột này
          return null;
        }
      },
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
      toast.success("Xác nhận đơn hàng thành công.");
    } catch (error) {
      console.error("Error updating request:", error);
    }
  }

  async function fetchMyRequest() {
    const response = await api.get(
      `Request/GetByCustomerId?customerId=${account.Id}`
    );
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
    setFilteredData(response.data.data);
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
      <Table columns={columns} dataSource={filteredData} />
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
      >
        <Form form={formUpdate} onFinish={handleEditRequest}>
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
              <Select.Option value="Refuse">Từ chối </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MyRequest;
