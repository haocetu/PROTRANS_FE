import { Col, Divider, Row, Typography } from "antd";
import "./index.css";
import {
  FacebookFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

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
              className="footer-logo"
            ></img>
            <Paragraph className="footer-paragraph">
              <PushpinOutlined className="footer-icon" />
              Trụ sở chính: 121 Phước Thiện, Phường Long Bình, TP. Thủ Đức.
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <PhoneOutlined className="footer-icon" />
              Liên hệ: 0974 222 011.
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <MailOutlined className="footer-icon" />
              Email: protrans2024@gmail.com
            </Paragraph>
            <Row gutter={16} className="footer-links">
              <Col span={8}>
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "24px" }}
                >
                  Về chúng tôi
                </Title>
                <ul className="footer-list">
                  <li>
                    <a href="#" className="footer-link">
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Tin tức
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Báo giá dịch thuật
                    </a>
                  </li>
                </ul>
              </Col>
              <Col span={8}>
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "24px" }}
                >
                  Hỗ trợ khách hàng
                </Title>
                <ul className="footer-list">
                  <li>
                    <a href="#" className="footer-link">
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Chính sách giao hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Chính sách bản quyền
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Các điều khoản và điều kiện
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Tư vấn pháp lý
                    </a>
                  </li>
                </ul>
              </Col>
              <Col span={8}>
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "24px" }}
                >
                  Theo dõi chúng tôi
                </Title>
                <InstagramOutlined className="social-icon" />
                <FacebookFilled className="social-icon" />
                <YoutubeOutlined className="social-icon" />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415305057!2d106.80730807533!3d10.841132857996238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1729700674030!5m2!1svi!2s"
                width="800"
                height="400"
                className="map-frame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
        <Divider orientation="left" className="custom-divider"></Divider>
        <div className="footer-note">
          ProTrans ©2024 được phát triển bởi đội ngũ chuyên nghiệp.
        </div>
      </div>
    </div>
  );
}

export default Footer;
