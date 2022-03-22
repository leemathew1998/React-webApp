import styled from "styled-components";
export const ListWarpper = styled.div`
  .list_item {
    display: flex;
    position: relative;
    .title {
      flex: 1 1;
      overflow: hidden;
    }
    .image {
      height: 60px;
      width: 60px;
      margin-left: 16px;
      /* position: relative; */
    }
    .adm-list-item-content-main {
      display: flex;
    }
  }
`;
