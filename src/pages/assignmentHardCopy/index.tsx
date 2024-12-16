import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  Tag,
} from "antd";
import api from "../../config/api";
import { useEffect, useState } from "react";
import { SnippetsOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

function AssignHardCopy() {
  const [formVariable] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [dataPickHardCopy, setdataPickHardCopy] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [agency, setAgency] = useState([]);
  const [shipper, setShipper] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAgencyId, setSelectedAgencyId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [Selectdealine, setSelectdealine] = useState(null);

  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
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
      title: "Thời hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline) => {
        return <span>{dayjs(deadline).format("DD/MM/YYYY")}</span>;
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
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Implementing"
              ? "orange"
              : status === "Processing"
              ? "red"
              : "default"
          }
        >
          {status === "Implementing"
            ? "Đang thực hiện"
            : status === "Processing"
            ? "Chờ xử lý"
            : "N/A"}
        </Tag>
      ),
    },
    {
      title: "Tác vụ",
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
            setSelectdealine(data.deadline);
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
            {" - "}
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
    setLoading(true);
    const response = await api.get("Order/GetOrdersToPickUp");
    console.log(response.data.data);
    setDataSource(response.data.data);
    setLoading(false);
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
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={{
          spinning: loading,
          indicator: <Spin />,
        }}
      ></Table>
      <Modal
        open={isOpen}
        title="GIAO ĐI NHẬN BẢN CỨNG"
        onCancel={() => {
          setIsOpen(false);
          formVariable.resetFields();
        }}
        onOk={() => formVariable.submit()}
        cancelText="Hủy"
        okText="Giao việc"
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item label="Nhân viên đi nhận" name={"shipperId"}>
            <Select options={shipper} />
          </Form.Item>
          <Form.Item
            label="Thời hạn"
            name={"deadline"}
            rules={[
              {
                validator: (_, value) => {
                  // Ensure that value is a valid dayjs object
                  if (!value) {
                    return Promise.reject(new Error("Vui lòng chọn thời hạn!"));
                  }

                  console.log(Selectdealine);
                  const selectedDeadline = dayjs(value); // Ensure it's a dayjs object
                  const previousDeadline = dayjs(Selectdealine); // Ensure date is a dayjs object

                  console.log(" ngay 1", selectedDeadline);
                  console.log("Ngay 2", previousDeadline);
                  if (selectedDeadline.isAfter(previousDeadline, "day")) {
                    return Promise.reject(
                      new Error("Thời hạn phải bé hơn thời hạn trước đó!")
                    );
                  }

                  return Promise.resolve(); // Validation passed if no rejection
                },
              },
            ]}
          >
            <DatePicker
              placeholder="Chọn ngày"
              disabledDate={(current) => {
                return (
                  current &&
                  (current.isSameOrBefore(dayjs(), "day") ||
                    current.isSameOrAfter(dayjs(Selectdealine), "day"))
                );
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AssignHardCopy;
