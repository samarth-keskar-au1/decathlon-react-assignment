import { Card, Divider } from "antd";
import { useRouter } from "next/router";
const { Meta } = Card;

export default function HeadlineCard(props) {
  let router = useRouter();
  return (
    <React.Fragment>
      <Card
        onClick={() =>
          router.push({
            pathname: `/posts/${props.articleInfo.title}`,
            query: props.articleInfo,
          })
        }
        hoverable
        style={{ width: 350, height: 400 }}
        cover={
          <img
            alt={props.articleInfo.title}
            src={
              props.articleInfo.urlToImage &&
              props.articleInfo.urlToImage != "null"
                ? props.articleInfo.urlToImage
                : "https://dummyimage.com/350x200/ffffff/000000.jpg&text=No+Image"
            }
            width="350"
            height="200"
          />
        }
      >
        <Meta
          title={
            <span style={{ whiteSpace: "initial" }}>
              {props.articleInfo.title}
            </span>
          }
          description={
            props.articleInfo.description
              ? props.articleInfo.description.slice(0, 80) + "..."
              : ""
          }
        />
      </Card>
    </React.Fragment>
  );
}
