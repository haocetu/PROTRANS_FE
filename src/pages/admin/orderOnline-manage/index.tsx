import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import {
  CheckOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  FormOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import "./index.css";

function OrderOnlineManage() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => {
        const currentPage = pagination.current || 1;
        const pageSize = pagination.pageSize || 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng giá (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => {
        return text !== null ? text.toLocaleString("vi-VN") : text;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case "Processing":
            return (
              <div className="status-processing">
                <ClockCircleOutlined />
                &nbsp; Chờ xử lý
              </div>
            );
          case "Completed":
            return (
              <div className="status-completed">
                <FormOutlined />
                &nbsp; Đã hoàn thành
              </div>
            );
          case "Delivering":
            return (
              <div className="status-delivering">
                <CheckOutlined />
                &nbsp; Đang giao
              </div>
            );
          case "Delivered":
            return (
              <div className="status-delivered">
                <CheckOutlined />
                &nbsp; Đã giao
              </div>
            );
          case "Implementing":
            return (
              <div className="status-implementing">
                <CheckOutlined />
                &nbsp; Đang thực hiện
              </div>
            );
          case "Canceled":
            return (
              <div className="status-canceled">
                <PauseOutlined />
                &nbsp; Đã hủy
              </div>
            );
          default:
            return status;
        }
      },
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Button
          type="primary"
          style={{ background: "orange" }}
          onClick={() => navigate(`details/${id}`)}
        >
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  async function fetchOrder() {
    const response = await api.get("Order/GetOnlineOrders");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      onChange={handleTableChange}
    ></Table>
  );
}

export default OrderOnlineManage;
