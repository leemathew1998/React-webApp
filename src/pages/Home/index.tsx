import React, { useEffect, useState } from "react";
import { Space, Swiper, Image } from "antd-mobile";
import instance from "../../assets/request";
import { HomeWapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { addSwiper } from "../../store/action";
import HomeInfo from "./components/homeInfo";
const Home = () => {
  const dispatch = useDispatch();
  const swiperData = useSelector((state: any) => {
    return state.swiper_reducer;
  });
  const getRequest = async () => {
    if (!swiperData[0]) {
      const { data } = await instance({
        method: "get",
        url: "/getswiper",
      });

      dispatch(addSwiper(data));
    }
  };
  useEffect(() => {
    getRequest();
  }, [dispatch]);

  return (
    <HomeWapper>
      <Swiper
        className="swiper"
        autoplay
        slideSize={70}
        trackOffset={15}
        loop
        stuckAtBoundary={false}
      >
        {swiperData.map((item: any) => (
          <Swiper.Item key={item._id}>
            <div className="swiperitem">
              <Image className="image" src={item.path} />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
      <HomeInfo />
    </HomeWapper>
  );
};
export default Home;
