import { Select } from "antd";
const SearchCat = ({ arrSearch, onSearch, onSelectedSearch }) => (
  <Select
    showSearch
    allowClear
    placeholder="Search or select a cat"
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
