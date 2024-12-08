import { Table } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/api";

function ShipperAcccount() {
  const [dataSource, setDataSource] = useState([]);
  const [role, setRole] = useState([]);
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

  const fetchRole = async () => {
    const response = await api.get("Role");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((role) => ({
      value: role.id,
      label: <span>{role.name}</span>,
    }));

    setRole(list);
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "userName", // Use firstLanguageId from QuotePrice data
      key: "userName",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName", // Use secondLanguageId from QuotePrice data
      key: "fullName",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Ngày Sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Vai trò",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId) => {
        // Check if category is available and initialized
        if (!role || role.length === 0) return null;

        // Find the category by ID and return its name
        const foundrole = role.find((rol) => rol.value === roleId);
        return foundrole ? foundrole.label : null;
      },
    },
    {
      title: "Chi nhánh",
      dataIndex: "agencyId",
      key: "agencyId",
      render: (agencyId) => {
        // Check if category is available and initialized
        if (!agency || agency.length === 0) return null;

        // Find the category by ID and return its name
        const foundagency = agency.find((agen) => agen.value === agencyId);
        return foundagency ? foundagency.label : null;
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (isDeleted ? "Yes" : "No"),
    },
  ];

  async function fetchShipperAccount() {
    try {
      const response = await api.get("Account/GetAllShipper");
      setDataSource(response.data.data);
    } catch (error) {
      toast.error("Danh sách trống.");
    }
  }

  useEffect(() => {
    fetchShipperAccount();
    fetchAgency();
    fetchRole();
  }, []);
  return <Table columns={columns} dataSource={dataSource}></Table>;
}

export default ShipperAcccount;
