import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  TextArea,
  SearchBar,
  Button,
  Toast,
  CheckList,
} from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../../store/action";
import instance from "../../../assets/request";
const CreatGroup = () => {
  const user_reducer = useSelector((state: any) => {
    return state.user_reducer;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref: any = useRef();
  const [searchResult, setSearchResult]: any = useState([{}]);
  const [checkList, setCheckList]: any = useState([]);
  const [isnew, setisnew] = useState(true);
  const checklistchange = (v: any) => {
    setCheckList(v);
    ref.current.style.display = "none";
  };
  let timer: any = null;
  const throttle = (word: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const { data } = await instance({
        url: "searchgroup",
        method: "post",
        params: {
          group_name: word,
        },
      });
      if (data.length) {
        setisnew(false);
        setSearchResult(data);
      } else {
        setSearchResult([{ _id: word, group_name: word }]);
      }
      timer = null;
    }, 300);
  };
  const searchbaronChange = async (word: any) => {
    ref.current.style.display = "block";
    throttle(word);
  };
  const onFinish = async (values: any) => {
    if (user_reducer.user_id == "") {
      Toast.show({
        icon: "fail",
        content: "没有用户信息",
      });
      console.log("没有用户信息");
    }
    // console.log(searchResult[0]);
    values.group_time = Date.now();
    values.group_user = [user_reducer.user_id];
    values.group_avatar = user_reducer.user_avatar;
    values.group_name = searchResult[0].group_name;
    const tem = values.group_content;
    values.group_content = [
      {
        body: tem,
        time: values.group_time,
        user_id: user_reducer.user_id,
        user_name: user_reducer.user_name,
        user_avatar: user_reducer.user_avatar,
      },
    ];

    const { data } = await instance({
      url: "addgroup",
      method: "post",
      params: {
        values: values,
        isnew: isnew,
      },
    });
    // console.log(data);
    navigate("/group");
  };
  useEffect(() => {
    ref.current.style.display = "none";
    if (user_reducer.user_id == "") {
      const localStorage_data: any = localStorage.getItem("user_info");
      const user_info = JSON.parse(localStorage_data);
      dispatch(createNewUser(user_info));
    }
  }, []);
  return (
    <div>
      <Form
        requiredMarkStyle="text-required"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <SearchBar
          style={{
            marginTop: "1px",
            "--height": "48px",
            "--background": "#ffffff",
          }}
          onChange={searchbaronChange}
          placeholder="搜索小组"
          showCancelButton
        />
        <div className="searchResult" ref={ref}>
          <CheckList onChange={checklistchange}>
            {isnew
              ? searchResult.map((item: any) => {
                  return (
                    <CheckList.Item key={item._id} value={item._id}>
                      {`无此小组，现将新建${item.group_name}小组`}
                    </CheckList.Item>
                  );
                })
              : searchResult.map((item: any) => {
                  return (
                    <CheckList.Item key={item._id} value={item._id}>
                      {item.group_name}
                    </CheckList.Item>
                  );
                })}
          </CheckList>
        </div>
        <Form.Item name="group_info" label="描述">
          <TextArea placeholder="详细描述一下吧" showCount autoSize />
        </Form.Item>
        <Form.Item name="group_content" label="内容">
          <TextArea placeholder="内容" showCount autoSize />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatGroup;
