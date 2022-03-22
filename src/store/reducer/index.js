import {
  create_new_user,
  delete_user,
  check_user,
  update_user,
} from "../const";

const userDefaultState = {
  user_id: "",
  user_name: "",
  user_number: "",
  user_avatar: '',
  user_password: ''
};
export const user_reducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case create_new_user:
      state.user_name = action.action.user_name;
      state.user_number = action.action.user_number;
      state.user_password = action.action.user_password;
      state.user_id = action.action._id;
      state.user_avatar = action.action.user_avatar;
      return state;
    default:
      return state;
  }
};

const swiperState = [

];
export const swiper_reducer = (state = swiperState, action) => {
  switch (action.type) {
    case "ADD":
      state = [...action.action]
      // console.log(state);
      return state;
    default:
      return state;
  }
};



const creatState = []

export const creat_reducer = (state = creatState, action) => {
  switch (action.type) {
    case "ADDCREAT":
      state = [...state, action.action]
      // console.log(state);
      return state;
    case "UNREADING":
      state = [...state, action.action]
      // console.log(state);
      return state;
    default:
      return state;
  }
};