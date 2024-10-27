import { Table } from "antd";

function TranslatorAccount() {
  const columns = [
    {
      title: "Tên Người Dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Tên Đầy Đủ",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Vai Trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng Thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (isDeleted ? "Stop" : "Active"),
    },
  ];
  return (
    <div className="translator">
      <Table columns={columns}></Table>
    </div>
  );
}

export default TranslatorAccount;
