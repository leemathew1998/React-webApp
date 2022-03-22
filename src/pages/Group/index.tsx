import React, { useEffect, useState } from "react";
import { Image, List } from "antd-mobile";
import instance from "../../assets/request";
import { useNavigate } from "react-router-dom";
const Group = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const loadData = async () => {
    const res = await instance({
      url: "/searchallgroup",
      method: "post",
    });
    setData(res.data);
  };
  const intogroup = (e: any) => {
    navigate("/group/infogroup", { state: { data: e } });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <List header="发现小组">
      {data.map((item: any) => (
        <List.Item
          onClick={() => intogroup(item)}
          key={item._id}
          prefix={
            <Image
              src={`http://1.15.125.141:3007/downloadavatar?name=${item.group_avatar}`}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          description={item.group_info}
        >
          {item.group_name}
        </List.Item>
      ))}
    </List>
  );
};
export default Group;
