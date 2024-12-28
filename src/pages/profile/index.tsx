import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  AlignRightOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeliveredProcedureOutlined,
  EyeOutlined,
  FormOutlined,
  LikeOutlined,
  MoreOutlined,
  PauseOutlined,
  SendOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import "./index.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

function Profile() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notarizationType, setNotarizationType] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [language, setLanguage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("");
  const [accountData, setAccountData] = useState(null);
  const account = useSelector((store: RootState) => store.accountmanage);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  async function fetchAccount() {
    setLoading(true);
    const response = await api.get(`Account/${account.Id}`);
    console.log(response.data.data);
    setAccountData(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    if (account.Id) {
      fetchAccount();
    }
  }, [account.Id]);

  return (
    <div className="profile-page">
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        accountData && (
          <Card
            title="Thông tin cá nhân"
            bordered={true}
            style={{
              maxWidth: 600,
              margin: "0 auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Tên người dùng">
                {accountData.userName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Họ và tên">
                {accountData.fullName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {accountData.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {accountData.phoneNumber || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {accountData.address || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {dayjs(accountData.dob).format("DD/MM/YYYY") || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {accountData.gender === "Male"
                  ? "Nam"
                  : accountData.gender === "Female"
                  ? "Nữ"
                  : "Khác"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Vai trò">
                {accountData.roleId || "N/A"}
              </Descriptions.Item> */}
              <Descriptions.Item label="Chi nhánh">
                {accountData.agencyName || "Không có"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )
      )}
    </div>
  );
}

export default Profile;
