
export const createNewUser = (info) => {
  return {
    type: 'CREATE_NEW_USER',
    action: info,
  };
};
export const addCreat = (info) => {
  return {
    type: 'ADDCREAT',
    action: info,
  };
};

export const unreadingCreat = (info) => {
  return {
    type: 'UNREADING',
    action: info,
  };
};

export const addSwiper = (info) => {
  return {
    type: "ADD",
    action: info,
  };
};
