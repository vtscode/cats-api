// import logo from "./logo.svg";
// import "./App.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ListAllComp } from "./components";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      {/* <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header> */}
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Cats</Breadcrumb.Item>
        </Breadcrumb>
        <ListAllComp />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
