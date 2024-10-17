import { Table } from "antd";

function Translator() {
  const columns = [
    {
      title: "userName",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "fullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
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

export default Translator;
