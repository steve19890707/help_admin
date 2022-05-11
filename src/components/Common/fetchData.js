import { useSelector } from "react-redux";
import { useEffect } from "react";
import { noop } from "@babel/types";
import { getData } from "../../common-lib/lib";
// import { slotHelpInitData } from "../../constants";
import * as api from "../../api";

const dataFetch = ({ res, handler = noop, emptyData = [] }) => {
  const preview = res.data;
  const SUCCESS = preview.error_msg === "SUCCESS";
  if (SUCCESS) {
    const data = preview.result;
    handler(dataVerify(data, emptyData));
  } else {
    handler(emptyData);
    redirectToLogin(preview.error_code, preview.error_msg);
    console.error(preview.error_msg);
  }
};

const dataSort = (list = [], type = "game_id") => {
  return list.sort(
    (a, b) => Number(getData(a, [type])) - Number(getData(b, [type]))
  );
};
export const dataVerify = (data, defaultData = [], isSort = false) => {
  if (data && data !== null && data !== undefined) {
    return isSort ? dataSort(data) : data;
  } else {
    return defaultData;
  }
};

const update = ({ res, type = "", id = "" }) => {
  const preview = res.data;
  const SUCCESS = preview.error_msg === "SUCCESS";
  if (!SUCCESS) {
    redirectToLogin(preview.error_code, preview.error_msg);
    console.error(preview.error_msg);
  } else {
    switch (type) {
      case "slotdetail":
        window.location.href = window.location.origin + `#/slot?game_id=${id}`;
        window.location.reload();
        break;
      default:
        window.location.reload();
        break;
    }
  }
};

const errorFetch = (error) => {
  alert(error);
  console.error(error);
};

// const errorFetchReset = (error, handler = noop) => {
//   alert(error);
//   console.error(error);
//   handler();
// };

const redirectToLogin = (code = 1, msg = "") => {
  switch (code) {
    case 1301004:
    case 1605001:
    case 1605002:
    case 1605003:
    case 1605004:
    case 1604006:
      if (window.location.hash !== "#/login") {
        if (localStorage.getItem("isLogin") !== "false") {
          alert(msg);
        }
        localStorage.setItem("isLogin", "false");
        window.location.href = window.location.origin + "#/login";
      } else return;
      break;
    default:
      alert(msg);
      break;
  }
};

// render get data hook
export const RenderGetDataHook = ({
  param = "",
  lang = "",
  sortType = "",
  isMap = false,
  isCopy = false,
  isSort = false,
  isPermission = false,
  isNeedReRender = false,
  fetchData = noop,
  setData = noop,
  copySetData = noop,
  setReRenderData = noop,
}) => {
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    // const noLogin = localStorage.getItem("isLogin") === "false";
    // if (noLogin && window.location.hash !== "#/login") {
    //   window.location.href = window.location.origin + "#/login";
    // }
    // if (userInfo.level === "none" || noLogin) {
    //   return;
    // }
    // if (isPermission && userInfo.level !== 2) {
    //   return (window.location.href =
    //     window.location.origin + window.location.pathname + `#/`);
    // }
    const defaultData = isMap ? {} : [];
    setData({
      data: defaultData,
      isLoading: true,
    });
    fetchData({
      param: param,
      lang: lang,
      handler: (data) => {
        isNeedReRender && setReRenderData(dataVerify(data, defaultData));
        setData({
          data: dataVerify(data, defaultData, isSort),
          isLoading: false,
        });
        isCopy && copySetData(dataVerify(data, defaultData));
      },
    });
  }, [
    param,
    lang,
    sortType,
    isMap,
    isCopy,
    isSort,
    isPermission,
    isNeedReRender,
    fetchData,
    setData,
    copySetData,
    setReRenderData,
    userInfo.level,
  ]);
};

export const fetchLogout = () => {
  return api
    .apiLogout()
    .then((res) => {
      const preview = res.data;
      const SUCCESS = preview.error_msg === "SUCCESS";
      if (SUCCESS) {
        localStorage.setItem("authorization", "");
        localStorage.setItem("isLogin", "false");
        window.location.reload();
      }
    })
    .catch((error) => errorFetch(error));
};
//  admin
export const fetchAdminList = ({ handler = noop }) => {
  return api
    .apiAdminList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchAdminUserInfo = (handler = noop) => {
  return api
    .apiAdminUserInfo()
    .then((res) => dataFetch({ res, handler, emptyData: {} }))
    .catch((error) => errorFetch(error));
};

export const fetchAdminUpdate = (param) => {
  return api
    .apiAdminUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// maintin
export const fetchMaintainList = ({ handler = noop }) => {
  return api
    .apiMaintainList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchMaintainUpdate = (param) => {
  return api
    .apiMaintainUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// menu
export const fetchMenuList = (handler = noop) => {
  return api
    .apiMenuList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

// slot help
export const fetchSlotHelpList = ({ handler = noop }) => {
  return api
    .apiSlotHelpList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchSlotHelpDetail = ({ param, lang, handler = noop }) => {
  const params = { param, lang };
  return api
    .apiSlotHelpDetail(params)
    .then((res) => {
      const preview = res.data;
      const SUCCESS = preview.error_msg === "SUCCESS";
      if (SUCCESS) {
        const data = dataVerify(preview.result, {});
        const defaultData = getData(data, ["default_data"], []);
        // const initDefaultData =
        //   defaultData.length > 0 ? defaultData : slotHelpInitData(lang);
        handler({
          ...data,
          default_data: defaultData,
        });
      } else {
        handler({});
        redirectToLogin(preview.error_code, preview.error_msg);
        console.error(preview.error_msg);
      }
    })
    .catch((error) => errorFetch(error));
};

export const fetchSlotHelpListUpdate = (param) => {
  return api
    .apiSlotHelpListUpdate(param)
    .then((res) => update({ res, type: "slotdetail", id: param.game_id }))
    .catch((error) => errorFetch(error));
};

// record
export const fetchRecordList = ({ param = {}, handler = noop }) => {
  return api
    .apiRecordList(param)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};
