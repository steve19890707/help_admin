import { Routes, Route, Navigate } from "react-router-dom";
// component
// import { GapiLogin } from "../common-lib/components/GapiLogin";
import { Layout } from "./Common/Layout";
import { Slot } from "./Pages/Slot/Index";
import { Maintain } from "./Pages/Maintain/Index";
import { UserManagement } from "./Pages/UserManagement/Index";
import { Record } from "./Pages/Record/Index";
// api
// import { API_URL } from "../configs/apiUrl";

export const TotalRoute = () => {
  return (
    <Layout>
      <Routes>
        {/* <Route exact path="/login" element={<GapiLogin apiUrl={API_URL} />} /> */}
        <Route exact path="/slot" element={<Slot />} />
        <Route exact path="/maintain" element={<Maintain />} />
        <Route exact path="/user-management" element={<UserManagement />} />
        <Route exact path="/record" element={<Record />} />
        {/* <Route
          path="*"
          element={
            localStorage.getItem("isLogin") === "true" ? (
              <Navigate to="/slot" />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
};
