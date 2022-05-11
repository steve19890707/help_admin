import { useRef, useEffect } from "react";
import styled from "styled-components";
import cx from "classnames";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { BsCheckCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
// component
import { SwitchKit } from "../Common/Switch";
import { Button } from "../Common/Button";

const StyledPaytable = styled.div`
  overflow: hidden;
  height: 0;
  margin-top: 50px;
  padding-top: 30px;
  &.renderDone {
    border-top: 1px dashed ${styles.color};
    overflow: unset;
    height: auto;
  }
  .paytable-title {
    font-size: 18px;
    text-align: center;
  }
  .paytable-flex {
    display: flex;
    align-items: center;
    margin-top: 25px;
  }
  .paytable-type-btn {
    margin-right: 15px;
    border-radius: 6px;
    padding: 10px 16px;
    color: ${styles.color};
    border: 2px transparent solid;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    &.selected {
      color: ${styles.btnSelected};
      font-weight: bold;
      border: 2px ${styles.btnSelected} solid;
      .svg-BsCheckCircleFill {
        display: block;
      }
    }
    .svg-BsCheckCircleFill {
      display: none;
      width: 14px;
      height: 14px;
      margin-left: 4px;
    }
  }
  .pt-symbol-input {
    padding: 10px 16px;
    border-radius: 6px;
    width: 120px;
    margin-right: 10px;
  }
  .pt-symbol-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 50px;
    padding: 8px 16px;
    margin-right: 8px;
    font-size: 14px;
    background: ${styles.selectorLinear};
    &:last-child {
      margin-right: 0;
    }
    .svg-TiDelete {
      width: 26px;
      height: 26px;
      margin-left: 4px;
      cursor: pointer;
    }
  }
  .stmbol-flex {
    margin: 12px 0 0 14px;
  }
`;

export const Paytable = ({
  classname = "",
  payTableData = {},
  setSlotHelpData = noop,
}) => {
  const paytableType = [
    {
      name: "一般",
      value: "normal",
    },
    {
      name: "過關",
      value: "challenge",
    },
    {
      name: "對子",
      value: "pair",
    },
  ];
  const ptSymbolInputRef = useRef(null);
  useEffect(() => {
    const isData = Object.keys(payTableData).length === 0;
    if (isData) {
      setSlotHelpData((prev) => {
        return {
          data: {
            ...prev.data,
            pay_table: {
              status: true,
              type: "normal",
              symbol: [],
            },
          },
          isLoading: false,
        };
      });
    }
  }, [payTableData, setSlotHelpData]);
  return (
    <StyledPaytable className={classname}>
      <div className="paytable-title">賠付表</div>
      <div className="paytable-flex">
        <span>狀態：</span>
        <SwitchKit
          checked={getData(payTableData, ["status"], false)}
          handler={(status) =>
            setSlotHelpData((prev) => {
              return {
                data: {
                  ...prev.data,
                  pay_table: {
                    ...getData(prev.data, ["pay_table"], {}),
                    status: status,
                  },
                },
                isLoading: false,
              };
            })
          }
        />
      </div>
      <div className="paytable-flex">
        <span>類型：</span>
        {paytableType.map((v, k) => (
          <button
            className={cx("paytable-type-btn", {
              selected: v.value === getData(payTableData, ["type"]),
            })}
            key={k}
            onClick={() =>
              setSlotHelpData((prev) => {
                return {
                  data: {
                    ...prev.data,
                    pay_table: {
                      ...getData(prev.data, ["pay_table"], {}),
                      type: v.value,
                    },
                  },
                  isLoading: false,
                };
              })
            }
          >
            <span>{v.name}</span>
            <BsCheckCircleFill className="svg-BsCheckCircleFill" />
          </button>
        ))}
      </div>
      <div className="paytable-flex">
        <span>新增大型圖標：</span>
        <input
          className="pt-symbol-input"
          placeholder="輸入圖標名稱"
          ref={ptSymbolInputRef}
        />
        <Button
          type={"feature"}
          title={"新增"}
          handler={() => {
            if (ptSymbolInputRef.current.value) {
              setSlotHelpData((prev) => {
                const updateData = getData(
                  prev.data,
                  ["pay_table", "symbol"],
                  []
                );
                updateData.push(ptSymbolInputRef.current.value);
                return {
                  data: {
                    ...prev.data,
                    pay_table: {
                      ...getData(prev.data, ["pay_table"], {}),
                      symbol: updateData,
                    },
                  },
                  isLoading: false,
                };
              });
              const timeout = setTimeout(() => {
                ptSymbolInputRef.current.value = "";
                return () => clearTimeout(timeout);
              }, 50);
            }
          }}
        />
      </div>
      <div className="paytable-flex stmbol-flex">
        {getData(payTableData, ["symbol"], []).map((v, k) => (
          <button className="pt-symbol-btn" key={k}>
            <span>{v}</span>
            <TiDelete
              className="svg-TiDelete"
              onClick={() =>
                setSlotHelpData((prev) => {
                  const updateData = getData(
                    prev.data,
                    ["pay_table", "symbol"],
                    []
                  );
                  updateData.splice(k, 1);
                  return {
                    data: {
                      ...prev.data,
                      pay_table: {
                        ...getData(prev.data, ["pay_table"], {}),
                        symbol: updateData,
                      },
                    },
                    isLoading: false,
                  };
                })
              }
            />
          </button>
        ))}
      </div>
    </StyledPaytable>
  );
};
