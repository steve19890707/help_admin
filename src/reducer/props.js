import { createSlice } from "@reduxjs/toolkit";

const props = createSlice({
  name: "props",
  initialState: {
    language: localStorage.getItem("lang") || "cn",
    lineContentFirstInit: true,
    langText: {
      cn: "简中",
      en: "英文",
      th: "泰文",
      id: "印尼文",
      vn: "越南文",
      ko: "韓文",
      es: "西班牙文",
      ja: "日文",
      "pt-BR": "巴西葡萄牙文",
      ph: "菲律賓文",
    },
    langList: [
      {
        id: 1,
        lang: "cn",
        name: "简中",
      },
      {
        id: 2,
        lang: "en",
        name: "英文",
      },
      { id: 3, lang: "th", name: "泰文" },
      { id: 4, lang: "id", name: "印尼文" },
      { id: 5, lang: "vn", name: "越南文" },
      { id: 6, lang: "ko", name: "韓文" },
      { id: 7, lang: "es", name: "西班牙文" },
      { id: 8, lang: "ja", name: "日文" },
      { id: 9, lang: "pt-BR", name: "巴西葡萄牙文" },
      { id: 10, lang: "ph", name: "菲律賓文" },
    ],
    changePwd: false,
    alert: {
      status: false,
      content: "",
    },
    confirm: {
      status: false,
      content: "",
      type: "",
    },
  },
  reducers: {
    setLanguage: (state, actions) => {
      localStorage.setItem("lang", actions.payload);
      state.language = actions.payload;
    },
    setLineContentFirstInit: (state, actions) => {
      state.lineContentFirstInit = actions.payload;
    },
    setChangePwd: (state, actions) => {
      state.changePwd = actions.payload;
    },
    setAlert: (state, actions) => {
      const { status, content } = actions.payload;
      state.alert = {
        status: status,
        content: content,
      };
    },
    setConfirm: (state, actions) => {
      const { status, content, type, param } = actions.payload;
      state.confirm = {
        status: status,
        content: content,
        type: type,
        param: param,
      };
    },
  },
});
export default props.reducer;
export const {
  setLanguage,
  setLineContentFirstInit,
  setChangePwd,
  setAlert,
  setConfirm,
} = props.actions;
