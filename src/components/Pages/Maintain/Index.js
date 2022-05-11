import { useEffect, useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import { GiCheckedShield } from "react-icons/gi";
// reducers
import { setConfirm } from "../../../reducer/props";
// listener
import { Keydown } from "../../../common-lib/hooks";
// component
import { LoaderSpinner } from "../../Common/Loader";
// api
// import { fetchMaintainList, RenderGetDataHook } from "../../Common/fetchData";

const StyledMaintain = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: ${styles.mainColor};
  .maintain-title {
    margin-bottom: 25px;
    span {
      font-size: 22px;
      font-weight: bold;
    }
  }
  .maintain-switch {
    display: flex;
    align-items: center;
  }
  .svg-GiCheckedShield {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .maintain-switch .caption {
    font-size: 18px;
    margin-right: 20px;
  }
  .edited-by {
    margin-left: 20px;
    color: ${styles.editedBy};
  }
`;

const CreateMaintainSwitch = ({
  title = "",
  isLoading = true,
  status = false,
  param = {},
  editByComp,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="maintain-switch">
      <GiCheckedShield className="svg-GiCheckedShield" />
      <div className="caption">{title}</div>
      {isLoading ? (
        <LoaderSpinner width="32" height="32" />
      ) : (
        <Switch
          onColor={styles.switchStatus}
          onChange={() => {
            dispatch(
              setConfirm({
                status: true,
                content: "確定要開啟/關閉維護?",
                // type: "pearMaintain",
                type: "",
                param: { ...param },
              })
            );
          }}
          checked={status}
        />
      )}
      {editByComp()}
    </div>
  );
};
export const Maintain = () => {
  const [maintainData, setMaintainData] = useState({
    data: [],
    isLoading: true,
  });
  const [editedByStatus, setEditedByStatus] = useState(false);
  // PearMaintain
  const getPearMaintain =
    maintainData.data.find((v) => getData(v, ["title"]) === "PearMaintain") ||
    [];
  Keydown((e) => {
    const checkEdited = e.keyCode === 17;
    if (checkEdited) {
      setEditedByStatus((prev) => !prev);
    }
  });
  // RenderGetDataHook({
  //   fetchData: fetchMaintainList,
  //   setData: setMaintainData,
  //   isPermission: true,
  // });
  useEffect(() => {
    setMaintainData({
      data: [
        [
          {
            title: "PearMaintain",
            status: false,
            edited_by: "steve",
            updated_at: "2022-01-21T10:02:42-04:00",
          },
        ],
      ],
      isLoading: false,
    });
  }, []);
  return (
    <StyledMaintain>
      <div className="maintain-title">
        <span>維護開關</span>
      </div>
      <CreateMaintainSwitch
        title="前台(pear)維護"
        isLoading={maintainData.isLoading}
        status={getData(getPearMaintain, ["status"])}
        param={{
          status: !getData(getPearMaintain, ["status"]),
          title: getData(getPearMaintain, ["title"]),
        }}
        editByComp={() => {
          return (
            <>
              {editedByStatus && (
                <div className="edited-by">
                  前次編輯人員:
                  {getData(getPearMaintain, ["edited_by"])}
                </div>
              )}
            </>
          );
        }}
      />
    </StyledMaintain>
  );
};
