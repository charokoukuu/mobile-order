import { Spacer } from "../component/SwipeTabs";
export const Help = (props: { appBarHeight: number }) => {
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2vw",
          borderRadius: "8px",
          width: "90%",
          margin: "2vw auto",
        }}
      >
        <h2 className="themeFontColor">STEP 1</h2>
        <p>メニューを選択します</p>
        <img src="/help/home.png" alt="menu" width={"70%"} />
        <h2 className="themeFontColor">STEP 2</h2>
        <p>オプションを選択し、カートに追加します</p>
        <img src="/help/detail.png" alt="menu" width={"70%"} />
        <h2 className="themeFontColor">STEP 3</h2>
        <p>決済方法を選択します</p>
        <img src="/help/order.png" alt="menu" width={"70%"} />
        <h2 className="themeFontColor">STEP 4</h2>
        <p style={{ width: "70vw", margin: "auto" }}>
          発行されたQRコードをスキャンし、食券を発行します
        </p>
        <div style={{ display: "flex", margin: "5vw 0 13vw 0" }}>
          <img
            src="/help/printer.svg"
            alt="menu"
            width={"50%"}
            style={{ transform: "rotate(-10deg)" }}
          />
          <img
            src="/help/scanner.svg"
            alt="menu"
            width={"50%"}
            style={{ transform: "rotate(-10deg)" }}
          />
        </div>
      </div>
    </div>
  );
};
