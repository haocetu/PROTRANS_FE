import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/api";

function RequestManager() {
  const [datasource, setDataSource] = useState([]);
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
          <Button type="primary" danger>
            Delete
          </Button>

          <Button type="primary" style={{ background: "orange" }}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

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
    </div>
  );
}

export default RequestManager;
