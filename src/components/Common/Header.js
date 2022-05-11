import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RiCollageFill } from "react-icons/ri";
import { styles } from "../../constants/styles";
// reducers
import { setChangePwd, setConfirm } from "../../reducer/props";
// component
import { Button } from "./Button";

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 800px;
  height: 80px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${styles.mainColor};
  padding: 0 30px;
  z-index: 2;
  .area {
    display: flex;
    align-items: center;
  }
  .user {
    margin-right: 15px;
  }
  .user-avatar {
    width: 32px;
    height: 32px;
    margin-right: 15px;
    border-radius: 50%;
    border: 1px solid ${styles.themeColor};
  }
  .svg-RiCollageFill {
    width: 20px;
    height: 20px;
    fill: ${styles.themeColor};
    margin-right: 12px;
  }
`;
export const Header = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  return (
    <StyledHeader>
      <div className="area">
        <RiCollageFill className="svg-RiCollageFill" />
        <div className="text-style">系統字Help後台管理</div>
      </div>
      <div className="area">
        <div className="user">Welcome, {userInfo.account}</div>
        {userInfo.avatar_url && (
          <img className="user-avatar" alt="" src={userInfo.avatar_url} />
        )}
        <Button
          type={"feature"}
          title={"修改密碼"}
          handler={() => dispatch(setChangePwd(true))}
        />
        <Button
          type={"alert"}
          title={"登出"}
          handler={() =>
            dispatch(
              setConfirm({
                status: true,
                content: "確定登出?",
                // type: "logout",
                type: "",
                param: "",
              })
            )
          }
        />
      </div>
    </StyledHeader>
  );
};
