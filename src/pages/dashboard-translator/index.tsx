import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRightOutlined,
  AuditOutlined,
  BellOutlined,
  BookOutlined,
  CopyOutlined,
  FileOutlined,
  FontSizeOutlined,
  FormOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import "./index.css";
import { toast } from "react-toastify";
import api from "../../config/api";

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
    label: <Link to={`/dashboardtranslator/${key}`}>{label}</Link>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Tài liệu đang dịch", "assignment", <FontSizeOutlined />),
  getItem("Lịch sử", "history", <HistoryOutlined />),
];

const DashboardTranslator: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const account = useSelector((store: RootState) => store.accountmanage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listNoti, setListNoti] = useState([]);
  const [countNoti, setCountNoti] = useState(0);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
      navigate("/login");
    }
  };

  const items1: MenuProps["items"] = [
    {
      label: "Đăng xuất",
      key: "logout",
      icon: <ArrowRightOutlined />,
    },
  ];

  //----------------------
  useEffect(() => {
    if (account) {
      const getListNoti = async () => {
        try {
          const res = await api.get(`Notification/${account.Id}`);
          if (res) {
            const arrResponse = res.data.data;

            setListNoti(arrResponse);
          }
        } catch (error) {
          toast.error("Không có thông báo");
        }
      };
      console.log("check");
      getListNoti();
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(listNoti) && listNoti.length > 0) {
      const count = listNoti.filter((item) => item.id).length;

      setCountNoti(count);
    }
  }, [listNoti]);

  const renderItem: MenuProps["items"] = useMemo(() => {
    if (Array.isArray(listNoti) && listNoti.length > 0) {
      const listRenderItem = listNoti?.map((item, index) => ({
        label: (
          <a
            key={index}
            href="https://www.antgroup.com"
            target="_blank"
            rel="noopener noreferrer"
            // onClick={() => {
            //   updateStatus(item.id);
            // }}
          >
            {item.message}
          </a>
        ),
        key: item.id.toString(),
      }));
      console.log("lít not", listRenderItem);
      return listRenderItem;
    }
  }, [listNoti]);

  const menuProps = {
    items: items1,
    onClick: handleMenuClick,
  };
  // (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="logout" icon={<ArrowRightOutlined />}>
  //       Đăng xuất
  //     </Menu.Item>
  //   </Menu>
  // );

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
          defaultSelectedKeys={["assignment"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="header-container">
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Dropdown menu={{ items: renderItem }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Badge count={countNoti} showZero>
                    <BellOutlined style={{ fontSize: "x-large" }} />
                  </Badge>
                </Space>
              </a>
            </Dropdown>

            <Dropdown.Button menu={menuProps} placement="bottomRight">
              <UserOutlined />
              {account.Username}
            </Dropdown.Button>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Translator</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
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
          ProTrans ©2024 được phát triển bởi đội ngũ chuyên nghiệp.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardTranslator;
