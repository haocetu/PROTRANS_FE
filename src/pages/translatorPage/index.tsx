import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useSelector } from "react-redux";

function Translator() {
  const [dataSource, setDataSource] = useState([]);
  const UserAccount = useSelector((store) => store.user);
  const UserAccount2 = useSelector((store) => store.user.Id);

  const token = localStorage.getItem("token");

  console.log("day la token", token);

  console.log(UserAccount);

  const columns = [
    {
      title: "Tài Liệu Dịch",
      dataIndex: "documentId",
      key: "documentId",
    },
    {
      title: "Thời Hạn Nộp",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchAssignment = async () => {
    console.log(UserAccount2);
    try {
      const response = await api.get(`AssignmentTranslation/${UserAccount2}`);
      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];

      console.log(data);
      setDataSource(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [UserAccount2]);

  return (
    <div className="translatorPage">
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
}

export default Translator;
