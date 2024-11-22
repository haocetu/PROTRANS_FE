import { Col, Divider, Row, Typography } from "antd";
import "./index.css";
import { PhoneFilled, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <Row gutter={16}>
          <Col span={12}>
            <img
              src="/bank-images/ProTranslogo_standard_white.png"
              alt="logo"
              width={280}
              style={{ marginBottom: "20px" }}
            ></img>
            <Paragraph style={{ color: "white" }}>
              <PushpinOutlined
                style={{
                  marginRight: "8px",
                  fontSize: "14px",
                }}
              />
              Trụ sở chính: 121 Phước Thiện, Phường Long Bình, TP. Thủ Đức.
            </Paragraph>
            <Paragraph style={{ color: "white" }}>
              <PhoneOutlined
                style={{
                  marginRight: "8px",
                  fontSize: "14px",
                }}
              />
              Liên hệ: 0974 222 011.
            </Paragraph>
          </Col>
          <Col span={12}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415305057!2d106.80730807533!3d10.841132857996238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1729700674030!5m2!1svi!2s"
                width="800"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
        <Divider orientation="left" className="custom-divider"></Divider>
        <div style={{ textAlign: "center", margin: "20px" }}>
          ProTrans ©2024 được phát triển bởi đội ngũ chuyên nghiệp.
        </div>
      </div>
    </div>
  );
}

export default Footer;
