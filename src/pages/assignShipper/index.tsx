import { Button, Form, Input, Modal, Select, Table } from "antd";
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
          }}
        />
      ),
    },
  ];
  async function handleSubmit(values) {
    const payload = {
      shipperId: values.shipperId,
      orderId: selectedOrderId,
      imageUrl: values.imageUrl,
    };
    console.log(payload);
    try {
      const response = await api.post("Shipping", payload);

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
    const response = await api.get("Account/GetAllShipper");
    const data = response.data.data;
    console.log({ data });

    const list = data.map((ship) => ({
      value: ship.id,
      label: <span>{ship.fullName}</span>,
    }));

    setShipper(list);
  };

  useEffect(() => {
    fetchShipper();
  }, []);

  async function fetchOrder() {
    const response = await api.get("Order");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
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
            label="Ảnh"
            name={"imageUrl"}
            rules={[
              {
                required: true,
                message: "Vui lòng cập nhập ảnh",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AssignShipper;
