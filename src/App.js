import {
  Button,
  Card,
  Skeleton,
  Descriptions,
  Typography,
  Space,
  Col,
  Row,
  Divider,
} from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import LayoutComp from "./components/Layouts.comp";
import { getBreedDetails, getBreeds } from "./services/cats.service";
import { DownOutlined } from "@ant-design/icons";

const ContainerHeight = 400;

function App() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(0);
  const [detailBreed, setdetailBreed] = useState({
    loading: false,
    data: {},
  });
  const appendData = async () => {
    setloading(true);
    try {
      const dt = await getBreeds(page);
      console.log(dt);
      console.log(page);
      if (dt && dt.length > 0) {
        setpage(page + 1);
        setdata(data.concat(dt));
        setloading(false);
      }
    } catch (err) {
      setloading(false);
      console.error("appendData :", err);
      throw Error(err);
    }
  };
  const detailsData = async (item) => {
    setdetailBreed((prev) => ({ ...prev, loading: true }));
    try {
      const dt = await getBreedDetails(item.id);
      console.log(dt);
      if (dt && dt.length > 0) {
        setdetailBreed({ loading: false, data: dt });
      }
    } catch (err) {
      setdetailBreed((prev) => ({ ...prev, loading: false }));
      console.error("detailsData :", err);
      throw Error(err);
    }
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  return (
    <LayoutComp>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
        onScroll={onScroll}
      >
        {(item) => (
          <div key={item.id}>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  title={item.name}
                  bordered={true}
                  extra={
                    <Button type="text" onChange={() => detailsData(item)}>
                      <DownOutlined />
                    </Button>
                  }
                >
                  <Space direction="vertical">
                    <Typography.Text mark>{item.origin}</Typography.Text>
                    <Typography.Text>{item.description}</Typography.Text>
                  </Space>
                </Card>
              </Col>
            </Row>
            <Divider plain />
            {/* <Descriptions
              title="Responsive Descriptions"
              bordered
              column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
              }}
            >
              <Descriptions.Item label="Product">
                Cloud Database
              </Descriptions.Item>
              <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
              <Descriptions.Item label="time">18:00:00</Descriptions.Item>
              <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
              <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
              <Descriptions.Item label="Official">$60.00</Descriptions.Item>
              <Descriptions.Item label="Config Info">
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1
              </Descriptions.Item>
            </Descriptions> */}
          </div>
        )}
      </VirtualList>
      {loading &&
        Array(10)
          .fill(0)
          .map((x, idx) => {
            return <Skeleton active />;
          })}
    </LayoutComp>
  );
}

export default App;
