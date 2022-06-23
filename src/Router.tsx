import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorPage } from "./ErrorPage";
import { Menu } from "./Menu";
import { Order } from "./Order";
import { Register } from "./Register";
import { Status } from "./Status";
import { TestData } from "./TestData";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order" element={<Order />} />
            <Route path="/test" element={<TestData />} />
            <Route path="/status:id" element={<Status />} />

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
      </BrowserRouter>
    </div>
  );
};

export default Router;
