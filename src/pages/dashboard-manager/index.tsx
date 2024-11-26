import React, { useState } from "react";
import {
  AuditOutlined,
  BookOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboardmanager/${key}`}>{label}</Link>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Ngôn Ngữ", "language", <TranslationOutlined />),
  getItem("Bảng Giá", "quoteprice", <BookOutlined />),
  getItem("Loại Công Chứng", "notarization", <AuditOutlined />),
  getItem("Đơn Hàng", "order", <ShoppingCartOutlined />),
  getItem("Tạo đơn hàng", "createOrder", <FormOutlined />),
  getItem("Giao việc vận chuyển", "assignshipper", <FormOutlined />),
  getItem("Giao Việc Công Chứng", "assignNotarization", <FormOutlined />),
  getItem("Giao Đi nhận bản Cứng", "assignhardcopy", <FormOutlined />),
  // getItem("Task Notarization List", "tasknotarizationlist", <FormOutlined />),
];

const DashboardManager: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const account = useSelector((store: RootState) => store.accountmanage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Manager</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>{account.Username}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Button
                type="primary"
                style={{ background: "red" }}
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Đăng xuất
              </Button>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Protrans ©{new Date().getFullYear()} Created by ProTransTeam
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardManager;
