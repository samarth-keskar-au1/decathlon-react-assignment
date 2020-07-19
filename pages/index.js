import HeadlineCard from "../components/HeadlineCard";
import { useEffect, useRef, useState, useCallback } from "react";
import { Row, Col, Result } from "antd";
import InfiniteLoader from "react-infinite-loader";
import { css } from "@emotion/core";
import Loader from "react-spinners/PropagateLoader";
import QueueAnim from "rc-queue-anim";

export default function Home(props) {
  let [articles, setArticles] = useState(props.data.articles);
  let [totalResults, setTotalResults] = useState(props.data.totalResults);
  let [currentPageNumber, setCurrentPageNumber] = useState(2);
  let [isLoading, setIsLoading] = useState(false);

  let [url, setUrl] = useState(null);
  const isFirstRun = useRef(true);
  const override = css``;

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    async function fetchChangedSourceData() {
      setIsLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${props.currentSource}&apiKey=${process.env.API_KEY}&pageSize=8&page=1`
      );
      const data = await res.json();

      setArticles(data.articles ? data.articles : null);
      setTotalResults(data.totalResults);
      setUrl(
        `https://newsapi.org/v2/top-headlines?sources=${props.currentSource}&apiKey=${process.env.API_KEY}&pageSize=8`
      );
      setCurrentPageNumber(2);
      setIsLoading(false);
    }
    fetchChangedSourceData();
  }, [props.currentSource]);

  async function fetchMore() {
    if (articles.length - 1 >= 99) {
      return;
    }

    if (articles.length < totalResults) {
      let finalUrl = url
        ? url + `&page=${currentPageNumber}`
        : `https://newsapi.org/v2/top-headlines?language=en&country=us&apiKey=${process.env.API_KEY}&pageSize=8&page=${currentPageNumber}`;
      setIsLoading(true);
      const res = await fetch(finalUrl);
      setCurrentPageNumber(currentPageNumber + 1);
      const data = await res.json();

      setArticles([...articles, ...(data.articles ? data.articles : [])]);
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Row gutter={[32, 24]} justify="center" style={{ marginTop: 35 }}>
        {articles &&
          articles.map((article) => (
            <Col xs={21} sm={14} md={11} lg={8} xl={5} key={article.url}>
              <QueueAnim type="bottom" delay={200}>
                <HeadlineCard key={article.url} articleInfo={article} />
              </QueueAnim>
            </Col>
          ))}

        {!articles && (
          <Col xs={21} sm={14} md={11} lg={8} xl={5}>
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
            />
          </Col>
        )}
      </Row>

      <Row gutter={[32, 24]} justify="center">
        <InfiniteLoader onVisited={fetchMore} />
      </Row>
      <Row
        gutter={[32, 24]}
        justify="center"
        style={{ marginTop: 25, marginBottom: 50 }}
      >
        <Loader
          css={override}
          size={20}
          color={"#1890ff"}
          loading={isLoading}
        />
      </Row>
    </React.Fragment>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&country=us&apiKey=${process.env.API_KEY}&pageSize=8&page=1`
  );
  let data = await res.json();
  if (!data.articles) data = {};
  return { props: { data } };
}
