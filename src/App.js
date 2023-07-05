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
  message,
} from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { LayoutComp } from "./components";
import { getBreedImage, getBreeds } from "./services/cats.service";
import {
  DownOutlined,
  UpOutlined,
  StarOutlined,
  StarFilled,
  LinkOutlined,
} from "@ant-design/icons";

const ContainerHeight = 500;

function App() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(0);
  const [detailBreed, setdetailBreed] = useState([
    // {
    //   images: [],
    // },
  ]);
  const [expandedId, setexpandedId] = useState([]);
  const appendData = async () => {
    setloading(true);
    try {
      const dt = await getBreeds(page);
      // console.log(dt);
      // console.log(page);
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
    console.log(item);
    try {
      // check data
      const indxbreed = expandedId.indexOf(item.id);
      if (indxbreed > -1) {
        const newArr = expandedId.filter((x) => x !== item.id);
        setexpandedId(newArr);
      } else {
        setexpandedId(expandedId.concat(item.id));
      }
      const findBreed = detailBreed.findIndex((x) => x.id === item.id);
      if (findBreed === -1) {
        const dt = await getBreedImage(item.id);
        if (dt && dt.length > 0) {
          // set new data and store it in array
          const data = {
            id: item.id,
            images: dt,
          };
          setdetailBreed(detailBreed.concat(data));
        }
      }
    } catch (err) {
      // setdetailBreed((prev) => ({ ...prev, loading: false }));
      console.error("detailsData :", err);
      message.error("Error get detail data");
      // throw Error(err);
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

  const generateRating = (rate) => {
    if (rate === 0) {
      return (
        <Row gutter={[20]}>
          {Array(5)
            .fill(0)
            .map((x, idx) => (
              <>
                <StarOutlined key={idx} />
              </>
            ))}
        </Row>
      );
    }
    if (rate === 5) {
      return (
        <Row>
          {Array(5)
            .fill(0)
            .map((x, idx) => (
              <>
                <StarFilled key={idx} />
              </>
            ))}
        </Row>
      );
    }

    return (
      <Row gutter={20}>
        {Array(rate)
          .fill(0)
          .map((x, idx) => (
            <StarFilled key={idx} />
          ))}
        {Array(5 - rate)
          .fill(0)
          .map((x, idx) => (
            <StarOutlined key={5 - idx} />
          ))}
      </Row>
    );
  };

  return (
    <LayoutComp>
      <Typography.Title>Cats List</Typography.Title>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
        onScroll={onScroll}
      >
        {(item) => (
          <div key={item.id}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  title={item.name}
                  bordered={true}
                  extra={
                    <Button type="text" onClick={() => detailsData(item)}>
                      {expandedId.find((x) => x === item.id) ? (
                        <UpOutlined />
                      ) : (
                        <DownOutlined />
                      )}
                    </Button>
                  }
                  headStyle={{
                    background: "#dedede",
                  }}
                >
                  <Space direction="vertical">
                    <Typography.Text mark>{item.origin}</Typography.Text>
                    <Typography.Text>{item.description}</Typography.Text>
                  </Space>
                </Card>
                {expandedId.find((x) => x === item.id) && (
                  <Descriptions
                    title="Detail Cats"
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
                    <Descriptions.Item label="Life Span">
                      {item.life_span}
                    </Descriptions.Item>
                    <Descriptions.Item label="Temperament">
                      {item.temperament}
                    </Descriptions.Item>
                    <Descriptions.Item label="Country Codes">
                      {item.country_codes}
                    </Descriptions.Item>
                    <Descriptions.Item label="Weight Imperial">
                      {item.weight.imperial}
                    </Descriptions.Item>
                    <Descriptions.Item label="Weight Metric">
                      {item.weight.metric}
                    </Descriptions.Item>
                    <Descriptions.Item label="Origin">
                      {item.origin}
                    </Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Adaptability</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.adaptability)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Health Issues</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.health_issues)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Intelligence</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.intelligence)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Hairless</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.hairless)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Affection Level</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.affection_level)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Child Friendly</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.child_friendly)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Dog Friendly</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.dog_friendly)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Energy Level</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.energy_level)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Grooming</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.grooming)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Shedding Level</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.shedding_level)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Social Needs</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.social_needs)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Stranger Friendly</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.stranger_friendly)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Vocalisation</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.vocalisation)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Experimental</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.experimental)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Natural</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.natural)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Rare</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.rare)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Rex</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.rex)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Suppressed Tail</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.suppressed_tail)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Short Legs</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.short_legs)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Hypoallergenic</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.hypoallergenic)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Lap</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.lap)}</Col>
                      </Row>
                      <br />
                      <Row justify="start" gutter={[20, 0]} align="middle">
                        <Col>Indoor</Col>
                        <Col>:</Col>
                        <Col>{generateRating(item.indoor)}</Col>
                      </Row>
                      <Divider />
                      <Button
                        icon={<LinkOutlined />}
                        type="text"
                        onClick={() => window.open(item.wikipedia_url)}
                      >
                        Wikipedia
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
                )}
              </Col>
            </Row>
            <Divider plain />
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
