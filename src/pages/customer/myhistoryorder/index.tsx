import { Table, Button, Spin } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import api from "../../../config/api";
import "./index.css";
import {
  AlignRightOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  FormOutlined,
  TruckFilled,
  TruckOutlined,
} from "@ant-design/icons";

function HistoryOrder() {
  const [datasource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const account = useSelector((store: RootState) => store.accountmanage);
  const [agency, setAgency] = useState([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Lấy thông tin các agency
  const fetchAgency = async () => {
    const response = await api.get("Agency");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((agency) => ({
      value: agency.id,
      label: <span>{agency.name}</span>,
    }));

    setAgency(list);
  };

  useEffect(() => {
    fetchAgency();
  }, []);

  // Lấy tất cả đơn hàng của khách hàng
  async function fetchMyOrders() {
    setLoading(true);
    const response = await api.get(`Order/GetByCustomerId?id=${account.Id}`);
    console.log(response.data.data);
    setDataSource(response.data.data);
    setFilteredData(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    if (account.Id) {
      fetchMyOrders();
    }
  }, [account.Id]);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setActiveButton(status);
  };

  useEffect(() => {
    if (statusFilter === "") {
      setFilteredData(datasource);
    } else {
      const filtered =
        datasource?.filter((order) => order.status === statusFilter) || []; // Kiểm tra datasource không null
      setFilteredData(filtered);
    }
  }, [statusFilter, datasource]);

  const columns = [
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
      title: "Yêu cầu giao hàng",
      dataIndex: "shipRequest",
      key: "shipRequest",
      render: (shipRequest) => (shipRequest ? "Có" : "Không"),
    },
    {
      title: "Thời hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline) => dayjs(deadline).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Chi nhánh",
      dataIndex: "agencyId",
      key: "agencyId",
      render: (agencyId) => {
        if (!agency || agency.length === 0) return "Loading...";
        const foundAgency = agency.find((agen) => agen.value === agencyId);
        return foundAgency ? foundAgency.label : "Unknown";
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
          case "Implementing":
            return (
              <div className="status-implementing">
                <FormOutlined />
                &nbsp; Đang thực hiện
              </div>
            );
          case "Delivering":
            return (
              <div className="status-delivering">
                <TruckOutlined />
                &nbsp; Đang giao
              </div>
            );
          case "Delivered":
            return (
              <div className="status-delivered">
                <CheckOutlined />
                &nbsp; Đã hoàn thành
              </div>
            );
          case "Canceled":
            return (
              <div className="status-canceled">
                <CloseOutlined />
                &nbsp; Đã hủy
              </div>
            );
          default:
            return status;
        }
      },
    },
  ];

  return (
    <div className="historyorderpage">
      <h1>ĐƠN HÀNG CỦA BẠN</h1>
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
            activeButton === "Processing" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Processing")}
        >
          <ClockCircleOutlined />
          Chờ xử lý
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Implementing" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Implementing")}
        >
          <FormOutlined />
          Đang thực hiện
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Delivering" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Delivering")}
        >
          <TruckOutlined />
          Đang giao
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Delivered" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Delivered")}
        >
          <CheckOutlined />
          Đã hoàn thành
        </Button>
        <Button
          className={`filter-button ${
            activeButton === "Canceled" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("Canceled")}
        >
          <CloseOutlined />
          Đã hủy
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={{
          spinning: loading,
          indicator: <Spin />,
        }}
      />
    </div>
  );
}

export default HistoryOrder;
