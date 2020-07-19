import { Menu, Select } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

function Navbar(props) {
  let [currentSource, setCurrentSource] = useState("Select News Source");
  let [sources, setSources] = useState(null);

  function handleChange(value) {
    setCurrentSource(value);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://newsapi.org/v2/sources?language=en&country=us&apiKey=${process.env.API_KEY}`
      );
      const sources = await res.json();
      setSources(sources.sources);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <nav className="menuBar">
        <div className="logo">
          <a href="">NewsApi</a>
        </div>
        <div className="leftMenu">
          <Menu mode="horizontal">
            <Menu.Item>
              <Select
                defaultValue={currentSource}
                style={{ width: 180 }}
                onChange={handleChange}
                className="selectMenu"
              >
                {sources &&
                  sources.map((source) => (
                    <Option key={source.id} value={source.name}>
                      {source.name}
                    </Option>
                  ))}
              </Select>
            </Menu.Item>
          </Menu>
        </div>
      </nav>
      <div>
        {React.cloneElement(props.children, {
          currentSource: currentSource,
        })}
      </div>
    </React.Fragment>
  );
}

export default Navbar;
