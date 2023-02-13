import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "../views/ErrorPage";
import { Menu } from "../views/Menu";
import { OrderCompleted } from "../views/OrderCompleted";
import { Register } from "../views/Register";
import { History } from "../views/History";
import ResponsiveAppBar from "../component/ResponsiveAppBar";
import { User } from "firebase/auth";
import { GetUserInfo } from "../api/helper";
import { useEffect, useState } from "react";
import { Redirect } from "../component/Redirect";
import DrawerLeft from "../component/DrawerLeft";
import { Terms } from "../views/Terms";
import { PrivacyPolicy } from "../views/PrivacyPolicy";
import { Help } from "../views/Help";
import { GetPaymentStatus } from "../views/GetPaymentStatus";
import Admin from "../views/Admin";
import Footer from "../component/Footer";
import styled from "@emotion/styled";
import { TestData } from "../test/TestData";
const Router = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [appBarHeight, setAppBarHeight] = useState<number>(0);
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
          <DrawerLeft
            open={isMenu}
            setIsmenu={setIsMenu}
            onClick={function (item: string): void {
              let url = "";
              url =
                item === "ヘルプ"
                  ? "/help"
                  : item === "注文履歴"
                  ? "/history"
                  : item === "利用規約"
                  ? "/terms"
                  : item === "プライバシーポリシー"
                  ? "/privacy"
                  : item === "お問い合わせ"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform"
                  : "";
              window.location.href = url || "/";
            }}
          />
          <AppBarWrapper>
            <ResponsiveAppBar
              photoURL={user?.photoURL || "/static/images/avatar/2.jpg"}
              onClick={function (): void {
                setIsMenu(!isMenu);
              }}
              setAppBarHeight={setAppBarHeight}
            />
          </AppBarWrapper>
          {isLogin && (
            <Routes>
              <Route path="/" element={<Menu appBarHeight={appBarHeight} />} />
              <Route
                path="/register"
                element={<Register appBarHeight={appBarHeight} />}
              />
              {/* <Route path="/test" element={<TestData />} /> */}
              <Route
                path="/order/:id"
                element={<OrderCompleted appBarHeight={appBarHeight} />}
              />
              <Route
                path="/order/:id/:status"
                element={<OrderCompleted appBarHeight={appBarHeight} />}
              />
              <Route
                path="/check/:id/:paymentType"
                element={<GetPaymentStatus appBarHeight={appBarHeight} />}
              />
              <Route
                path="/history"
                element={<History appBarHeight={appBarHeight} />}
              />
              <Route
                path="/terms"
                element={<Terms appBarHeight={appBarHeight} />}
              />
              <Route
                path="/privacy"
                element={<PrivacyPolicy appBarHeight={appBarHeight} />}
              />
              <Route path="/logout" element={<Redirect logout={true} />} />
              <Route
                path="/contact"
                element={
                  <Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform" />
                }
              />
              <Route
                path="/help"
                element={<Help appBarHeight={appBarHeight} />}
              />
              <Route
                path="/admin"
                element={<Admin appBarHeight={appBarHeight} />}
              />
              <Route
                path="*"
                element={
                  <ErrorPage
                    text={"お探しのページは見つかりませんでした"}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    buttonText={"ホームに戻る"}
                    appBarHeight={appBarHeight}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

const AppBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;
export default Router;
