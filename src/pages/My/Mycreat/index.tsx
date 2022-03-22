import React, { useEffect, useState, useRef } from "react";
import instance from "../../../assets/request";
import {
  InfiniteScroll,
  Avatar,
  List,
  Card,
  Toast,
  Popup,
  Space,
  Button,
  Form,
  Input,
  TextArea,
} from "antd-mobile";
import {
  EditSOutline,
  HeartOutline,
  ArrowsAltOutline,
} from "antd-mobile-icons";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser } from "../../../store/action";
import { Warpper } from "./style";
const Mycreat = (props: any) => {
  const { activeKey } = props;
  // console.log(activeKey);
  const [data, setData]: any = useState([]);
  const [_id, set_id]: any = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const pages = useRef(1);
  const likeref = useRef(null);
  async function loadMore() {
    const newData = await instance({
      url: "getcreatbyid",
      method: "post",
      params: {
        pages: pages.current,
        user_id: user_reducer.user_id,
      },
    });
    // console.log(newData.data);
    setData([...data, ...newData.data]);
    if (newData.data.length < 3) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    pages.current++;
  }
  const user_reducer = useSelector((state: any) => {
    return state.user_reducer;
  });
  const Heart = async (item: any) => {
    const toggle = item.like.filter((e: any) => {
      return e == user_reducer.user_id;
    });
    const nativeref: any = document.getElementsByClassName(`Heart${item._id}`);
    if (!toggle[0]) {
      item.like.push(user_reducer.user_id);
      nativeref[0].style.color = "#ff0000";
    } else {
      item.like.pop();
      nativeref[0].style.color = "#000";
    }

    await instance({
      url: "togglelike",
      method: "post",
      params: {
        _id: item._id,
        like: item.like,
      },
    });
  };

  const onFinish = async (values: any) => {
    setPopup(false);
    if (user_reducer.user_id == "") {
      Toast.show({
        icon: "fail",
        content: "没有用户信息",
      });
      console.log("没有用户信息");
    }
    values.user_id = user_reducer.user_id;
    values.user_name = user_reducer.user_name;
    values.user_avatar = user_reducer.user_avatar;
    values.time = Date.now();

    const { data } = await instance({
      url: "/addcomment",
      method: "post",
      params: {
        _id: _id,
        values: values,
      },
    });
    console.log(data);
    Toast.show({
      icon: "success",
      content: "发表成功！",
    });
  };
  const Alt = async (item: any) => {
    const comments: any = document.getElementsByClassName(
      `togglecomments${item._id}`
    );
    if (!comments[0].style.display) {
      comments[0].style.display = "none";
    } else {
      comments[0].style.display = "";
    }
  };
  useEffect(() => {
    if (user_reducer.user_id == "") {
      const localStorage_data: any = localStorage.getItem("user_info");
      const user_info = JSON.parse(localStorage_data);
      dispatch(createNewUser(user_info));
    }
    loadMore();
  }, []);
  return (
    <Warpper>
      <List className="list">
        {!hasMore && data
          ? data.map((item: any, index: number) => {
              const date = new Date(item.creat_time);
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
                      <div className="title">{item.creat_title}</div>
                      <div className="date">{date.toLocaleString()}</div>
                    </div>
                  }
                  // onBodyClick={onBodyClick}
                  style={{ borderRadius: "16px" }}
                >
                  <div>{item.creat_body}</div>
                  <div className="option" key={item._id} ref={likeref}>
                    <HeartOutline
                      className={[
                        "Heart",
                        item.like.some((e: any) => {
                          return e == user_reducer.user_id;
                        })
                          ? "initlike"
                          : "",
                        `Heart${item._id}`,
                      ].join(" ")}
                      onClick={() => {
                        Heart(item);
                      }}
                    />
                    <EditSOutline
                      className="Edit"
                      onClick={() => {
                        setPopup(true);
                        set_id(item._id);
                      }}
                    />
                    <ArrowsAltOutline
                      className="Edit"
                      onClick={() => {
                        Alt(item);
                      }}
                    />
                  </div>
                  <div
                    className={[
                      "togglecomments",
                      `togglecomments${item._id}`,
                    ].join(" ")}
                    style={{ display: "none" }}
                  >
                    {item.comments.map((e: any) => {
                      const commentDate = new Date(e.time);
                      return (
                        <div
                          key={e._id}
                          style={{ fontWeight: "normal" }}
                          className="info"
                        >
                          <Avatar
                            src={`http://1.15.125.141:3007/downloadavatar?name=${e.user_avatar}`}
                          />
                          <div className="name">{e.body}</div>
                          <div className="title">{e.creat_title}</div>
                          <div className="date">
                            {commentDate.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })
          : ""}
      </List>

      <Popup
        visible={popup}
        onMaskClick={() => {
          setPopup(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "50vh",
        }}
        destroyOnClose
      >
        <Form
          requiredMarkStyle="text-required"
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" size="large">
              提交
            </Button>
          }
        >
          <Form.Item name="body" label="描述">
            <TextArea placeholder="详细描述一下吧" showCount autoSize />
          </Form.Item>
        </Form>
      </Popup>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </Warpper>
  );
};
export default Mycreat;
