import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { slotGameLine } from "../../constants/index";
import { getData } from "../../common-lib/lib";
import { slotImgFetch } from "../../common-lib/lib/helps";
import { GoTriangleDown } from "react-icons/go";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
// reducers
import { setLineContentFirstInit } from "../../reducer/props";
// component
import { Button } from "../Common/Button";
import { ReactCKEditor } from "../Common/CKEditor";
// listener
import { Mousedown } from "../../common-lib/hooks";

const StyledLine = styled.div`
  overflow: hidden;
  height: 0;
  margin-top: 50px;
  padding-top: 30px;
  &.renderDone {
    border-top: 1px dashed ${styles.color};
    overflow: unset;
    height: auto;
  }
  .selecter-caption {
    margin-top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selecter-caption .caption {
    font-size: 18px;
  }
  .selecter-caption .selector {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${styles.selectorLinear};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    padding: 10px 16px;
    border-radius: 8px;
    z-index: 2;
    cursor: pointer;
    .line-type {
      color: ${styles.selectorColor};
      margin-right: 5px;
    }
    .selecter-list {
      position: absolute;
      width: 100%;
      top: 100%;
      background: ${styles.selectorLinear};
      padding: 2px 0;
      border-radius: 0 0 5px 5px;
      max-height: 300px;
      overflow: auto;
    }
    .selecter-list .list-style {
      text-align: center;
      padding: 10px 0;
      &:hover,
      &.active {
        color: #fff;
        background: ${styles.selectorColor};
      }
    }
  }
  .svg-GoTriangleDown {
    width: 16px;
    height: 16px;
    fill: ${styles.selectorColor};
  }
  .line-type-demo {
    width: 100%;
    margin-top: 30px;
    background-color: #000;
    padding: 50px;
    box-sizing: border-box;
    border-radius: 8px;
    img {
      width: 45px;
      margin: 0 5px;
    }
  }
  .line-type-demo .ltd-title {
    text-align: center;
    color: #b89166;
    font-size: 28px;
  }
  .line-type-demo .ltd-subtitle {
    text-align: center;
    color: #fff;
    line-height: 1.5;
    &:nth-child(2) {
      margin-top: 30px;
    }
    &:nth-last-child(2) {
      margin-bottom: 30px;
    }
  }
  .line-type-demo .pic-area {
    display: flex;
    align-items: center;
    justify-content: center;
    .block-inset {
      text-align: center;
      width: 50%;
      box-sizing: border-box;
      padding: 0 5%;
    }
    img {
      width: 100%;
      margin-top: 25px;
    }
  }
  .svg-BsCheckCircle {
    fill: #03ff0d;
    width: 45px;
    height: 45px;
  }
  .svg-BsXCircle {
    fill: #fe0200;
    width: 45px;
    height: 45px;
  }
  .tip {
    color: #fe0200;
    font-size: 14px;
  }
  .editor-btn {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;
  }
`;

export const Line = ({
  classname = "",
  lineType = "",
  lineContent = "",
  setSlotHelpData = noop,
  handler = noop,
}) => {
  localStorage.setItem(
    "lines",
    localStorage.getItem("lines") ? localStorage.getItem("lines") : lineType
  );
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [currentLineType, setCurrentLineType] = useState(
    localStorage.getItem("lines")
  );
  const currentLangData =
    slotGameLine.find((v) => v.type === currentLineType) || slotGameLine[0];
  const [initLineType] = useState(lineType);
  const [isEdit, setIsEdit] = useState(false);
  const [insetLineContent, setInsetLineContent] = useState(
    lineContent || getData(currentLangData, ["content", props.language])
  );
  const [selectorStatus, setSelectorStatus] = useState(false);
  const getImgDomain = (key = "243", type = "png") => {
    const imgDomain = ``;
    return `${imgDomain}${key}.${type}`;
  };
  const fetchTypeName = () => {
    const find = slotGameLine.find((v) => v.type === currentLineType) || {};
    return (
      <>
        <span>{getData(find, ["name", "cn"], "243路")}</span>
        {initLineType !== localStorage.getItem("lines") && (
          <span className="tip"> ＊前次儲存類型：{initLineType}</span>
        )}
      </>
    );
  };
  useEffect(() => {
    if (props.lineContentFirstInit) {
      return;
    }
    setInsetLineContent(getData(currentLangData, ["content", props.language]));
  }, [currentLangData, props.language, props.lineContentFirstInit]);
  useEffect(() => {
    const parseHTML = (html = "") => {
      const preview = document.getElementById("ltd-subtitle");
      preview.innerHTML = slotImgFetch({ html: html, game_id: edit.id });
    };
    if (!isEdit) {
      parseHTML(insetLineContent);
    } else {
      parseHTML();
    }
  }, [isEdit, insetLineContent, edit.id]);
  useEffect(() => {
    setSlotHelpData((prev) => {
      const update = {
        ...prev.data,
        line_content: { data: insetLineContent },
      };
      return {
        data: update,
        isLoading: false,
      };
    });
  }, [insetLineContent, setSlotHelpData]);
  Mousedown((e) => {
    const slotLineSelector = document.getElementById("slot-line-selector");
    if (slotLineSelector && !slotLineSelector.contains(e.target)) {
      setSelectorStatus(false);
    }
  });
  const CreateLinePicType = () => {
    switch (currentLineType) {
      case "108":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("108c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("108e")} />
            </div>
          </div>
        );
      case "576":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("576c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("576e")} />
            </div>
          </div>
        );
      case "1024":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("1024c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("1024e")} />
            </div>
          </div>
        );
      case "1":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("1")} />
          </div>
        );
      case "5":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("5")} />
          </div>
        );
      case "9":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("9")} />
          </div>
        );
      case "9_2":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("9_2")} />
          </div>
        );
      case "10":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("10")} />
          </div>
        );
      case "15":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("15")} />
          </div>
        );
      case "15_2":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("15_2")} />
          </div>
        );
      case "20":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("20")} />
          </div>
        );
      case "20_2":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("20_2")} />
          </div>
        );
      case "25":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("25")} />
          </div>
        );
      case "40":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("40")} />
          </div>
        );
      case "50":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("50")} />
          </div>
        );
      case "60":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("60")} />
          </div>
        );
      case "88":
        return (
          <div className="pic-area">
            <img alt="" src={getImgDomain("88")} />
          </div>
        );
      case "any3":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("any3c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("any3e")} />
            </div>
          </div>
        );
      case "any5":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("any5c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("any5e")} />
            </div>
          </div>
        );
      case "any6":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("any6c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("any6e")} />
            </div>
          </div>
        );
      case "richways":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("richways_c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("richways_e")} />
            </div>
          </div>
        );
      case "3x5ways":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("3x5waysc")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("3x5wayse")} />
            </div>
          </div>
        );
      case "4x5ways":
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("4x5waysc")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("4x5wayse")} />
            </div>
          </div>
        );
      case "none":
        return <div className="pic-area"></div>;
      case "243":
      default:
        return (
          <div className="pic-area">
            <div className="block-inset">
              <BsCheckCircle className="svg-BsCheckCircle" />
              <img alt="" src={getImgDomain("243c")} />
            </div>
            <div className="block-inset">
              <BsXCircle className="svg-BsXCircle" />
              <img alt="" src={getImgDomain("243e")} />
            </div>
          </div>
        );
    }
  };
  return (
    <StyledLine className={classname}>
      <div className="selecter-caption">
        <div className="caption">選擇連線類型：</div>
        <div
          id="slot-line-selector"
          className="selector"
          onClick={() => setSelectorStatus((prev) => !prev)}
        >
          <div className="line-type">{fetchTypeName()}</div>
          <GoTriangleDown className="svg-GoTriangleDown" />
          {selectorStatus && (
            <div className="selecter-list">
              {slotGameLine.map((v, k) => {
                return (
                  <div
                    className={`list-style ${
                      v.type === currentLineType ? "active" : ""
                    }`}
                    key={k}
                    onClick={() => {
                      dispatch(setLineContentFirstInit(false));
                      handler(v.type);
                      setCurrentLineType(v.type);
                      localStorage.setItem("lines", v.type);
                    }}
                  >
                    {getData(v, ["name", "cn"])}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="line-type-demo">
        <div className="ltd-title">
          {getData(currentLangData, ["name", props.language])}
        </div>
        <div id="ltd-subtitle" className="ltd-subtitle" />
        <ReactCKEditor
          isEdit={isEdit}
          content={insetLineContent}
          setContent={setInsetLineContent}
        />
        <div className="editor-btn">
          <Button
            type={"editBtnFeature"}
            title={!isEdit ? "編輯" : "預覽"}
            handler={() => setIsEdit((prev) => !prev)}
          />
        </div>
        <CreateLinePicType />
      </div>
    </StyledLine>
  );
};
