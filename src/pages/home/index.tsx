import { Layout, Typography, Row, Col, Button, Card, List, Avatar } from "antd";
import {
  CheckCircleOutlined,
  TranslationOutlined,
  GlobalOutlined,
  LikeOutlined,
  FormOutlined,
  TruckOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import "./index.css"; // Import CSS
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const services = [
  {
    title: "Dịch tài liệu",
    description:
      "Chúng tôi cung cấp dịch vụ dịch thuật chuyên nghiệp cho mọi loại tài liệu, đáp ứng" +
      " nhu cầu đa dạng của khách hàng. Đội ngũ dịch giả của chúng tôi đảm bảo chuyển tải thông điệp một cách chính xác và tự nhiên.",
    icon: (
      <TranslationOutlined
        className="service-icon"
        style={{ color: "#1890ff" }}
      />
    ),
  },
  {
    title: "Công chứng",
    description:
      "Chúng tôi còn hỗ trợ khách hàng trong việc đem tài liệu đi công chứng. Sau khi tài liệu được dịch, chúng tôi" +
      " sẽ giúp bạn chuẩn bị đầy đủ các bước cần thiết để công chứng tài liệu, đảm bảo tài liệu của bạn được xác thực và có giá trị pháp lý.",
    icon: (
      <FormOutlined className="service-icon" style={{ color: "#52c41a" }} />
    ),
  },
  {
    title: "Vận chuyển",
    description:
      "Chúng tôi hiểu rằng thời gian là rất quý giá đối với khách hàng, vì vậy công ty chúng tôi cung cấp dịch vụ nhận và giao tài liệu tận nhà. Với dịch vụ này, bạn không cần" +
      " phải mất thời gian di chuyển, chỉ cần đặt lịch hẹn, và chúng tôi sẽ đến tận nơi để nhận tài liệu cần dịch.",
    icon: (
      <TruckOutlined className="service-icon" style={{ color: "#eb2f96" }} />
    ),
  },
];

const testimonials = [
  {
    name: "Nguyễn Văn A",
    feedback: "Dịch vụ dịch thuật chuyên nghiệp và đúng hạn. Tôi rất hài lòng!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Trần Thị B",
    feedback: "Chất lượng bản dịch tuyệt vời, rất chi tiết và chuẩn xác.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Lê Văn C",
    feedback:
      "Dịch vụ nhanh chóng, nhân viên thân thiện, hỗ trợ rất nhiệt tình.",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const account = useSelector((store: RootState) => store.accountmanage);
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="hero-image-section">
        <img
          src="https://thetranslationcompany.com/wp-content/uploads/2022/05/The-Translation-Services.jpg" // Thay thế bằng URL của hình ảnh bạn muốn chèn
          alt="Giới thiệu dịch vụ"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Content className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <Title className="hero-title">
            Hệ thống dịch thuật tiêu chuẩn quốc tế
          </Title>
          <Paragraph className="hero-paragraph">
            Công ty dịch thuật <strong>ProTrans</strong> tự hào là{" "}
            <em> một trong những công ty dịch thuật hàng đầu</em> được khách
            hàng tin tưởng lựa chọn tại Thành phố Hồ Chí Minh. Kể từ khi thành
            lập cho đến nay, <strong>ProTrans</strong> đã có một hành trình phát
            triển nhanh chóng và bền vững, nhờ vào chất lượng dịch vụ mà chúng
            tôi mang đến cho khách hàng của mình. Với đội ngũ dịch giả chuyên
            nghiệp, giàu kinh nghiệm và am hiểu sâu sắc về ngôn ngữ, văn hóa,
            cùng với sự đầu tư bài bản vào công nghệ dịch thuật hiện đại,{" "}
            <strong>ProTrans</strong> đã tạo dựng được <em>uy tín vững chắc</em>{" "}
            trong ngành dịch thuật.
          </Paragraph>
          <Button
            onClick={() => {
              if (account) {
                navigate("/sendrequest");
                window.scrollTo(0, 0);
              } else {
                navigate("/login");
              }
            }}
            type="primary"
            size="large"
            className="hero-button"
          >
            Gửi yêu cầu
          </Button>
          <Button type="default" size="large" className="hero-button">
            Liên hệ tư vấn
          </Button>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <Title className="services-title">Dịch vụ của chúng tôi</Title>
          <Row gutter={16}>
            {services.map((service, index) => (
              <Col span={8} key={index}>
                <Card hoverable className="service-card">
                  {service.icon}
                  <Title level={3} className="service-description">
                    {service.title}
                  </Title>
                  <Paragraph>{service.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us">
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={12}>
              <Card hoverable className="choose-us-card">
                <Title
                  className="choose-us-title"
                  style={{
                    color: "white",
                    marginBottom: "50px",
                    backgroundColor: "red",
                    borderRadius: "18.5px",
                  }}
                >
                  Tại sao nên chọn ProTrans?
                </Title>
                <Paragraph style={{ textAlign: "left" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "green",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  />
                  <strong>ProTrans</strong> sở hữu đội ngũ dịch thuật viên
                  chuyên nghiệp, có trình độ cao và nhiều năm kinh nghiệm, đảm
                  bảo chất lượng dịch vụ tối ưu.
                </Paragraph>
                <Paragraph style={{ textAlign: "left" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "green",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  />
                  Với 15 năm hoạt động trong ngành dịch thuật,{" "}
                  <strong>ProTrans</strong> đã xây dựng được uy tín vững chắc và
                  mối quan hệ tốt với khách hàng.
                </Paragraph>
                <Paragraph style={{ textAlign: "left" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "green",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  />
                  <strong>ProTrans</strong> có nhiều chi nhánh tại Thành phố Hồ
                  Chí Minh, giúp khách hàng dễ dàng tiếp cận dịch vụ nhanh chóng
                  và thuận tiện.
                </Paragraph>
                <Paragraph style={{ textAlign: "left" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "green",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  />
                  Chúng tôi cam kết bảo mật thông tin tài liệu, đồng thời cung
                  cấp dịch vụ tận nhà, mang đến sự thuận lợi cho khách hàng.
                </Paragraph>
              </Card>
            </Col>
            <Col span={12}>
              <Card hoverable className="choose-us-card">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/2NviFBvJuak"
                    title="Video title"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0 }}
                  ></iframe>
                </div>
              </Card>
            </Col>
          </Row>

          {/* <Row gutter={16}>
            <Col span={24}>
              <Card
                hoverable
                className="choose-us-card"
                cover={<img alt="Team" src="URL_TO_YOUR_IMAGE" />}
              >
                <Paragraph>
                  Đội ngũ dịch thuật chuyên nghiệp và tận tâm.
                </Paragraph>
              </Card>
            </Col>
          </Row> */}
        </div>

        {/* Testimonials Section */}
        {/* <div className="testimonials-section">
          <Title className="testimonials-title">
            Khách hàng nói gì về chúng tôi?
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={testimonials}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.name}
                  description={item.feedback}
                />
              </List.Item>
            )}
          />
        </div> */}
      </Content>
    </Layout>
  );
};

export default Home;
