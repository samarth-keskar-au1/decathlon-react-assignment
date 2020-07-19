import { Row, Col, Button } from "antd";

export default function ImageRow(props) {
  let { data } = props;
  let content = data.content ? data.content.split("[")[0] : "";
  
  return (
    <Row gutter={[32, 24]} justify="center">
      <Col span={20} offset={1}>
        <img
          alt={data.title}
          src={
            data.urlToImage && data.urlToImage != "null"
              ? data.urlToImage
              : "https://dummyimage.com/350x250/ffffff/000000.jpg&text=No+Image"
          }
          style={{
            width: "100%",
            height: "70%",
            maxWidth: "100%",
          }}
        />
        <p style={{ marginTop: 50, fontSize: 20 }}>
          {content}{" "}
          <Button
            onClick={() => window.open(data.url, "_blank")}
            size="large"
            type="link"
          >
            Read More
          </Button>
        </p>
      </Col>
      <Col
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 0 }}
        lg={{ span: 1, offset: 1 }}
        xl={{ span: 1, offset: 1 }}
      >
        
      </Col>
    </Row>
  );
}
