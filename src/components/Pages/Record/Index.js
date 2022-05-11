import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
// reducers
import { setEdit, setEditReset } from "../../../reducer/edit";
// component
import { Caption } from "../../Modules/Caption";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { Selector } from "../../Common/Selector";
import { ParamsDetail } from "./ParamsDetail";
// api
// import { fetchRecordList, RenderGetDataHook } from "../../Common/fetchData";
import { dataVerify } from "../../Common/fetchData";
import { record } from "../../../demoData";
const StyledRecord = styled.div`
  .loading {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 165px;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 6px;
    margin-left: 10px;
  }
  .flex-caption .btns {
    width: 100%;
    justify-content: space-between;
  }
`;

const calculatePage = (total = 0, limit = 15) => {
  const page = Math.ceil(Number(total) / Number(limit));
  const array = new Array(page === 0 ? 1 : page).fill(1);
  array.map((v, k) => array.splice(k, 1, String(v + k)));
  return array;
};

export const Record = () => {
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [recordList, setRecordList] = useState({
    data: [],
    isLoading: true,
  });
  const [renderData, setRenderData] = useState([]);
  const [fetchEdit, setFetchEdit] = useState("");
  const [fetchAction, setFetchAction] = useState("");
  const [pages, setPages] = useState(["1"]);
  const [params, setParams] = useState({
    page: "1",
    limit: "15",
    editor: "",
    action: "",
  });
  useEffect(() => {
    setPages(
      calculatePage(getData(renderData, ["total_count"], 0), params.limit)
    );
  }, [renderData, params.limit]);
  // fetch search
  useEffect(() => {
    const fetchEd = (data = []) => {
      return data.filter(
        (v) =>
          !!~getData(v, ["edited_by"])
            .toLowerCase()
            .indexOf(fetchEdit.toLowerCase())
      );
    };
    const fetchAc = (data = []) => {
      return data.filter((v) => {
        return !!~getData(v, ["action"]).indexOf(fetchAction);
      });
    };
    setRenderData((prev) => {
      let update = getData(prev, ["data"], []);
      const origin = getData(recordList.data, ["data"], []);
      if (fetchEdit) {
        update = fetchEd(origin);
      } else if (fetchAction) {
        update = fetchAc(origin);
      } else if (fetchEdit && fetchAction) {
        update = fetchEd(origin);
        update = fetchAc(origin);
      } else {
        update = origin;
      }
      return {
        ...prev,
        data: update,
      };
    });
  }, [recordList.data, fetchEdit, fetchAction]);
  // RenderGetDataHook({
  //   param: params,
  //   isPermission: true,
  //   isNeedReRender: true,
  //   fetchData: fetchRecordList,
  //   setData: setRecordList,
  //   setReRenderData: setRenderData,
  // });
  useEffect(() => {
    setRecordList({ data: dataVerify(record, []), isLoading: false });
    setRenderData(dataVerify(record, []));
  }, []);
  return (
    <StyledRecord>
      <Caption
        className="flex-caption"
        title="操作紀錄"
        subtitles={["id", "操作者", "操作動作", "操作時間", "操作詳情"]}
        Buttons={
          <>
            <div>
              <span>搜尋：</span>
              <input
                placeholder="搜尋操作者"
                onChange={(v) => {
                  const value = v.target.value;
                  setFetchEdit(value);
                }}
              />
              <input
                placeholder="搜尋動作"
                onChange={(v) => {
                  const value = v.target.value;
                  setFetchAction(value);
                }}
              />
            </div>
            <div>
              <span>顯示筆數：</span>
              <Selector
                id="record-limit"
                zindex="1"
                defaultValue={params.limit}
                valueList={["15", "30", "100", "300"]}
                viewValue={(v) => v}
                handler={(value) => {
                  setParams((prev) => {
                    return {
                      ...prev,
                      page: "1",
                      limit: value,
                    };
                  });
                }}
              />
              <span style={{ marginLeft: "15px" }}>顯示頁數：</span>
              <Selector
                id="record-page"
                zindex="1"
                defaultValue={params.page}
                valueList={pages}
                viewValue={(v) => v}
                handler={(value) => {
                  setParams((prev) => {
                    return {
                      ...prev,
                      page: value,
                    };
                  });
                }}
              />
            </div>
          </>
        }
      />
      <DataLoaded
        isLoading={recordList.isLoading}
        data={getData(renderData, ["data"], [])}
        children={(v) => (
          <>
            <CompFloor2>{getData(v, ["id"])}</CompFloor2>
            <CompFloor2>{getData(v, ["edited_by"])}</CompFloor2>
            <CompFloor2>{getData(v, ["action"])}</CompFloor2>
            <CompFloor2>{getData(v, ["create_at"])}</CompFloor2>
            <CompFloor2 className="btns">
              <Button
                type="feature"
                title="查看"
                handler={() => dispatch(setEdit(getData(v, ["id"])))}
              />
            </CompFloor2>
          </>
        )}
      />
      {edit.status && (
        <ParamsDetail
          data={getData(renderData, ["data"], [])}
          closeHandler={() => dispatch(setEditReset())}
        />
      )}
    </StyledRecord>
  );
};
