import { Table } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import api from "../../../config/api";

function HistoryOrder() {
  const [datasource, setDataSource] = useState([]);
  const account = useSelector((store: RootState) => store.accountmanage);
  const [agency, setAgency] = useState([]);

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
      title: "Yêu Cầu Giao",
      dataIndex: "shipRequest",
      key: "shipRequest",
      render: (shipRequest) => (shipRequest ? "Có" : "Không"),
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
      title: "Tổng Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Chi nhánh",
      dataIndex: "agencyId",
      key: "agencyId",
      render: (agencyId) => {
        // Check if category is available and initialized
        if (!agency || agency.length === 0) return "Loading...";

        // Find the category by ID and return its name
        const foundagency = agency.find((agen) => agen.value === agencyId);
        return foundagency ? foundagency.label : "Unknown Category";
      },
    },
    {
      title: "trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  async function fetchMyRequest() {
    const response = await api.get(`Order/GetByCustomerId?id=${account.Id}`);
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    if (account.Id) {
      fetchMyRequest();
    }
  }, []);
  return (
    <div className="historyorderpage">
      <Table columns={columns} dataSource={datasource}></Table>
    </div>
  );
}

export default HistoryOrder;
