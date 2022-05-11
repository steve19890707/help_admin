import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GoAlert } from "react-icons/go";
import { styles } from "../../constants/styles";
// listener
import { Keydown } from "../../common-lib/hooks";
// reducers
import { setConfirm } from "../../reducer/props";
// fetch
import {
  fetchLogout,
  fetchMaintainUpdate,
  fetchAdminUpdate,
  fetchSlotHelpListUpdate,
} from "../Common/fetchData";
// component
import { Button } from "./Button";

const StyledConfirm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  .background {
    ${styles.popupBg}
  }
  .contain {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${styles.mainColor};
    border-radius: 5px;
    box-sizing: border-box;
    padding: 25px;
    min-width: 300px;
    max-width: 500px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    animation: popup 0.3s;
  }
  .content {
    display: flex;
    align-items: center;
    span {
      display: block;
      width: calc(100% - 35px);
    }
    .svg-GoAlert {
      width: 20px;
      height: 20px;
      fill: ${styles.alert};
      margin-right: 15px;
    }
  }
  .btn-area {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
export const Confirm = () => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  const confirmTypeFetch = (type = "") => {
    switch (type) {
      case "logout":
        fetchLogout();
        break;
      case "pearMaintain":
        fetchMaintainUpdate(props.confirm.param);
        break;
      case "userManagementUpdate":
        fetchAdminUpdate(props.confirm.param);
        break;
      case "slotHelpUpdate":
        fetchSlotHelpListUpdate(props.confirm.param);
        break;
      case "slotEditClose":
      case "slotHelpDelete":
      case "slotChangeLang":
        props.confirm.param();
        break;
      default:
        break;
    }
  };
  Keydown((e) => {
    const enter = e.keyCode === 13;
    const esc = e.keyCode === 27;
    if (enter || esc) {
      enter && confirmTypeFetch(props.confirm.type);
      dispatch(
        setConfirm({
          status: false,
          content: "",
          type: "",
          param: "",
        })
      );
    } else return;
  });
  return (
    <StyledConfirm theme={props.theme}>
      <div className="background" />
      <div className="contain">
        <div className="content">
          <GoAlert className="svg-GoAlert" />
          <span>{props.confirm.content}</span>
        </div>
        <div className="btn-area">
          <Button
            type={"feature"}
            title={"確定"}
            handler={() => {
              confirmTypeFetch(props.confirm.type);
              dispatch(
                setConfirm({
                  status: false,
                  content: "",
                  type: "",
                  param: "",
                })
              );
            }}
          />
          <Button
            type={"alert"}
            title={"取消"}
            handler={() =>
              dispatch(
                setConfirm({
                  status: false,
                  content: "",
                  type: "",
                  param: "",
                })
              )
            }
          />
        </div>
      </div>
    </StyledConfirm>
  );
};
