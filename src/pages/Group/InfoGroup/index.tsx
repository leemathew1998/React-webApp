import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../assets/request";
import { Warpper } from "./style";
import { List, Card, Avatar } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
const InfoGroup = () => {
  const [data, setData] = useState([]);
  const location: any = useLocation();
  const navigate = useNavigate();
  const loadData = async () => {
    const res = await instance({
      url: "/searchgroup",
      method: "post",
      params: {
        group_name: location.state.data.group_name,
      },
    });

    setData(res.data[0].group_content);
  };

  useEffect(() => {
    // console.log(location.state);
    loadData();
  }, []);
  return (
    <div>
      <Warpper>
        <List className="list">
          {data
            ? data.map((item: any, index: number) => {
                // console.log(item);
                const date = new Date(item.time);
                return (
                  <Card
                    key={item._id}
                    className="card"
                    title={
                      <div style={{ fontWeight: "normal" }} className="info">
                        <Avatar
                          src={`http://1.15.125.141:3007/downloadavatar?name=${item.user_avatar}`}
                        />
                        <div className="name">{item.user_name}</div>
                        {/* <div className="title">{item.creat_title}</div> */}
                        <div className="date">{date.toLocaleString()}</div>
                      </div>
                    }
                    // onBodyClick={onBodyClick}
                    style={{ borderRadius: "16px" }}
                  >
                    <div>{item.body}</div>
                  </Card>
                );
              })
            : ""}
        </List>
        <AddCircleOutline
          className="addcircle"
          onClick={() => navigate("/group/creatgroup")}
        />
      </Warpper>
    </div>
  );
};
export default InfoGroup;
