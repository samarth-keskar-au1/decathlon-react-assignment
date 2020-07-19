import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";
import Navbar from "../components/Navbar";
export default function MyApp({ Component, pageProps }) {
  return (
    <Navbar>
      <Component {...pageProps} />
    </Navbar>
  );
}
