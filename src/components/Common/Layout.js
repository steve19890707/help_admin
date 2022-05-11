import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// component
import { Aside } from "./Aside";
import { Header } from "./Header";
import { Alert } from "./Alert";
import { Confirm } from "./Confirm";

const StyledLayout = styled.main`
  padding: 95px 15px 15px 265px;
  min-width: 800px;
`;
export const Layout = ({ children }) => {
  const props = useSelector((state) => state.props);
  const location = useLocation();
  // login redirection
  if (
    localStorage.getItem("isLogin") === "true" &&
    location.pathname === "/login"
  ) {
    window.location.href = window.location.origin + "#/rotate-list";
  }
  return (
    <>
      <Header />
      <StyledLayout>{children}</StyledLayout>
      <Aside pathname={location.pathname} />
      {props.alert.status && <Alert />}
      {props.confirm.status && <Confirm />}
    </>
  );
};
