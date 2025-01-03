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
import { useEffect, useState } from "react";
import axios from "axios";
import { TruckOutlined } from "@ant-design/icons";

// Định nghĩa RADIAN
const RADIAN = Math.PI / 180;

function Report() {
  // // Food
  // const [dataFood, setDateFood] = useState(0);
  // const fetchFood = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://localhost:7173/api/AdminDashboard/dashboard/total-food-menu"
  //     );
  //     setDateFood(response.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchFood();
  // }, []);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // Chart
  const [data, setData] = useState([]);
  // const fetchChart = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://localhost:7173/api/AdminDashboard/GetTopFiveCustomer"
  //     );
  //     setData(response.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    // fetchChart();
  }, []);

  // Order
  const [dataOrder, setDateOrder] = useState(0);
  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7173/api/AdminDashboard/dashboard/total-orders"
      );
      setDateOrder(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // User
  // const [dataUser, setDataUser] = useState(0);
  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://localhost:7173/api/AdminDashboard/dashboard/active-user"
  //     );
  //     setDataUser(response.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <main className="main-container-report">
      <div className="main-title-report">
        <h3>STATISTICS</h3>
      </div>

      <div className="main-cards-report">
        <div className="card-report">
          <div className="card-inner-report">
            <BsFillArchiveFill className="card_icon-report" />
            <h3>Số lượng yêu cầu</h3>
            <h1>12</h1>
          </div>
        </div>
        <div className="card-report">
          <div className="card-inner-report">
            <BsFillGrid3X3GapFill className="card_icon-report" />
            <h3>Số lượng đơn hàng</h3>
            <h1>12</h1>
          </div>
        </div>
        <div className="card-report">
          <div className="card-inner-report">
            <BsPeopleFill className="card_icon-report" />
            <h3>Số lượng người dùng</h3>
            <h1>12</h1>
          </div>
        </div>
        <div className="card-report">
          <div className="card-inner-report">
            <TruckOutlined className="card_icon-report" />
            <h3>Tổng doanh thu</h3>
            <h1>12</h1>
          </div>
        </div>
      </div>

      <div className="charts-report w-full">
        <ResponsiveContainer width="100%" height={400} className="mx-auto">
          <BarChart
            data={data}
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
    </main>
  );
}

export default Report;
