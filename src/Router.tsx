import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Menu } from "./Menu";
import { OrderCompleted } from "./OrderCompleted";
import { Register } from "./Register";
import { Status } from "./Status";
import { History } from "./History";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import { User } from "firebase/auth";
import { GetUserInfo } from "./SubmitGet";
import { useEffect } from "react";
import { TestData } from "./TestData";
import { Redirect } from "./component/Redirect";
import DrawerLeft from "./component/DrawerLeft";
import { Terms } from "./Terms";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { Help } from "./Help";
import { GetPaymentStatus } from "./GetPaymentStatus";
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
          <ResponsiveAppBar
            photoURL={user?.photoURL || "/static/images/avatar/2.jpg"} onClick={function (): void {
              setIsMenu(!isMenu);
            }} />
          {isLogin && (
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/register" element={<Register />} />
                <Route path="/test" element={<TestData />} />
                <Route path="/status:id" element={<Status />} />
                <Route path="/order/:id" element={<OrderCompleted />} />
                <Route path="/order/:id/:status" element={<OrderCompleted />} />
                <Route path="/check/:id/:paymentType" element={<GetPaymentStatus />} />
                <Route path="/history" element={<History />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/logout" element={<Redirect logout={true} />} />
                <Route path="/contact" element={<Redirect url="https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform" />} />
                <Route path="/help" element={<Help />} />
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
            </div>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
