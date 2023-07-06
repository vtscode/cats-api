import {
  Button,
  Card,
  Descriptions,
  Typography,
  Space,
  Col,
  Row,
  Divider,
  message,
  Spin,
  Rate,
  Tag,
} from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { LayoutComp } from "../../components";
import { getBreedImage, getBreeds } from "../../services/cats.service";
import { DownOutlined, UpOutlined, LinkOutlined } from "@ant-design/icons";
// import Rate from "./Rate";
import WrapperRate from "./WrapperRate";
import SearchCat from "./SearchCat";
import CarouselComp from "./CarouselComp";
import "./styles/index.css";

const ContainerHeight = 500;

function App() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [page, setpage] = useState(0);
  const [detailBreed, setdetailBreed] = useState({});
  const [expandedId, setexpandedId] = useState([]);
  const [search, setsearch] = useState("");
  const [arrSearch, setarrSearch] = useState([]);

  const appendData = async () => {
    setloading(true);
    try {
      const dt = await getBreeds(page);
      if (dt && dt.length > 0) {
        const arr = dt.map((x) => ({ label: x.name, value: x.id }));
        setarrSearch(arrSearch.concat(arr));
        setpage(page + 1);
        setdata(data.concat(dt));
        setloading(false);
        message.success("10 more data showed");
      }
    } catch (err) {
      setloading(false);
      console.error("appendData :", err);
      message.error("Error get more data");
    }
  };
  const detailsData = async (item) => {
    try {
      // check data
      const indxbreed = expandedId.indexOf(item.id);
      if (indxbreed > -1) {
        const newArr = expandedId.filter((x) => x !== item.id);
        setexpandedId(newArr);
      } else {
        setexpandedId(expandedId.concat(item.id));
      }
      const findBreed = detailBreed[item.id];
      if (!Boolean(findBreed)) {
        const dt = await getBreedImage(item.id);
        if (dt && dt.length > 0) {
          // set new data and store it in object
          const data = {
            [item.id]: dt,
          };

          setdetailBreed((prev) => ({ ...prev, ...data }));
        }
      }
    } catch (err) {
      console.error("detailsData :", err);
      message.error("Error get detail data");
    }
  };
  useEffect(() => {
    appendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        ContainerHeight &&
      !Boolean(search)
    ) {
      appendData();
    }
  };
  const onSearch = (value) => {
    if (value) {
      setsearch(value);
      const filtersearch = data.filter(
        (x) =>
          x.origin.includes(value) ||
          x.id.includes(value) ||
          x.name.includes(value)
      );
      setfilterData(filtersearch);
    }
  };
  const onSelectedSearch = (value) => {
    setsearch(value);
    const filtersearch = data.filter((x) => x.id === value);
    setfilterData(filtersearch);
  };

  return (
    <LayoutComp>
      <div className="wrapper__container">
        <Row
          justify="space-between"
          align="middle"
          gutter={[0, 0]}
          style={{ margin: "12px auto" }}
        >
          <Col span={{ xs: 24, sm: 12 }}>
            <Typography.Title level={2}>Cats List</Typography.Title>
          </Col>
          <Col span={{ xs: 24, sm: 12 }} flex="none">
            <SearchCat
              arrSearch={arrSearch}
              onSearch={onSearch}
              onSelectedSearch={onSelectedSearch}
            />
          </Col>
        </Row>
        {loading && (
          <Row justify="center" style={{ margin: "12px" }}>
            <Spin />
          </Row>
        )}
        <VirtualList
          data={search ? filterData : data}
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
                      <Typography.Title level={5} className="card__country">
                        Country Origin: <Tag>{item.origin}</Tag>
                      </Typography.Title>
                      <Typography.Text>{item.description}</Typography.Text>
                    </Space>
                  </Card>
                  <br />
                  {expandedId.length > 0 &&
                    expandedId.find((x) => x === item.id) && (
                      <div>
                        <CarouselComp detailBreed={detailBreed[item.id]} />
                        <Descriptions
                          title=""
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
                            <Space size={[0, 8]} wrap>
                              {item.temperament.split(",").map((x, idx) => (
                                <Tag key={idx} color="#108ee9">
                                  {x}
                                </Tag>
                              ))}
                            </Space>
                          </Descriptions.Item>
                          <Descriptions.Item label="Country Codes">
                            {item.country_codes}
                          </Descriptions.Item>
                          <Descriptions.Item label="Weight Imperial">
                            {item?.weight?.imperial}
                          </Descriptions.Item>
                          <Descriptions.Item label="Weight Metric">
                            {item?.weight?.metric}
                          </Descriptions.Item>
                          <Descriptions.Item label="Origin">
                            {item.origin}
                          </Descriptions.Item>
                          <Descriptions.Item label="More Information">
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Adaptability">
                                  <Rate
                                    disabled
                                    defaultValue={item.adaptability}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Intelligence">
                                  <Rate
                                    disabled
                                    defaultValue={item.intelligence}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Health Issues">
                                  <Rate
                                    disabled
                                    defaultValue={item.health_issues}
                                  />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Hairless">
                                  <Rate disabled defaultValue={item.hairless} />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Affection Level">
                                  <Rate
                                    disabled
                                    defaultValue={item.affection_level}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Child Friendly">
                                  <Rate
                                    disabled
                                    defaultValue={item.child_friendly}
                                  />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Dog Friendly">
                                  <Rate
                                    disabled
                                    defaultValue={item.dog_friendly}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Energy Level">
                                  <Rate
                                    disabled
                                    defaultValue={item.energy_level}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Grooming">
                                  <Rate disabled defaultValue={item.grooming} />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Shedding Level">
                                  <Rate
                                    disabled
                                    defaultValue={item.shedding_level}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Social Needs">
                                  <Rate
                                    disabled
                                    defaultValue={item.social_needs}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Stranger Friendly">
                                  <Rate
                                    disabled
                                    defaultValue={item.stranger_friendly}
                                  />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Vocalisation">
                                  <Rate
                                    disabled
                                    defaultValue={item.vocalisation}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Experimental">
                                  <Rate
                                    disabled
                                    defaultValue={item.experimental}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Natural">
                                  <Rate disabled defaultValue={item.natural} />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Rare">
                                  <Rate disabled defaultValue={item.rare} />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Rex">
                                  <Rate disabled defaultValue={item.rex} />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Suppressed Tail">
                                  <Rate
                                    disabled
                                    defaultValue={item.suppressed_tail}
                                  />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Short Legs">
                                  <Rate
                                    disabled
                                    defaultValue={item.short_legs}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Hypoallergenic">
                                  <Rate
                                    disabled
                                    defaultValue={item.hypoallergenic}
                                  />
                                </WrapperRate>
                              </Col>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Lap">
                                  <Rate disabled defaultValue={item.lap} />
                                </WrapperRate>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <WrapperRate title="Indoor">
                                  <Rate disabled defaultValue={item.indoor} />
                                </WrapperRate>
                              </Col>
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
                      </div>
                    )}
                </Col>
              </Row>
              <Divider plain />
            </div>
          )}
        </VirtualList>
      </div>
    </LayoutComp>
  );
}

export default App;
