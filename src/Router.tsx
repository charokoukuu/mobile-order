import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./ErrorPage";
import { Menu } from "./Menu";
import { OrderCompleted } from "./OrderCompleted";
import { Register } from "./Register";
import { Status } from "./Status";
import { History } from "./History";
import { Stripe } from "./Stripe";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import { User } from "firebase/auth";
import { GetUserInfo } from "./SubmitGet";
import { UserInfo } from "./UserInfo";
import { useEffect } from "react";
const Router = () => {
  const [user, setUser] = React.useState<User>();
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await GetUserInfo((e) => {
        UserInfo.user = e;
        setUser(e);
      });
      setIsLogin(true);
    })();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <div>
          <ResponsiveAppBar
            photoURL={user?.photoURL || "/static/images/avatar/2.jpg"}
          />
          {isLogin && (
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<App />} />
              <Route path="/status:id" element={<Status />} />
              <Route path="/order/:id" element={<OrderCompleted />} />
              <Route path="/history" element={<History />} />
              <Route path="/stripe" element={<Stripe />} />
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
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
