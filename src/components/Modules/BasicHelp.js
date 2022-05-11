import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import cx from "classnames";
import { styles } from "../../constants/styles";
import { slotIconsLink } from "../../constants/index";
import { basicHelps } from "../../constants";
// slotHelpInitData
import { imageDomain, slotImgFetch } from "../../common-lib/lib/helps";
import { getData, updateArrayIndex } from "../../common-lib/lib/index";
// import { CgArrowsExchangeAlt } from "react-icons/cg";
import { noop } from "lodash";
// reducers
import { setConfirm } from "../../reducer/props";
// component
import { ReactCKEditor } from "../Common/CKEditor";
import { Button } from "../Common/Button";
import { Selector } from "../Common/Selector";

const StyledBasicHelp = styled.div`
  position: relative;
  margin-top: 25px;
  width: 100%;
  background-color: #000;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 8px;
  animation: basic-help 0.65s;
  text-align: center;
  .basic-help-title {
    color: #b89166;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title-edit-input {
    padding: 10px 16px;
    border-radius: 6px;
    width: 150px;
    margin-right: 10px;
  }
  .add-img-area {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    .add-img-title {
      color: #fff;
    }
  }
  .change-title {
    padding: 0;
    font-size: 0;
    border-radius: 50px;
    margin-left: 10px;
    background: radial-gradient(#00ffe7, #019688);
    cursor: pointer;
  }
  .svg-CgArrowsExchangeAlt {
    width: 26px;
    height: 26px;
    fill: #000;
  }
  .WF-img {
    width: 150px;
    margin-top: 15px;
    /* special size */
    &.JP {
      width: 500px;
    }
    &.W_S {
      width: 250px;
    }
  }
  .edit-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .edit-btns .tip {
    display: none;
    color: ${styles.alert};
    margin-right: 15px;
    &.isTip {
      display: block;
    }
  }
  textarea {
    resize: none;
    margin-top: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    outline: none;
    font-size: 14px;
    background-color: #565656;
    border-radius: 4px;
    border: 0;
    color: #efefef;
    &::placeholder {
      color: #efefef;
    }
  }
  .content-preview {
    margin-top: 25px;
    font-size: 16px;
    line-height: 1.5;
    color: #efefef;
    p {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    img {
      width: 45px;
      margin: 0 5px;
    }
  }
  /* table */
  .table-ckeditor {
    display: flex;
    align-self: center;
    justify-content: center;
    table,
    tbody,
    tr,
    td {
      max-width: 100%;
    }
    td {
      padding: 0.4em;
      min-width: 2em;
      border: 1px solid #fff;
    }
  }
`;
const StyleUpdateRule = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  .ur-title {
    color: #fff;
  }
`;
export const DefaultBasicHelp = ({
  updateKey = 0,
  title = "",
  content = "",
  slotData = {},
  editSwitch = true,
  setSlotHelpData = noop,
}) => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const editTitleRef = useRef(null);
  const dispatch = useDispatch();
  const [titleEdit, setTitleEdit] = useState(false);
  const [contentText, setContetText] = useState(content);
  const [contentEdit, setContentEdit] = useState(editSwitch);
  const contentIsFalse = () => {
    const htmlCheck = content === "<p><br></p>";
    return !content || htmlCheck;
  };
  useEffect(() => {
    setContentEdit(editSwitch);
  }, [editSwitch]);
  useEffect(() => {
    const parseHTML = (html = "") => {
      const preview = document.getElementById(
        `content-default-preview-${updateKey}`
      );
      preview.innerHTML = slotImgFetch({ html: html, game_id: edit.id });
    };
    if (!contentEdit) {
      parseHTML(content);
    } else {
      parseHTML();
    }
  }, [updateKey, content, edit.id, contentEdit]);
  useEffect(() => {
    setSlotHelpData((prev) => {
      const list = getData(prev.data, ["default_data"], []);
      const update = {
        ...prev.data,
        default_data: updateArrayIndex(updateKey, list, {
          ...getData(prev.data, ["default_data", updateKey]),
          content: contentText,
        }),
      };
      return {
        data: update,
        isLoading: false,
      };
    });
  }, [contentText, updateKey, setSlotHelpData]);
  return (
    <StyledBasicHelp>
      <div className="basic-help-title">
        {!titleEdit ? (
          <>
            <span style={{ marginRight: "10px" }}>
              {getData(basicHelps, [props.language, title]) || title}
            </span>
            <Button
              type={"editBtnFeature"}
              title={"編輯"}
              handler={() => setTitleEdit(true)}
            />
          </>
        ) : (
          <>
            <input
              className="title-edit-input"
              placeholder="編輯標題"
              defaultValue={
                getData(basicHelps, [props.language, title]) || title
              }
              ref={editTitleRef}
            />
            <Button
              type={"editBtnFeature"}
              title={"確定"}
              handler={() => {
                setSlotHelpData((prev) => {
                  const list = getData(prev.data, ["default_data"], []);
                  list.splice(updateKey, 1, {
                    ...list[updateKey],
                    title: editTitleRef.current.value || "",
                  });
                  const update = {
                    ...prev.data,
                    default_data: list,
                  };
                  return {
                    data: update,
                    isLoading: false,
                  };
                });
                setTitleEdit(false);
              }}
            />
            <Button
              type={"alert"}
              title={"取消"}
              handler={() => setTitleEdit(false)}
            />
          </>
        )}
        {/* {(title === slotHelpInitData(props.language)[1].title ||
          title === slotHelpInitData(props.language)[1].titleType2) && (
          <button
            className="change-title"
            onClick={() => {
              const type1 = slotHelpInitData(props.language)[1].title;
              const type2 = slotHelpInitData(props.language)[1].titleType2;
              setSlotHelpData((prev) => {
                const updateData = getData(prev.data, ["default_data"], []);
                updateData.splice(updateKey, 1, {
                  ...getData(prev.data, ["default_data", updateKey]),
                  title: title === type1 ? type2 : type1,
                });
                return {
                  data: prev.data,
                  isLoading: false,
                };
              });
            }}
          >
            <CgArrowsExchangeAlt className="svg-CgArrowsExchangeAlt" />
          </button>
        )} */}
      </div>
      {getData(
        slotData,
        ["default_data", updateKey, "icon", "link"],
        false
      ) && (
        <img
          className={`WF-img ${getData(
            slotData,
            ["default_data", updateKey, "icon", "link"],
            ""
          )}`}
          src={`${imageDomain.common}/${edit.id}/symbolList/${getData(
            slotData,
            ["default_data", updateKey, "icon", "link"],
            ""
          )}.png`}
          alt=""
        />
      )}
      <div className="add-img-area">
        <div className="add-img-title">新增圖標：</div>
        <Selector
          id={`icon-${updateKey}`}
          zindex="3"
          minWidth="100"
          defaultValue={getData(
            slotData,
            ["default_data", updateKey, "icon", "name"],
            "無"
          )}
          valueList={slotIconsLink}
          viewValue={(v) => v.title}
          handler={(value = "") =>
            setSlotHelpData((prev) => {
              const list = getData(prev.data, ["default_data"], []);
              const checkMultiLang = (value) => {
                if (!!~value.title.indexOf("(多國)")) {
                  return `${props.language}/${value.key}`;
                } else return value.key;
              };
              list.splice(updateKey, 1, {
                ...list[updateKey],
                icon: {
                  name: value.title,
                  link: value.key === "none" ? false : checkMultiLang(value),
                },
              });
              const update = {
                ...prev.data,
                default_data: list,
              };
              return {
                data: update,
                isLoading: false,
              };
            })
          }
        />
        {getData(
          slotData,
          ["default_data", updateKey, "icon", "link"],
          false
        ) && (
          <div className="add-img-title">
            （{getData(slotData, ["default_data", updateKey, "icon", "link"])}）
          </div>
        )}
      </div>
      <ReactCKEditor
        updateKey={updateKey}
        isEdit={contentEdit}
        content={content}
        setContent={setContetText}
      />
      <div
        id={`content-default-preview-${updateKey}`}
        className="content-preview"
      />
      <div className="edit-btns">
        <div className={cx("tip", { isTip: contentIsFalse() })}>
          ＊目前內容為空＊
        </div>
        {contentEdit ? (
          <Button
            type={"editBtnFeature"}
            title={"預覽"}
            handler={() => setContentEdit(false)}
          />
        ) : (
          <Button
            type={"editBtnFeature"}
            title={"編輯"}
            handler={() => setContentEdit(true)}
          />
        )}
        <Button
          type={"alert"}
          title={"刪除"}
          handler={() =>
            dispatch(
              setConfirm({
                status: true,
                content: `確定要刪除『${title}』嗎?`,
                type: "slotHelpDelete",
                param: () => {
                  setSlotHelpData((prev) => {
                    const list = getData(prev.data, ["default_data"], []);
                    list.splice(updateKey, 1);
                    const update = {
                      ...prev.data,
                      default_data: list,
                    };
                    return {
                      data: update,
                      isLoading: false,
                    };
                  });
                },
              })
            )
          }
        />
      </div>
    </StyledBasicHelp>
  );
};

export const BasicHelp = ({
  updateKey = 0,
  title = "",
  dataKey = "",
  content = "",
  slotData = {},
  editSwitch = true,
  quickAddBlocks = [],
  setQuickAddBlocks = noop,
  setSlotHelpData = noop,
}) => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const editTitleRef = useRef(null);
  const [titleEdit, setTitleEdit] = useState(false);
  const [contentText, setContetText] = useState(content);
  const [contentEdit, setContentEdit] = useState(editSwitch);
  const FetchDataKey = () => {
    switch (dataKey) {
      case "updateRule":
        return (
          <StyleUpdateRule>
            <div className="ur-title">等級：</div>
            <Selector
              id="updateRule"
              defaultValue={getData(
                slotData,
                ["data", updateKey, "updateLevel"],
                "0"
              )}
              valueList={["0", "1", "2", "3", "4", "5"]}
              viewValue={(v) => v}
              handler={(value = "") =>
                setSlotHelpData((prev) => {
                  const list = getData(prev.data, ["data"], []);
                  list.splice(updateKey, 1, {
                    ...list[updateKey],
                    updateLevel: value,
                  });
                  const update = {
                    ...prev.data,
                    data: list,
                  };
                  return {
                    data: update,
                    isLoading: false,
                  };
                })
              }
            />
          </StyleUpdateRule>
        );
      default:
        return <></>;
    }
  };
  const contentIsFalse = () => {
    const htmlCheck = content === "<p><br></p>";
    return !content || htmlCheck;
  };
  useEffect(() => {
    setContentEdit(editSwitch);
  }, [editSwitch]);
  useEffect(() => {
    const parseHTML = (html = "") => {
      const preview = document.getElementById(`content-preview-${updateKey}`);
      preview.innerHTML = slotImgFetch({ html: html, game_id: edit.id });
    };
    if (!contentEdit) {
      parseHTML(content);
    } else {
      parseHTML();
    }
  }, [updateKey, content, edit.id, contentEdit]);
  useEffect(() => {
    setSlotHelpData((prev) => {
      const list = getData(prev.data, ["data"], []);
      const update = {
        ...prev.data,
        data: updateArrayIndex(updateKey, list, {
          ...getData(prev.data, ["data", updateKey]),
          content: contentText,
        }),
      };
      return {
        data: update,
        isLoading: false,
      };
    });
  }, [contentText, updateKey, setSlotHelpData]);
  return (
    <StyledBasicHelp>
      <div className="basic-help-title">
        {!titleEdit ? (
          <>
            <span style={{ marginRight: "10px" }}>
              {getData(basicHelps, [props.language, title]) || title}
            </span>
            <Button
              type={"editBtnFeature"}
              title={"編輯"}
              handler={() => setTitleEdit(true)}
            />
          </>
        ) : (
          <>
            <input
              className="title-edit-input"
              placeholder="編輯標題"
              defaultValue={
                getData(basicHelps, [props.language, title]) || title
              }
              ref={editTitleRef}
            />
            <Button
              type={"editBtnFeature"}
              title={"確定"}
              handler={() => {
                setSlotHelpData((prev) => {
                  const list = getData(prev.data, ["data"], []);
                  list.splice(updateKey, 1, {
                    ...list[updateKey],
                    title: editTitleRef.current.value || "",
                  });
                  const update = {
                    ...prev.data,
                    data: list,
                  };
                  return {
                    data: update,
                    isLoading: false,
                  };
                });
                setTitleEdit(false);
              }}
            />
            <Button
              type={"alert"}
              title={"取消"}
              handler={() => setTitleEdit(false)}
            />
          </>
        )}
      </div>
      {getData(slotData, ["data", updateKey, "icon", "link"], false) && (
        <img
          className={`WF-img ${getData(
            slotData,
            ["data", updateKey, "icon", "link"],
            ""
          )}`}
          src={`${imageDomain.common}/${edit.id}/symbolList/${getData(
            slotData,
            ["data", updateKey, "icon", "link"],
            ""
          )}.png`}
          alt=""
        />
      )}
      <div className="add-img-area">
        <div className="add-img-title">新增圖標：</div>
        <Selector
          id={`icon-sub-${updateKey}`}
          zindex="3"
          minWidth="100"
          defaultValue={getData(
            slotData,
            ["data", updateKey, "icon", "name"],
            "無"
          )}
          valueList={slotIconsLink}
          viewValue={(v) => v.title}
          handler={(value = "") =>
            setSlotHelpData((prev) => {
              const list = getData(prev.data, ["data"], []);
              const checkMultiLang = (value) => {
                if (!!~value.title.indexOf("(多國)")) {
                  return `${props.language}/${value.key}`;
                } else return value.key;
              };
              list.splice(updateKey, 1, {
                ...list[updateKey],
                icon: {
                  name: value.title,
                  link: value.key === "none" ? false : checkMultiLang(value),
                },
              });
              const update = {
                ...prev.data,
                data: list,
              };
              return {
                data: update,
                isLoading: false,
              };
            })
          }
        />
        {getData(slotData, ["data", updateKey, "icon", "link"], false) && (
          <div className="add-img-title">
            （{getData(slotData, ["data", updateKey, "icon", "link"])}）
          </div>
        )}
      </div>
      <FetchDataKey />
      <ReactCKEditor
        updateKey={updateKey}
        isEdit={contentEdit}
        content={content}
        setContent={setContetText}
      />
      <div id={`content-preview-${updateKey}`} className="content-preview" />
      <div className="edit-btns">
        <div className={cx("tip", { isTip: contentIsFalse() })}>
          ＊目前內容為空＊
        </div>
        {contentEdit ? (
          <Button
            type={"editBtnFeature"}
            title={"預覽"}
            handler={() => setContentEdit(false)}
          />
        ) : (
          <Button
            type={"editBtnFeature"}
            title={"編輯"}
            handler={() => setContentEdit(true)}
          />
        )}
        <Button
          type={"alert"}
          title={"刪除"}
          handler={() =>
            dispatch(
              setConfirm({
                status: true,
                content: `確定要刪除『${title}』嗎?`,
                type: "slotHelpDelete",
                param: () => {
                  const checkIsQuickBlocks = () => {
                    let isQuickBlocks = false;
                    quickAddBlocks.map((v) => {
                      if (v.value === title) {
                        return (isQuickBlocks = true);
                      } else return null;
                    });
                    return isQuickBlocks;
                  };
                  if (checkIsQuickBlocks()) {
                    setQuickAddBlocks((prev) => {
                      const findData = quickAddBlocks.find(
                        (v) => v.value === title
                      );
                      prev.push(findData);
                      return prev;
                    });
                  }
                  setSlotHelpData((prev) => {
                    const list = getData(prev.data, ["data"], []);
                    list.splice(updateKey, 1);
                    const update = {
                      ...prev.data,
                      data: list,
                    };
                    return {
                      data: update,
                      isLoading: false,
                    };
                  });
                },
              })
            )
          }
        />
      </div>
    </StyledBasicHelp>
  );
};
