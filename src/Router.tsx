import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { ErrorPage } from './ErrorPage';
import { Menu } from './Menu';
import { Register } from './Register';
import { Status } from './Status';


const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/test" element={<App />} />
                        <Route path="/status:id" element={<Status />} />


                        <Route path="*" element={
                            <ErrorPage text={'お探しのページは見つかりませんでした'} onClick={() => {
                                window.location.href = "/";
                            }} buttonText={'ホームに戻る'} />
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
            </BrowserRouter>
        </div>
    );
};

export default Router;
