import { FileAddOutlined, FormOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import api from "../../../config/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function CreateOrderOnline() {
  const [datasource, setDataSource] = useState([]);
  // const [selectcustomerid, setselectcustomerid] = useState(null);
  const token = localStorage.getItem("token");

  console.log(token);
  const columns = [
    {
      title: "CustomerId",
      dataIndex: "customerId",
      key: "customerId",
      hidden: true,
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
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    {
      title: "Thời hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline) => {
        return dayjs(deadline).format("DD/MM/YYYY HH:mm");
      },
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
      title: "Yêu cầu giao hàng",
      dataIndex: "shipRequest",
      key: "shipRequest",
      render: (shipRequest) => (shipRequest ? "Có" : "Không"),
    },
    // {
    //   title: "Trạng thái xóa",
    //   dataIndex: "isDeleted",
    //   key: "isDeleted",
    //   render: (isDeleted) => (isDeleted ? "Có" : "Không"),
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <Space>
          <FormOutlined
            onClick={() => {
              console.log(data.customerId);
              // setselectcustomerid(data.customerId);
              const newData = { ...data };
              console.log("id", newData.customerId);
              console.log(newData);

              for (const key of Object.keys(data)) {
                const value = newData[key];

                const date: any = new Date(value);
                // const time: any = date.getTime();
                //|| isNaN(time)
                if (typeof value === "number") {
                } else {
                  newData[key] = dayjs(value);
                }
              }
              handleSubmit(id);
            }}
            title="Tạo đơn hàng"
          />
        </Space>
      ),
    },
  ];

  async function handleSubmit(values) {
    console.log(values);

    try {
      const response = await api.post("Order/CreateOrderFromRequest", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token if required
        },
      });

      // console.log("customer", selectcustomerid);

      if (response) {
        const currentDateTime = new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh", // Đảm bảo sử dụng múi giờ Việt Nam
        });
        console.log(response.data.data.customerId);

        const paramPushNoti = {
          specId: response.data.data.customerId,
          title: "Báo giá dịch thuật",
          message: `Đơn giá của bạn đã được xử lí có giá ${response.data.data.totalPrice}. Ngày thông báo: ${currentDateTime}`,
          author: "string",
        };
        const resPushNoti = api.post(`Notification/Single`, paramPushNoti);
        console.log("resPushNoti", resPushNoti);
      }
      console.log(response.data.data);
      fetchMyRequest();
      toast.success("Tạo đơn hàng thành công.");
    } catch (error) {
      toast.error("Tạo đơn hàng thất bại.");
    }
  }

  async function fetchMyRequest() {
    const response = await api.get("Request/GetStatusAccept");
    console.log("=============================");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchMyRequest();
  }, []);

  return (
    <div className="orderonline">
      <Table columns={columns} dataSource={datasource}></Table>
    </div>
  );
}

export default CreateOrderOnline;
