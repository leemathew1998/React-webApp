import React, { useState, useEffect } from "react";
import { Form, Input, TextArea, Dialog, Button, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../../assets/request";
const Creat = (props: any) => {
  const { func } = props;

  const user_info = useSelector((state: any) => {
    return state.user_reducer;
  });
  // console.log(user_info);
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    if (user_info.user_id == "") {
      Toast.show({
        icon: "fail",
        content: "没有用户信息",
      });
      console.log("没有用户信息");
    }
    values.user_id = user_info.user_id;
    values.user_name = user_info.user_name;
    values.user_number = user_info.user_number;
    values.user_avatar = user_info.user_avatar;
    values.creat_time = Date.now();

    const { data } = await instance({
      url: "/addcreat",
      method: "post",
      params: values,
    });
    func("mycreat");
    Toast.show({
      icon: "success",
      content: "发表成功！",
    });
  };

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
        <Form.Header>开始创作吧</Form.Header>
        <Form.Item name="creat_title" label="标题" rules={[{ required: true }]}>
          <Input placeholder="想问就问" />
        </Form.Item>
        <Form.Item name="creat_body" label="描述">
          <TextArea placeholder="详细描述一下吧" showCount autoSize />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Creat;
