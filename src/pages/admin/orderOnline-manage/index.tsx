import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";

function OrderOnlineManage() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Khách Hàng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Button
          type="primary"
          style={{ background: "orange" }}
          onClick={() => navigate(`details/${id}`)}
        >
          Details
        </Button>
      ),
    },
  ];

  async function fetchOrder() {
    const response = await api.get("Order/GetOnlineOrders");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchOrder();
  }, []);
  return <Table columns={columns} dataSource={dataSource}></Table>;
}

export default OrderOnlineManage;
