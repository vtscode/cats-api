import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { Collapse } from "antd";

const fakeDataUrl = "https://api.thecatapi.com/v1/breeds?limit=10";

const ListAllCats = () => {
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setData(data.concat(body));
        message.success(`${body.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.cfa_url} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default ListAllCats;
