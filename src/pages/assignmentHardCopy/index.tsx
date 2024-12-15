import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import api from "../../config/api";
import { useEffect, useState } from "react";
import { SnippetsOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function AssignHardCopy() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [dataPickHardCopy, setdataPickHardCopy] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [agency, setAgency] = useState([]);
  const [shipper, setShipper] = useState([]);
  const [selectedAgencyId, setSelectedAgencyId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  //--------------------------------------
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
  //------------------------
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
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
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
        <SnippetsOutlined
          type="primary"
          style={{ fontSize: "20px", color: "orange" }}
          onClick={() => {
            setIsOpen(true);
            setSelectedAgencyId(data.agencyId);
            setSelectedOrderId(id);
          }}
          title="Giao đi nhận bản cứng"
        />
      ),
    },
  ];
  const fetchShipper = async () => {
    const response = await api.get(
      `Account/GetAllShipperByAgencyId?agencyId=${selectedAgencyId}`
    );
    const data = response.data.data;
    console.log({ data });

    const list = data.map((ship) => ({
      value: ship.id,
      label: (
        <span>
          <strong>
            {ship.fullName}
            {"-"}
            <small style={{ color: "#888" }}>{ship.agencyName}</small>
          </strong>{" "}
          <br />
        </span>
      ),
    }));

    setShipper(list);
  };

  async function handleSubmit(values) {
    const payload = {
      shipperId: values.shipperId,
      orderId: selectedOrderId,
      deadline: values.deadline,
    };
    console.log(payload);
    try {
      const response = await api.post("AssignmentShipping/PickUp", payload);

      if (response) {
        const currentDateTime = new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh", // Đảm bảo sử dụng múi giờ Việt Nam
        });

        const paramPushNoti = {
          specId: response.data.data.shipperId,
          title: "Thông báo đi nhận bản cứng",
          message: ` Bạn đã nhận nhiệm vụ đi nhận bản cứng vào ngày thông báo: ${currentDateTime}`,
          author: "string",
        };
        const resPushNoti = api.post(`Notification/Single`, paramPushNoti);
        console.log("resPushNoti", resPushNoti);
      }
      console.log(response.data.data);
      setdataPickHardCopy([...dataPickHardCopy, response.data.data]);
      formVariable.resetFields();
      setIsOpen(false);
      fetchOrder();
      toast.success("Giao việc thành công.");
    } catch (error) {
      toast.error("Giao việc thất bại!");
    }
  }

  async function fetchOrder() {
    const response = await api.get("Order/GetOrdersToPickUp");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchShipper();
  }, [selectedAgencyId]);

  useEffect(() => {
    fetchAgency();
    fetchOrder();
  }, []);

  return (
    <div className="AssignmentHardCopy">
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        title="Giao đi nhận bản cứng"
        onCancel={() => setIsOpen(false)}
        onOk={() => formVariable.submit()}
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item label="Nhân viên đi nhận" name={"shipperId"}>
            <Select options={shipper} />
          </Form.Item>
          <Form.Item label="Thời hạn" name={"deadline"}>
            <DatePicker placeholder="Chọn ngày" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AssignHardCopy;
