import { Modal } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { NewTimer } from "../api/SubmitGet";

interface RedirectModalProps {
  isModal: boolean;
  countTimer: number;
  toURL: string;
  buttonText: string;
  noPaymentTitle?: string[];
}

export const RedirectModal = (props: RedirectModalProps) => {
  const [timeNumber, setTimeNumber] = useState<number>(props.countTimer / 1000);
  const countTimer = useRef(new NewTimer(props.countTimer, setTimeNumber, "/"));

  useEffect(() => {
    if (props.isModal === true) {
      (() => {
        countTimer.current.afterToPage();
      })();
    }
  }, [props.isModal, props.toURL]);

  return (
    <>
      {props.isModal ? (
        <Modal open={props.isModal}>
          <div className="fixed top-1/2 left-1/2 z-10 h-auto w-[80%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-5">
            <h2 className="text-center text-2xl font-bold">
              注文に失敗しました
            </h2>
            <p className="text-center">
              選択された商品の中に在庫切れの商品があります。
              商品をご確認の上、再度注文をお願いします。
              <br />
              {props.noPaymentTitle?.map((title, index: number) => (
                <span className="text-[#f00]" key={index}>
                  {title}
                  {props.noPaymentTitle?.length !== index + 1 && ", "}
                </span>
              ))}
              の購入に失敗しました。
              <br />
              {timeNumber}
              秒後に自動的に戻ります。
            </p>
            <div className="mx-auto inline-grid w-full text-center">
              <button
                className="m-2 rounded-lg border-none bg-[#f00] py-2 px-4 text-base font-bold text-white"
                onClick={() => {
                  countTimer.current.clearTimer();
                  window.location.href = props.toURL;
                }}
              >
                {props.buttonText}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
