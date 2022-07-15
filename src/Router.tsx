import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Menu } from "./Menu";
import { OrderCompleted } from "./OrderCompleted";
import { Register } from "./Register";
import { Status } from "./Status";
import { History } from "./History";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import { TestData } from "./TestData";
import { Redirect } from "./component/Redirect";
import DrawerLeft from "./component/DrawerLeft";
import { Terms } from "./Terms";
import { Help } from "./Help";
const Router = () => {
  const [isMenu, setIsMenu] = React.useState<boolean>(false);

  // }, []);
  return (
    <div>
      <BrowserRouter>
        <div>
          <DrawerLeft open={isMenu} setIsmenu={setIsMenu} onClick={function (item: string): void {
            let url: string = "";
            url = item === "ヘルプ" ? "/help" :
              item === "注文履歴" ? "/history" :
                item === "利用規約" ? "/terms" :
                  item === "お問い合わせ" ? "https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform" :
                    ""
            window.location.href = url || "/";
          }} />
          <ResponsiveAppBar
            photoURL={""} onClick={function (): void {
              setIsMenu(!isMenu);
            }} />
          {true && (
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<TestData />} />
              <Route path="/status:id" element={<Status />} />
              <Route path="/order/:id" element={<OrderCompleted />} />
              <Route path="/order/:id/:status" element={<OrderCompleted />} />
              <Route path="/history" element={<History />} />
              <Route path="/terms" element={<Terms />} />
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
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
