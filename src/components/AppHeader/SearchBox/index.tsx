import { AutoComplete, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import styles from "./index.module.css";
import { useSearchProducts } from "../../../features/products/hooks/useSearchProducts";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useHistory } from "react-router-dom";

export function SearchBox() {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText.trim(), 500);
  const { data = [], isFetching } = useSearchProducts(debouncedSearchText);
  const options = useMemo(() => data.map((product) => ({ label: product.name, value: product.id })), [data]);

  const handleSelect = useCallback(
    (value) => {
      history.push(`/product/${value}`);
    },
    [history]
  );

  return (
    <AutoComplete className={styles.search} options={options} onSearch={setSearchText} onSelect={handleSelect}>
      <Input suffix={isFetching ? <Spin size="small" /> : <SearchOutlined />} placeholder="Search..." />
    </AutoComplete>
  );
}
