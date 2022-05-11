import "reset-css";
import packageJson from "../../package.json";
import { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { HashRouter } from "react-router-dom";
import { TotalRoute } from "./Routes";
import { styles } from "../constants/styles";
// import { getData } from "../common-lib/lib";
// import { fetchAdminUserInfo } from "./Common/fetchData";
import { GapiChangePwd } from "../common-lib/components/GapiChangePwd";
// api url
// import { API_URL } from "../configs/apiUrl";
// reducers
import { setChangePwd } from "../reducer/props";
import { setUserInfo } from "../reducer/userInfo";
// localStorage init
localStorage.setItem(
  "lang",
  localStorage.getItem("lang") ? localStorage.getItem("lang") : "cn"
);
// Authorization
// localStorage.setItem(
//   "authorization",
//   localStorage.getItem("authorization")
//     ? localStorage.getItem("authorization")
//     : ""
// );
// localStorage.setItem(
//   "isLogin",
//   localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") : "true"
// );
const GlobalStyle = createGlobalStyle`
@keyframes popup {
    0% {
      transform: translate(-50%, 50%) scale(0);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes ListfadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes editpopup {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes basic-help {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  body {
    font-family: "PingFangSC-Regular";
    font-size: 16px;
    background-color: ${styles.bodyColor};
  }
  a {
    text-decoration: none;
    color: ${styles.color};
  }
  button {
    outline: transparent;
    border: 0;
  }
  input {
    outline: transparent;
    border: 0;
    color:${styles.color};
    background-color: ${styles.input};
  }
  input::placeholder {
    color:${styles.placeholder}
  }
`;
const StyledApp = styled.div``;

export const App = () => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  // login check
  useEffect(() => {
    // fetchAdminUserInfo((e) =>
    //   dispatch(
    //     setUserInfo({
    //       account: getData(e, ["account"]),
    //       department: getData(e, ["department"]),
    //       avatar_url: getData(e, ["avatar_url"]),
    //       level: getData(e, ["level"]),
    //     })
    //   )
    // );
    dispatch(
      setUserInfo({
        account: "steve",
        department: "develop",
        avatar_url: "",
        level: 2,
      })
    );
  }, [dispatch]);
  return (
    <StyledApp data-version={packageJson.version}>
      <GlobalStyle />
      <HashRouter>
        <TotalRoute />
      </HashRouter>
      {props.changePwd && (
        <GapiChangePwd
          apiUrl={""}
          closehandler={() => dispatch(setChangePwd(false))}
        />
      )}
    </StyledApp>
  );
};
