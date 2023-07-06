import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import "./layout.comp.css";

const { Header, Sider, Content } = Layout;

const LayoutComp = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout__container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Cats",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Other",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="layout__header"
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            className="layout__header--btn"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          className="layout__content"
          style={{
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComp;
