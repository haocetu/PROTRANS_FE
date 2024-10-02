import { Col, Row } from "antd";
import React from "react";

type AuthenlayoutProps = {
  children: React.ReactNode;
};
function Authenlayout({ children }: AuthenlayoutProps) {
  return (
    <div>
      <Row align={"middle"} gutter={30}>
        <Col span={12}>
          <img
            src="https://wallpaperaccess.com/full/4525693.jpg"
            width={750}
            height={650}
          />
        </Col>
        <Col span={12}>{children}</Col>
      </Row>
    </div>
  );
}

export default Authenlayout;
