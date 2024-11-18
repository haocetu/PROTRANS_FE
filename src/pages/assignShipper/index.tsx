import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { TruckOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function AssignShipper() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [dataAssignshipper, setDataAssignShipper] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shipper, setShipper] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedAgencyId, setSelectedAgencyId] = useState(null);
  const [agency, setAgency] = useState([]);

  const fetchAgency = async () => {
    const response = await api.get("Agency");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((agen) => ({
      value: agen.id,
      label: <span>{agen.name}</span>,
    }));

    setAgency(list);
  };

  const columns = [
    {
      title: "Khách Hàng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa Chỉ",
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
        const foundAgency = agency.find((agen) => agen.value === agencyId);
        return foundAgency ? foundAgency.label : null;
      },
    },
    {
      title: "Tổng Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng Thái Đơn Hàng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, data) => (
        <TruckOutlined
          type="primary"
          style={{ fontSize: "50px", color: "orange" }}
          onClick={() => {
            setIsOpen(true);
            setSelectedOrderId(id);
            setSelectedAgencyId(data.agencyId);
          }}
        />
      ),
    },
  ];
  async function handleSubmit(values) {
    const payload = {
      shipperId: values.shipperId,
      orderId: selectedOrderId,
      deadline: values.deadline,
    };
    console.log(payload);
    try {
      const response = await api.post("AssignmentShipping/Ship", payload);

      console.log(response.data.data);
      setDataAssignShipper([...dataAssignshipper, response.data.data]);
      formVariable.resetFields();
      setIsOpen(false);
      toast.success("Giao việc thành công");
    } catch (error) {
      toast.error("Giao việc shipper thất bại");
    }
  }

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
          <strong>{ship.fullName}</strong> <br />
          <small style={{ color: "#888" }}>{ship.agencyId}</small>
        </span>
      ),
    }));

    setShipper(list);
  };

  async function fetchOrder() {
    const response = await api.get("Order/GetCompletedOrders");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchAgency();
    fetchShipper();
    fetchOrder();
  }, []);

  return (
    <div className="AssignShipper">
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={() => formVariable.submit()}
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            label="Người vận chuyển"
            name={"shipperId"}
            rules={[
              {
                required: true,
                message: "Vui lòng cập nhập Người vận chuyển",
              },
            ]}
          >
            <Select options={shipper} />
          </Form.Item>
          <Form.Item
            label="Thời gian giao"
            name={"deadline"}
            rules={[
              {
                required: true,
                message: "Vui lòng cập nhập ảnh",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AssignShipper;
