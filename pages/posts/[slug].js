import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import { Row, Col, PageHeader } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ImageRow from "../../components/ImageRow";
import Loader from "react-spinners/PropagateLoader";
import HeadlineCard from "../../components/HeadlineCard";
import QueueAnim from "rc-queue-anim";

function Post({ router }) {
  let data = router.query;
  let [isLoading, setIsLoading] = useState(false);
  let [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchRelatedArticles() {
      setIsLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.API_KEY}&pageSize=5`
      );
      const relatedArticles = await res.json();
      setArticles(relatedArticles.articles);
      setIsLoading(false);
    }
    fetchRelatedArticles();
  }, []);
  return (
    <React.Fragment>
      <Row
        gutter={[32, 24]}
        justify="center"
        style={{ marginTop: 15, paddingBottom: 40 }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <QueueAnim type="bottom" delay={200}>
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title={
                <span style={{ whiteSpace: "initial" }}>{data.title}</span>
              }
              backIcon={
                <ArrowLeftOutlined style={{ fontSize: 25, marginRight: 25 }} />
              }
            />

            <ImageRow data={data} />
          </QueueAnim>
        </Col>
      </Row>

      <Row gutter={[32, 24]} justify="center" style={{ paddingTop: 15 }}>
        {isLoading && (
          <Col xs={21} sm={14} md={11} lg={8} xl={5}>
            <Loader size={20} color={"#1890ff"} loading={isLoading} />
          </Col>
        )}
      </Row>
      <Row gutter={[32, 24]} justify="center" style={{ paddingTop: 15 }}>
        {articles &&
          articles.map((article) => (
            <Col key={article.url} xs={21} sm={14} md={11} lg={8} xl={5}>
              <QueueAnim type="bottom" delay={200}>
                <HeadlineCard key={article.url} articleInfo={article} />
              </QueueAnim>
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
}

export default withRouter(Post);
