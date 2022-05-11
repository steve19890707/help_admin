import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { styles } from "../../constants/styles";
import { noop } from "lodash";
// listener
import { Keydown } from "../../common-lib/hooks";
// component
import { MultiLanguage } from "./MultiLanguage";
import { Button } from "../Common/Button";

const StyledSettingSquare = styled.div`
  position: relative;
  width: 100%;
  padding-top: 25px;
  .setting {
    display: flex;
    align-items: center;
  }
  .title-span {
    font-size: 18px;
    margin-right: 25px;
  }
  .input {
    box-sizing: border-box;
    padding: 12px 16px;
    border-radius: 6px;
    width: 250px;
  }
  .tip {
    margin-left: 15px;
    font-size: 14px;
    color: ${styles.alert};
  }
`;
export const SettingSquare = ({
  className = "",
  title = "標題",
  isTip = false,
  tipContent = "",
  Comp = noop,
}) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledSettingSquare theme={props.theme} className={className}>
      <div className="setting">
        <span className="title-span">{title}:</span>
        {Comp()}
        {isTip && (
          <div className="tip">
            {title} {tipContent}
          </div>
        )}
      </div>
    </StyledSettingSquare>
  );
};

const StyledEditPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  padding: 4vh 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.4);
  .edited-by {
    position: absolute;
    z-index: 2;
    bottom: 50px;
    right: 50px;
    color: ${styles.editedBy};
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
  .content {
    width: 80%;
    min-width: 800px;
    max-width: 1000px;
    height: 92vh;
    margin: auto;
    background-color: ${styles.mainColor};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 50px 50px 50px;
    animation: editpopup 0.3s;
  }
  .sticky-header {
    position: sticky;
    padding: 50px 0 25px 0;
    top: 0;
    background: #fff;
    z-index: 99;
  }
  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }
  .prue-title {
    font-size: 22px;
    font-weight: bold;
    margin: 40px 0;
    display: flex;
    align-items: center;
  }
  .childrens {
    display: flex;
    align-items: center;
    margin-top: 25px;
  }
  .game-id span {
    font-size: 18px;
    margin: 0 20px 0 10px;
    color: ${styles.idColor};
  }
  .last-btns {
    margin-top: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PureEditPopup = ({
  className = "",
  title = "標題",
  updateBtn = "更新",
  checkValueError = true,
  readOnly = false,
  isClose = true,
  updateBtnHandler = noop,
  closeBtnHandler = noop,
  children,
}) => {
  Keydown((e) => {
    const enter = e.keyCode === 13 && isClose;
    const esc = e.keyCode === 27 && isClose;
    if (esc || enter) {
      closeBtnHandler();
    } else return;
  });
  return (
    <StyledEditPopup className={className}>
      <div className="content">
        <div className="prue-title">{title}</div>
        {children}
        <div className="last-btns">
          {!readOnly ? (
            <>
              <Button
                type={"feature"}
                title={updateBtn}
                disabled={checkValueError}
                handler={() => updateBtnHandler()}
              />
              <Button
                type={"alert"}
                title={"取消"}
                handler={() => closeBtnHandler()}
              />
            </>
          ) : (
            <Button
              type={"feature"}
              title={"確定"}
              handler={() => closeBtnHandler()}
            />
          )}
        </div>
      </div>
    </StyledEditPopup>
  );
};

export const EditPopup = ({
  className = "",
  editedBy = "",
  title = "標題",
  game_id = "",
  checkValueError = true,
  isClose = true,
  management = false,
  updateBtnHandler = noop,
  closeBtnHandler = noop,
  stickyChildren,
  children,
}) => {
  const props = useSelector((state) => state.props);
  const [editedByStatus, setEditedByStatus] = useState(false);
  const updateBtnText = management
    ? "更新"
    : `更新-${props.langText[props.language]}`;
  Keydown((e) => {
    const checkEdited = e.keyCode === 17;
    if (checkEdited) {
      setEditedByStatus((prev) => !prev);
    }
    const esc = e.keyCode === 27 && isClose;
    if (esc && !props.confirm.status) {
      closeBtnHandler();
    } else return;
  });
  return (
    <StyledEditPopup className={className}>
      {editedByStatus && editedBy && (
        <div className="edited-by">前次編輯人員: {editedBy}</div>
      )}
      <div className="content">
        <div className="sticky-header">
          <div className="title">{title}</div>
          {!management && (
            <>
              <MultiLanguage isEditPopup={true} />
              <div className="childrens">
                <div className="game-id">
                  Game Id:<span>{game_id}</span>
                </div>
                {stickyChildren}
              </div>
            </>
          )}
        </div>
        {children}
        <div className="last-btns">
          <Button
            type={"feature"}
            title={updateBtnText}
            disabled={checkValueError}
            handler={() => updateBtnHandler()}
          />
          <Button
            type={"alert"}
            title={"取消"}
            handler={() => closeBtnHandler()}
          />
        </div>
      </div>
    </StyledEditPopup>
  );
};
