import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "../views/ErrorPage";
import { Menu } from "../views/Menu";
import { OrderCompleted } from "../views/OrderCompleted";
import { Register } from "../views/Register";
import { History } from "../views/History";
import ResponsiveAppBar from "../component/ResponsiveAppBar";
import { User } from "firebase/auth";
import { GetUserInfo } from "../api/SubmitGet";
import { useEffect } from "react";
import { Redirect } from "../component/Redirect";
import DrawerLeft from "../component/DrawerLeft";
import { Terms } from "../views/Terms";
import { PrivacyPolicy } from "../views/PrivacyPolicy";
import { Help } from "../views/Help";
import { GetPaymentStatus } from "../views/GetPaymentStatus";
import Admin from "../views/Admin";
import Footer from "../component/Footer";
import { Grid } from "@mui/material";
// import { TestData } from "../test/TestData";
const Router = () => {
  const [isMenu, setIsMenu] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>();
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  useEffect(() => {
    window.document.title = "RunTicket";
    (async () => {
      await GetUserInfo((e) => {
        setUser(e);
      });
      setIsLogin(true);
    })();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <div>
          <DrawerLeft open={isMenu} setIsmenu={setIsMenu} onClick={function (item: string): void {
            let url: string = "";
            url = item === "ヘルプ" ? "/help" :
              item === "注文履歴" ? "/history" :
                item === "利用規約" ? "/terms" :
                  item === "プライバシーポリシー" ? "/privacy" :
                    item === "お問い合わせ" ? "https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform" :
                      ""
            window.location.href = url || "/";
          }} />
          <Grid container alignItems="center" justifyItems="center" justifyContent={"center"}>
            <Grid item xs={12} md={4} >
              <ResponsiveAppBar
                photoURL={user?.photoURL || "/static/images/avatar/2.jpg"} onClick={function (): void {
                  setIsMenu(!isMenu);
                }} />
            </Grid>
          </Grid>
          {isLogin && (
            <Grid container alignItems="center" justifyItems="center" justifyContent={"center"}>
              <Grid item xs={12} md={4}>
                <Routes>
                  <Route path="/" element={<Menu />} />
                  <Route path="/register" element={<Register />} />
                  {/* <Route path="/test" element={<TestData />} /> */}
                  <Route path="/order/:id" element={<OrderCompleted />} />
                  <Route path="/order/:id/:status" element={<OrderCompleted />} />
                  <Route path="/check/:id/:paymentType" element={<GetPaymentStatus />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/logout" element={<Redirect logout={true} />} />
                  <Route path="/contact" element={<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform" />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route
                    path="*"
                    element={
                      <ErrorPage
                        text={"お探しのページは見つかりませんでした"}
                        onClick={() => {
                          window.location.href = "/";
                        }}
                        buttonText={"ホームに戻る"}
                      />
                    }
                  />
                </Routes>
              </Grid>
            </Grid>
          )}
        </div>
      </BrowserRouter >
      <Footer />
    </div >
  );
};

export default Router;
