import { Row } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const Rate = ({ rating }) => {
  let rt = parseInt(rating);
  if (rt === 0) {
    return (
      <Row gutter={[20]}>
        {Array(5)
          .fill(0)
          .map((x, idx) => (
            <StarOutlined key={idx} />
          ))}
      </Row>
    );
  }
  if (rt === 5) {
    return (
      <Row>
        {Array(5)
          .fill(0)
          .map((x, idx) => (
            <StarFilled key={idx} />
          ))}
      </Row>
    );
  }
  if (isNaN(rt)) {
    rt = 0;
  }

  return (
    <Row gutter={20}>
      {Array(rt)
        .fill(0)
        .map((x, idx) => (
          <StarFilled key={idx} />
        ))}
      {Array(5 - rt)
        .fill(0)
        .map((x, idx) => (
          <StarOutlined key={5 - idx} />
        ))}
    </Row>
  );
};

export default Rate;
