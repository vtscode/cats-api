import { Col, Row } from "antd";

const WrapperRate = ({ title, children }) => {
  return (
    <>
      <Row justify="start" gutter={[20, 0]} align="middle">
        <Col>{title}</Col>
        <Col>:</Col>
        <Col>{children}</Col>
      </Row>
      <br />
    </>
  );
};

export default WrapperRate;
