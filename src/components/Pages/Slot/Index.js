import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import cx from "classnames";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
// reducers
import { setEdit, setEditReset } from "../../../reducer/edit";
import { setConfirm, setLineContentFirstInit } from "../../../reducer/props";
// component
import { LoaderSpinner } from "../../Common/Loader";
import { Image } from "../../Common/Image";
import { Button } from "../../Common/Button";
import { IdSearch } from "../../Common/IdSearch";
import { ListAutoSizer } from "../../Common/ListAutoSizer";
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { SlotEdit } from "./SlotEdit";
// api
// import { fetchSlotHelpList, RenderGetDataHook } from "../../Common/fetchData";
import { gameList } from "../../../demoData";
import { dataVerify } from "../../Common/fetchData";

const StyledSlot = styled.div`
  .loading {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .auto-sizer-layout {
    min-width: 900px;
    max-width: 1000px;
    margin: 0 auto;
    height: 80vh;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 16px;
    }
    .index-restore-btn {
      margin-top: 20px;
    }
  }
  .index-style {
    padding-bottom: 20px;
  }
  .other-operations {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 24px;
    margin-bottom: 30px;
  }
  .main-title {
    font-size: 22px;
    font-weight: bold;
  }
`;
const StyledSlotHelpList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  box-sizing: border-box;
  background: ${styles.mainColor};
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: unset;
  }
  &:hover {
    background: ${styles.hoverColor};
  }
  .info,
  .opreation {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .game-id,
  .game-name {
    margin-left: 15px;
    font-size: 16px;
  }
  .no-name {
    opacity: 0.4;
  }
  .game-id span {
    margin-left: 10px;
    color: ${styles.idColor};
  }
  .lang-status {
    max-width: 450px;
    display: flex;
    flex-wrap: wrap;
  }
  .lang-status .list-style {
    position: relative;
    font-size: 14px;
    padding: 6px 10px;
    margin: 5px 3px;
    border-radius: 50px;
    color: ${styles.unusedColor};
    background-color: ${styles.unused};
    &.used {
      color: ${styles.btnColor};
      background-color: ${styles.used};
      box-shadow: unset;
      &:hover {
        &:before,
        &:after {
          display: block;
        }
      }
    }
    &:before {
      content: "已啟用";
      display: none;
      position: absolute;
      width: 50px;
      font-size: 14px;
      text-align: center;
      top: 0;
      left: 100%;
      transform: translate(2px, -8px);
      padding: 6px 0;
      color: ${styles.tipColor};
      background-color: ${styles.tipBG};
      border-radius: 3px;
      z-index: 2;
    }
    &:after {
      content: "";
      display: none;
      position: absolute;
      border-right: 8px solid ${styles.tipBG};
      border-left: 8px solid transparent;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      top: 0;
      left: 100%;
      transform: translate(calc(-100% + 2px), calc(-100% + 10px));
      z-index: 3;
    }
  }
  .edit-btn {
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 14px;
    color: ${styles.btnColor};
    background-color: ${styles.feature};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
export const Slot = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [slotHelpList, setSlotHelpList] = useState({
    data: [],
    isLoading: true,
  });
  const [copyListData, setCopyListData] = useState([]);
  // RenderGetDataHook({
  //   isCopy: true,
  //   isSort: true,
  //   fetchData: fetchSlotHelpList,
  //   setData: setSlotHelpList,
  //   copySetData: setCopyListData,
  // });
  useEffect(() => {
    setSlotHelpList({ data: dataVerify(gameList, [], true), isLoading: false });
    setCopyListData(dataVerify(gameList, []));
  }, []);
  useEffect(() => {
    const getHashValue = (key = "") => {
      const matches = window.location.hash.match(new RegExp(key + "=([^&]*)"));
      return matches ? matches[1] : null;
    };
    if (getHashValue("game_id") !== null) {
      dispatch(setEdit(getHashValue("game_id")));
    }
  }, [dispatch]);
  const CreateSlotHelpList = ({ index, style, data }) => {
    return (
      <StyledSlotHelpList style={style}>
        <div className="info">
          <Image
            src={getData(data, [index, "game_icon", props.language])}
            type="game-icon"
          />
          <div className="game-id">
            Game Id:<span>{getData(data, [index, "game_id"])}</span>
          </div>
          <div
            className={cx("game-name", {
              "no-name": !getData(data, [index, "game_name", props.language]),
            })}
          >
            {getData(data, [index, "game_name", props.language])
              ? getData(data, [index, "game_name", props.language])
              : "( Data not found )"}
          </div>
        </div>
        <div className="opreation">
          <div className="lang-status">
            {props.langList.map((v, k) => {
              return (
                <div
                  key={k}
                  className={cx("list-style", {
                    used: !!~getData(data, [index, "edited"]).indexOf(v.lang),
                  })}
                >
                  {v.name}
                </div>
              );
            })}
          </div>
          <button
            className="edit-btn"
            onClick={() => dispatch(setEdit(getData(data, [index, "game_id"])))}
          >
            編輯
          </button>
        </div>
      </StyledSlotHelpList>
    );
  };
  return (
    <StyledSlot>
      <MultiLanguage className="index-style" />
      <div className="other-operations">
        <div className="main-title">老虎機</div>
        <IdSearch
          searchKey="Game Id"
          handler={(value = "") => {
            const fetchList = [];
            copyListData.map((v) => {
              const match = !!~getData(v, ["game_id"]).indexOf(value);
              if (match) {
                return fetchList.push(v);
              } else return null;
            });
            setSlotHelpList({
              data: fetchList,
              isLoading: false,
            });
          }}
        />
      </div>
      {!slotHelpList.isLoading && slotHelpList.data.length === 0 && (
        <div className="no-data">
          <span>
            {copyListData.length > 0
              ? "未搜尋到符合的資料，請嘗試重新查詢。"
              : "尚無資料"}
          </span>
          <Button
            classname="index-restore-btn"
            type="feature"
            title="遊戲列表初始化"
            handler={() =>
              setSlotHelpList({
                data: copyListData,
                isLoading: false,
              })
            }
          />
        </div>
      )}
      {slotHelpList.isLoading ? (
        <div className="loading">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="auto-sizer-layout">
          <ListAutoSizer
            dataList={slotHelpList.data}
            size={100}
            CreateData={CreateSlotHelpList}
          />
        </div>
      )}
      {edit.status && (
        <SlotEdit
          closeHandler={() =>
            dispatch(
              setConfirm({
                status: true,
                content: `確定取消? 尚未儲存的資料將會遺失。`,
                type: "slotEditClose",
                param: () => {
                  window.location.href = window.location.origin + `#/slot`;
                  dispatch(setEditReset());
                  dispatch(setLineContentFirstInit(true));
                  localStorage.removeItem("lines");
                },
              })
            )
          }
        />
      )}
    </StyledSlot>
  );
};
