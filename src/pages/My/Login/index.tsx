import React, { useState } from "react";
import { Form, Input, Button, ImageUploader, Toast } from "antd-mobile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JSEncrypt } from "jsencrypt";
import { PUBLIC_KEY } from "../../../assets/const";
import { demoSrc } from "../../../assets/const";
import { createNewUser } from "../../../store/action";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import instance from "../../../assets/request";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");

  const onFinish = async (values: any) => {
    values.user_avatar = avatarUrl;
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUBLIC_KEY);
    values.user_password = encrypt.encrypt(values.user_password);

    const res = await instance({
      url: "/register",
      method: "post",
      params: values,
    });
    if (res.data.info == "用户不存在,自动创建") {
      dispatch(createNewUser(res.data.result));
      Toast.show({
        icon: "success",
        content: "用户不存在,自动创建",
      });
      localStorage.setItem("user_info", JSON.stringify(res.data.result));
      navigate("/my", { state: res.data.result });
    } else {
      dispatch(createNewUser(res.data.result));
      Toast.show({
        icon: "success",
        content: "用户已存在,自动登录",
      });
      localStorage.setItem("user_info", JSON.stringify(res.data.result));
      navigate("/my", { state: res.data.result });
    }
  };
  //avatar

  async function mockUpload(files: File) {
    let data = new FormData();

    data.append("files", files, files.name);
    const res = await instance({
      url: "/uploadavatar",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: data,
    });
    setAvatarUrl(res.data);
    return {
      url: URL.createObjectURL(files),
    };
  }
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: demoSrc,
    },
  ]);

  return (
    <>
      <Form
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item name="user_name" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="user_password"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
        <Form.Item
          name="user_number"
          label="手机号码"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item name="user_avatar" label="头像" rules={[{ required: true }]}>
          <ImageUploader
            maxCount={1}
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
