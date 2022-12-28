import { Modal } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { NewTimer } from "../api/SubmitGet";

interface RedirectModalProps {
  isModal: boolean;
  countTimer: number;
  toURL: string;
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
          <div
            style={{
              backgroundColor: "#EFEFEF",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "10",
              height: "auto",
              width: "80%",
              maxWidth: "500px",
              padding: "20px",
              borderRadius: "1rem",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              注文に失敗しました
            </h2>
            <p
              style={{
                textAlign: "center",
              }}
            >
              選択された商品の中に在庫切れの商品があります。
              商品をご確認の上、再度注文をお願いします。
              <br />
              {props.noPaymentTitle?.map((title, index: number) => (
                <span style={{ color: "red" }} key={index}>
                  {title}
                  {props.noPaymentTitle?.length !== index + 1 && ", "}
                </span>
              ))}
              の購入に失敗しました。
              <br />
              {timeNumber}
              秒後に自動的に戻ります。
            </p>
            <div
              style={{
                display: "inline-grid",
                alignItems: "center",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <button
                style={{
                  backgroundColor: "#FF0000",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  margin: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  // メニューに戻る
                  countTimer.current.clearTimer();
                  window.location.href = props.toURL;
                }}
              >
                メニュー画面に戻る
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
