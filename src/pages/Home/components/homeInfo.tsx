import React, { useState } from "react";
import instance from "../../../assets/request";
import { InfiniteScroll, List, Image } from "antd-mobile";

import { ListWarpper } from "./style";
const HomeInfo = () => {
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const { data } = await instance({
      url: "/getinfo",
      method: "get",
    });
    setData((val) => [...val, ...data]);
    setHasMore(false);
  }

  return (
    <ListWarpper>
      <List>
        {data.map((item: any) => {
          item = JSON.parse(JSON.stringify(item));
          return (
            <List.Item className="list_item" key={item._id}>
              <div className="title">{item.title}</div>
              <Image className="image" src={item.path} />
            </List.Item>
          );
        })}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </ListWarpper>
  );
};
export default HomeInfo;
