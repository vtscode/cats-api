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
} from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { LayoutComp } from "../../components";
import { getBreedImage, getBreeds } from "../../services/cats.service";
import { DownOutlined, UpOutlined, LinkOutlined } from "@ant-design/icons";
import Rate from "./Rate";
import WrapperRate from "./WrapperRate";
import SearchCat from "./SearchCat";
import SkeletonComp from "./SkeletonComp";
import CarouselComp from "./CarouselComp";

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
      // console.log(dt);
      // console.log(page);
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
      throw Error(err);
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
          // set new data and store it in array
          const data = {
            [item.id]: dt,
          };

          setdetailBreed((prev) => ({ ...prev, ...data }));
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

  const onSelectedSearch = (value) => {
    setsearch(value);
    const filtersearch = data.filter((x) => x.id === value);
    setfilterData(filtersearch);
  };

  return (
    <LayoutComp>
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Title level={2}>Cats List</Typography.Title>
        </Col>
        <Col>
          <SearchCat
            arrSearch={arrSearch}
            onSelectedSearch={onSelectedSearch}
          />
        </Col>
      </Row>
      <VirtualList
        data={search ? filterData : data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
        onScroll={onScroll}
        onLoad={() => <SkeletonComp loading={true} />}
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
                <br />
                {expandedId.length > 0 &&
                  expandedId.find((x) => x === item.id) && (
                    <div>
                      <CarouselComp detailBreed={detailBreed[item.id]} />

                      {/* data */}
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
                          {item?.weight?.imperial}
                        </Descriptions.Item>
                        <Descriptions.Item label="Weight Metric">
                          {item?.weight?.metric}
                        </Descriptions.Item>
                        <Descriptions.Item label="Origin">
                          {item.origin}
                        </Descriptions.Item>
                        <Descriptions.Item label="More Information">
                          <WrapperRate title="Adaptability">
                            <Rate rating={item.adaptability} />
                          </WrapperRate>
                          <WrapperRate title="Health Issues">
                            <Rate rating={item.health_issues} />
                          </WrapperRate>
                          <WrapperRate title="Intelligence">
                            <Rate rating={item.intelligence} />
                          </WrapperRate>
                          <WrapperRate title="Hairless">
                            <Rate rating={item.hairless} />
                          </WrapperRate>
                          <WrapperRate title="Affection Level">
                            <Rate rating={item.affection_level} />
                          </WrapperRate>
                          <WrapperRate title="Child Friendly">
                            <Rate rating={item.child_friendly} />
                          </WrapperRate>
                          <WrapperRate title="Dog Friendly">
                            <Rate rating={item.dog_friendly} />
                          </WrapperRate>
                          <WrapperRate title="Energy Level">
                            <Rate rating={item.energy_level} />
                          </WrapperRate>
                          <WrapperRate title="Grooming">
                            <Rate rating={item.grooming} />
                          </WrapperRate>
                          <WrapperRate title="Shedding Level">
                            <Rate rating={item.shedding_level} />
                          </WrapperRate>
                          <WrapperRate title="Social Needs">
                            <Rate rating={item.social_needs} />
                          </WrapperRate>
                          <WrapperRate title="Stranger Friendly">
                            <Rate rating={item.stranger_friendly} />
                          </WrapperRate>
                          <WrapperRate title="Vocalisation">
                            <Rate rating={item.vocalisation} />
                          </WrapperRate>
                          <WrapperRate title="Experimental">
                            <Rate rating={item.experimental} />
                          </WrapperRate>
                          <WrapperRate title="Natural">
                            <Rate rating={item.natural} />
                          </WrapperRate>
                          <WrapperRate title="Rare">
                            <Rate rating={item.rare} />
                          </WrapperRate>
                          <WrapperRate title="Rex">
                            <Rate rating={item.rex} />
                          </WrapperRate>
                          <WrapperRate title="Suppressed Tail">
                            <Rate rating={item.suppressed_tail} />
                          </WrapperRate>
                          <WrapperRate title="Short Legs">
                            <Rate rating={item.short_legs} />
                          </WrapperRate>
                          <WrapperRate title="Hypoallergenic">
                            <Rate rating={item.hypoallergenic} />
                          </WrapperRate>
                          <WrapperRate title="Lap">
                            <Rate rating={item.lap} />
                          </WrapperRate>
                          <WrapperRate title="Indoor">
                            <Rate rating={item.indoor} />
                          </WrapperRate>
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
      <SkeletonComp loading={loading} />
    </LayoutComp>
  );
}

export default App;
