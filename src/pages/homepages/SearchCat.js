import { Select } from "antd";

const onSearch = (value) => {
  console.log("search:", value);
  if (value === "") {
  }
};
const SearchCat = ({ arrSearch, onSelectedSearch }) => (
  <Select
    showSearch
    allowClear
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onSelectedSearch}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
    size="large"
    options={arrSearch ? arrSearch : []}
  />
);
export default SearchCat;
