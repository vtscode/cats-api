import { Col, Row } from "antd";
import { memo } from "react";

const WrapperRate = ({ title, children }) => {
  return (
    <>
      <Row justify="start" gutter={[16, 0]} align="middle">
        <Col span={{ xs: 24, sm: 12 }}>{title}</Col>
        <Col span={{ xs: 24, sm: 12 }}>{children}</Col>
      </Row>
      <br />
    </>
  );
};

export default memo(WrapperRate);
