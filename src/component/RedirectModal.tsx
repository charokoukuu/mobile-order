import { Modal } from "@mui/material";

interface RedirectModalProps {
  isModal: boolean;
  countTimer: number;
}

export const RedirectModal = (props: RedirectModalProps) => {
  return (
    <>
      {props.isModal ? (
        <Modal
          open={props.isModal}
          onClose={() => {
            // props.setIsModal(false);
          }}
        >
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
              注文に失敗しました。
            </h2>
            <p
              style={{
                textAlign: "center",
              }}
            >
              選択された商品の中に在庫切れの商品があります。
              商品をご確認の上もう一度ご注文ください
              {props.countTimer} 秒後に自動的に閉じます。
            </p>
            <div style={{ textAlign: "center" }}>
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
                  window.location.href = "/register";
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
