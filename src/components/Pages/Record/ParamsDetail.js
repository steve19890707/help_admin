import { noop } from "lodash";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
import ReactJson from "react-json-view";
// component
import { PureEditPopup } from "../../Modules/EditPopup";

const StyledParamsDetail = styled(PureEditPopup)`
  .pd-caption {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      font-size: 18px;
    }
  }
  .params {
    padding-top: 20px;
  }
  .params .params-caption {
    font-size: 18px;
  }
  .params .params-content {
    margin-top: 20px;
    padding: 25px;
    box-sizing: border-box;
    background: #f3f3f3;
  }
`;

const PdCaption = ({ caption = "", param = "" }) => {
  return (
    <div className="pd-caption">
      <span>{caption}：</span>
      <span style={{ color: "#cb4b16" }}>{param}</span>
    </div>
  );
};

export const ParamsDetail = ({ data = [], closeHandler = noop }) => {
  const edit = useSelector((state) => state.edit);
  const detailData = data.find((v) => getData(v, ["id"]) === edit.id);
  return (
    <StyledParamsDetail
      readOnly={true}
      title="操作詳情"
      closeBtnHandler={closeHandler}
      children={
        <>
          <PdCaption
            caption="操作者"
            param={getData(detailData, ["edited_by"])}
          />
          <PdCaption
            caption="操作動作"
            param={getData(detailData, ["action"])}
          />
          <PdCaption
            caption="操作時間"
            param={getData(detailData, ["create_at"])}
          />
          <div className="params">
            <div className="params-caption">異動參數：</div>
            <div className="params-content">
              <ReactJson
                src={JSON.parse(getData(detailData, ["parameter"], {}))}
                // theme="colors"
                enableClipboard={false}
                displayObjectSize={false}
                quotesOnKeys={false}
              />
            </div>
          </div>
        </>
      }
    />
  );
};
