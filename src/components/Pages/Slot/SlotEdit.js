import React, { useRef, useState, useEffect } from "react";
import cx from "classnames";
import styled from "styled-components";
import { noop } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../../common-lib/lib/index";
import { styles } from "../../../constants/styles";
import { slotGameQuickBlocks } from "../../../constants";
import { IoMdAddCircle } from "react-icons/io";
import { BsLightningFill } from "react-icons/bs";
// reducers
import {
  setAlert,
  setConfirm,
  setLineContentFirstInit,
} from "../../../reducer/props";
// component
import { EditPopup } from "../../Modules/EditPopup";
import { DefaultBasicHelp, BasicHelp } from "../../Modules/BasicHelp";
import { DndEdit } from "../../Modules/DndEdit";
import { Line } from "../../Modules/Line";
import { Paytable } from "../../Modules/Paytable";
import { Button } from "../../Common/Button";
import { SwitchKit } from "../../Common/Switch";
import { LoaderSpinner } from "../../Common/Loader";
// api
// import { RenderGetDataHook, fetchSlotHelpDetail } from "../../Common/fetchData";
import { helpDetailData } from "../../../demoData";
import { dataVerify } from "../../Common/fetchData";

const StyledSlotEdit = styled(EditPopup)`
  .edit-switch-btn {
    position: absolute;
    right: 0;
    color: ${styles.btnColor};
    background-color: ${styles.editBtnFeature};
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    &.first {
      right: 215px;
    }
    &.second {
      right: 100px;
    }
  }
  .show-game-name {
    margin-left: 25px;
  }
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrap {
    overflow: hidden;
    height: 0;
    &.renderDone {
      overflow: unset;
      height: auto;
    }
  }
  .data-title {
    font-size: 18px;
    text-align: center;
  }
  .sub-data-title {
    font-size: 18px;
    text-align: center;
    border-top: 1px dashed ${styles.color};
    margin-top: 25px;
    padding-top: 30px;
  }
  .add-content-area {
    text-align: center;
    margin-top: 50px;
    display: none;
    &.renderDone {
      display: block;
    }
    &.plug-in {
      margin-top: 25px;
      .add-btn {
        margin-bottom: 0;
      }
    }
    .quick-add {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 17px;
    }
    .qa-title {
      color: #8b8b8b;
    }
    .quick-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 10px;
      margin: 8px;
      border-radius: 50px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      background: ${styles.btnLinear2};
      cursor: pointer;
    }
    .quick-add-title {
      font-size: 14px;
      margin-left: 2px;
      color: ${styles.btnColor};
    }
    .add-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      margin-bottom: 25px;
      border-radius: 50px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      background: ${styles.btnLinear};
    }
    .add-title {
      font-size: 16px;
      margin-left: 5px;
      color: ${styles.btnColor};
    }
    .svg-BsLightningFill {
      fill: ${styles.btnColor};
      width: 20px;
      height: 20px;
    }
    .svg-IoMdAddCircle {
      fill: ${styles.btnColor};
      width: 28px;
      height: 28px;
    }
    .create-input {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 0;
      border: 1px dashed ${styles.boderDashed};
    }
    .create-input input {
      width: 200px;
      padding: 10px 16px;
      border-radius: 5px;
      margin-right: 15px;
    }
  }
`;
export const SlotEdit = ({ closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const initQuickAddBlocks = getData(slotGameQuickBlocks, [props.language], []);
  const [slotHelpData, setSlotHelpData] = useState({
    data: {},
    isLoading: true,
  });
  const [sortData, setSortData] = useState([
    { title: 1 },
    { title: 2 },
    { title: 3 },
    { title: 4 },
  ]);
  const [editSwitch, setEditSwitch] = useState(true);
  const [addNewDefaultParam, setAddNewDefaultParam] = useState(false);
  const [addNewParam, setAddNewParam] = useState(false);
  const [dndStatus, setDndStatus] = useState({
    type: "default",
    status: false,
  });
  const [renderDone, setRenderDone] = useState(false);
  const [quickAddBlocks, setQuickAddBlocks] = useState(initQuickAddBlocks);
  const createDefaultInputRef = useRef(null);
  const createInputRef = useRef(null);
  const getDataKey = (value) => {
    const find =
      initQuickAddBlocks.find((v) => v.value === getData(value, ["title"])) ||
      {};
    return getData(find, ["key"]);
  };
  const AddContent = ({
    title = "新增區塊",
    type = "default",
    status = false,
    setStatusData = noop,
    updateHandler = noop,
  }) => {
    return (
      <div
        className={cx("add-content-area plug-in", {
          renderDone:
            renderDone || getData(slotHelpData.data, ["data"]).length === 0,
        })}
      >
        {!status ? (
          <div className="add-btn" onClick={() => setStatusData(true)}>
            <IoMdAddCircle className="svg-IoMdAddCircle" />
            <div className="add-title">{title}</div>
          </div>
        ) : (
          <div className="create-input">
            {type === "default" ? (
              <input
                placeholder={`輸入${title}名稱`}
                ref={createDefaultInputRef}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/(^[\s]*)/g, ""))
                }
              />
            ) : (
              <input
                placeholder={`輸入${title}名稱`}
                ref={createInputRef}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/(^[\s]*)/g, ""))
                }
              />
            )}
            {type === "default" ? (
              <Button
                type={"createBtnFeture"}
                title={"新增"}
                handler={() => {
                  if (!createDefaultInputRef.current.value) {
                    return;
                  }
                  updateHandler();
                  setStatusData(false);
                }}
              />
            ) : (
              <Button
                type={"createBtnFeture"}
                title={"新增"}
                handler={() => {
                  const checkValueSame = () => {
                    let isSameValue = false;
                    initQuickAddBlocks.map((v) => {
                      if (v.value === createInputRef.current.value) {
                        return (isSameValue = true);
                      } else return null;
                    });
                    return isSameValue;
                  };
                  if (!createInputRef.current.value) {
                    return;
                  } else if (checkValueSame()) {
                    dispatch(
                      setAlert({
                        status: true,
                        content: `名稱不可使用『 ${createInputRef.current.value} 』。`,
                      })
                    );
                    return;
                  }
                  updateHandler();
                  setStatusData(false);
                }}
              />
            )}
            <Button
              type={"cancelBtnFeture"}
              title={"取消"}
              handler={() => {
                setStatusData(false);
              }}
            />
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    setRenderDone(false);
  }, [props.language]);
  // RenderGetDataHook({
  //   param: edit.id,
  //   lang: props.language,
  //   isMap: true,
  //   fetchData: fetchSlotHelpDetail,
  //   setData: setSlotHelpData,
  // });
  useEffect(() => {
    setSlotHelpData({
      data: dataVerify(helpDetailData, {}),
      isLoading: false,
    });
  }, []);
  // quick add
  useEffect(() => {
    const helpData = getData(slotHelpData.data, ["data"], []);
    const quickAB = getData(slotGameQuickBlocks, [props.language], []);
    if (helpData.length > 0) {
      const filter = quickAB.filter((fv) => {
        const find = helpData.find((v) => v.title === fv.value);
        return !find ? true : false;
      });
      setQuickAddBlocks(filter);
    }
  }, [slotHelpData, props]);
  return (
    <StyledSlotEdit
      title={"編輯老虎機Help"}
      editedBy={getData(slotHelpData.data, ["edited_by"])}
      game_id={edit.id}
      isClose={!dndStatus}
      checkValueError={false}
      updateBtnHandler={() => {
        dispatch(setLineContentFirstInit(true));
        dispatch(
          setConfirm({
            status: true,
            content: `確定要更新-${props.langText[props.language]}嗎?`,
            // type: "slotHelpUpdate",
            type: "",
            param: {
              default_data: getData(slotHelpData.data, ["default_data"], []),
              data: getData(slotHelpData.data, ["data"], []),
              game_id: edit.id,
              lang: props.language,
              status: getData(slotHelpData.data, ["status"], false),
              line: localStorage.getItem("lines"),
              line_content: getData(slotHelpData.data, ["line_content"], {}),
              pay_table: getData(slotHelpData.data, ["pay_table"], {}),
              game_title: getData(slotHelpData.data, ["game_title"], false),
            },
          })
        );
      }}
      closeBtnHandler={closeHandler}
      stickyChildren={
        <>
          <div style={{ marginRight: "20px" }}>
            v版本：
            <span style={{ color: "#f44336" }}>
              {getData(slotHelpData.data, ["version"], "")}
            </span>
          </div>
          <SwitchKit
            checked={getData(slotHelpData.data, ["status"], false)}
            handler={(status) =>
              setSlotHelpData((prev) => {
                return {
                  data: {
                    ...prev.data,
                    status: status,
                  },
                  isLoading: false,
                };
              })
            }
          />
          <div className="show-game-name">顯示遊戲名稱：</div>
          <SwitchKit
            checked={getData(slotHelpData.data, ["game_title"], true)}
            handler={(status) =>
              setSlotHelpData((prev) => {
                return {
                  data: {
                    ...prev.data,
                    game_title: status,
                  },
                  isLoading: false,
                };
              })
            }
          />
          <button
            className="edit-switch-btn first"
            onClick={() => {
              const update = new Array(
                ...getData(slotHelpData.data, ["default_data"], [])
              );
              setSortData(update);
              setDndStatus({
                type: "default",
                status: true,
              });
            }}
          >
            主區塊順序
          </button>
          <button
            className="edit-switch-btn second"
            onClick={() => {
              const update = new Array(
                ...getData(slotHelpData.data, ["data"], [])
              );
              setSortData(update);
              setDndStatus({
                type: "sub",
                status: true,
              });
            }}
          >
            副區塊順序
          </button>
          <button
            className="edit-switch-btn"
            onClick={() => setEditSwitch((prev) => !prev)}
          >
            全部{editSwitch ? "預覽" : "編輯"}
          </button>
        </>
      }
    >
      {slotHelpData.isLoading ? (
        <div className="loading">
          <LoaderSpinner width={60} height={60} />
        </div>
      ) : (
        <>
          <div className="data-title">主區塊</div>
          <div
            className={cx("wrap", {
              renderDone:
                renderDone || getData(slotHelpData.data, ["data"]).length === 0,
            })}
          >
            {getData(slotHelpData.data, ["default_data"], []).map((v, k) => {
              return (
                <React.Fragment key={k}>
                  <DefaultBasicHelp
                    updateKey={k}
                    title={getData(v, ["title"])}
                    content={getData(v, ["content"])}
                    slotData={slotHelpData.data}
                    editSwitch={editSwitch}
                    setSlotHelpData={setSlotHelpData}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <div
            className={cx("add-content-area", {
              renderDone:
                renderDone || getData(slotHelpData.data, ["data"]).length === 0,
            })}
          >
            <AddContent
              status={addNewDefaultParam}
              setStatusData={setAddNewDefaultParam}
              updateHandler={() =>
                setSlotHelpData((prev) => {
                  const updateData = getData(prev.data, ["default_data"], []);
                  updateData.push({
                    title: createDefaultInputRef.current.value,
                    content: "",
                  });
                  return {
                    data: {
                      ...prev.data,
                      default_data: updateData,
                    },
                    isLoading: false,
                  };
                })
              }
            />
          </div>
          <Paytable
            classname={cx({
              renderDone:
                renderDone || getData(slotHelpData.data, ["data"]).length === 0,
            })}
            payTableData={getData(slotHelpData.data, ["pay_table"], {})}
            setSlotHelpData={setSlotHelpData}
          />
          <div className="sub-data-title">副區塊</div>
          <div
            className={cx("wrap", {
              renderDone: renderDone,
            })}
          >
            {getData(slotHelpData.data, ["data"], []).map((v, k) => {
              const last =
                k + 1 === getData(slotHelpData.data, ["data"]).length;
              if (last && !renderDone) {
                const timeout = setTimeout(() => {
                  setRenderDone(true);
                  return () => clearTimeout(timeout);
                }, 100);
              }
              return (
                <React.Fragment key={k}>
                  <BasicHelp
                    updateKey={k}
                    title={getData(v, ["title"])}
                    dataKey={getDataKey(v)}
                    content={getData(v, ["content"])}
                    slotData={slotHelpData.data}
                    editSwitch={editSwitch}
                    quickAddBlocks={initQuickAddBlocks}
                    setQuickAddBlocks={setQuickAddBlocks}
                    setSlotHelpData={setSlotHelpData}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <div
            className={cx("add-content-area", {
              renderDone:
                renderDone || getData(slotHelpData.data, ["data"]).length === 0,
            })}
          >
            <div className="quick-add">
              {quickAddBlocks.length > 0 && (
                <div className="qa-title">快速新增：</div>
              )}
              {quickAddBlocks.map((v, k) => (
                <div
                  key={k}
                  className="quick-btn"
                  onClick={() => {
                    setSlotHelpData((prev) => {
                      const updateData = getData(prev.data, ["data"]);
                      updateData.push({
                        title: v.value,
                        content: "",
                      });
                      return {
                        data: {
                          ...prev.data,
                          data: updateData,
                        },
                        isLoading: false,
                      };
                    });
                  }}
                >
                  <BsLightningFill className="svg-BsLightningFill" />
                  <div className="quick-add-title">{v.title}</div>
                </div>
              ))}
            </div>
            <AddContent
              status={addNewParam}
              type="sub"
              setStatusData={setAddNewParam}
              updateHandler={() =>
                setSlotHelpData((prev) => {
                  const updateData = getData(prev.data, ["data"]);
                  updateData.push({
                    title: createInputRef.current.value,
                    content: "",
                  });
                  return {
                    data: {
                      ...prev.data,
                      data: updateData,
                    },
                    isLoading: false,
                  };
                })
              }
            />
          </div>
          <Line
            classname={cx({
              renderDone:
                renderDone || getData(slotHelpData.data, ["data"]).length === 0,
            })}
            lineType={getData(slotHelpData.data, ["line"]) || "243"}
            lineContent={getData(slotHelpData.data, ["line_content", "data"])}
            setSlotHelpData={setSlotHelpData}
            handler={(type) =>
              setSlotHelpData((prev) => {
                return {
                  data: {
                    ...prev.data,
                    line: type,
                  },
                  isLoading: false,
                };
              })
            }
          />
        </>
      )}
      {dndStatus.status && (
        <DndEdit
          title={`${dndStatus.type === "default" ? "主" : "副"}區塊`}
          data={sortData}
          dndId="helpBlock"
          children={(data) => {
            return (
              <>
                <div className="dnd-title">{getData(data, ["title"])}</div>
              </>
            );
          }}
          updateBtnHandler={() => {
            setSlotHelpData((prev) => {
              if (dndStatus.type === "default") {
                return {
                  data: {
                    ...prev.data,
                    default_data: sortData,
                  },
                  isLoading: false,
                };
              } else
                return {
                  data: {
                    ...prev.data,
                    data: sortData,
                  },
                  isLoading: false,
                };
            });
            setDndStatus(false);
          }}
          closeHandler={() => setDndStatus(false)}
        />
      )}
    </StyledSlotEdit>
  );
};
