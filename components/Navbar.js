import { Menu, Select } from "antd";
const { Option } = Select;

function Navbar() {
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="">NewsApi</a>
      </div>
      <div className="leftMenu">
        <Menu mode="horizontal">
          <Select
            defaultValue="lucy"
            style={{ width: 150 }}
            onChange={handleChange}
            className="selectMenu"
          >
            <Option key="hi" value="jack">
              Jack
            </Option>

            <Option key="bye" value="Yiminghe">
              yiminghe
            </Option>
          </Select>
        </Menu>
      </div>
    </nav>
  );
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default Navbar;
