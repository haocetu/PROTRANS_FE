import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaSackDollar } from "react-icons/fa6";
import "./index.css";
import { TruckOutlined } from "@ant-design/icons";
import { DatePicker, Form } from "antd";
import api from "../../config/api";
import { useState } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;

// Định nghĩa RADIAN
const RADIAN = Math.PI / 180;

function Report() {
  const [data, setData] = useState({
    numberOfRequests: 0,
    numberOfOrders: 0,
    numberOfAccounts: 0,
    revenue: 0,
  });
  const token = localStorage.getItem("token");

  const handleDateChange = async (value, dateString) => {
    if (value && dateString.length === 2) {
      const [fromTime, toTime] = value.map(
        (date) => date.toISOString() // Format ngày trước khi truyền vào API
      );

      try {
        const response = await api.get(`Dashboard`, {
          params: {
            fromTime,
            toTime,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is valid
          },
        });

        console.log("API Response:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        // Log detailed error for debugging
        if (error.response) {
          console.error("API Error Response:", error.response.data);
          console.error("API Status Code:", error.response.status);
        } else {
          console.error("Unexpected Error:", error.message);
        }
      }
    }
  };

  return (
    <main className="main-container-report">
      <div className="main-title-report">
        <h3>THỐNG KÊ</h3>
      </div>
      <Form>
        <Form.Item>
          <RangePicker
            // showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => {
              const today = moment().endOf("day");
              return (
                // Không cho phép chọn ngày tương lai
                current && current > today
              );
            }}
            onChange={handleDateChange}
          />
        </Form.Item>
      </Form>
      <div className="main-cards-report">
        <div className="card-report">
          <div className="card-inner-report">
            <BsFillArchiveFill className="card_icon-report" />
            <h3>Số lượng yêu cầu</h3>
            <h1>{data.numberOfRequests ?? 0}</h1>
          </div>
        </div>
        <div className="card-report">
          <div className="card-inner-report">
            <BsFillGrid3X3GapFill className="card_icon-report" />
            <h3>Số lượng đơn hàng</h3>
            <h1>{data.numberOfOrders ?? 0}</h1>
          </div>
        </div>
        <div className="card-report">
          <div className="card-inner-report">
            <BsPeopleFill className="card_icon-report" />
            <h3>Số lượng người dùng</h3>
            <h1>{data.numberOfAccounts ?? 0}</h1>
          </div>
        </div>
        <div className="card-report">
          <div className="card-inner-report">
            <TruckOutlined className="card_icon-report" />
            <h3>Tổng doanh thu</h3>
            <h1>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.revenue ?? 0)}
            </h1>
          </div>
        </div>
      </div>

      <div>
        <div className="charts-report w-full">
          <ResponsiveContainer width="100%" height={400} className="mx-auto">
            <BarChart
              //data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="customerName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalOrders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Report;
