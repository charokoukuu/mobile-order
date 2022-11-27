import { Spacer } from "../component/SwipeTabs";
export const Help = (props: { appBarHeight: number }) => {
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <div className="m-[2%] rounded-b-lg bg-white p-[2%]">
        <h2 className="my-4 text-2xl font-bold text-runticketBlue">STEP 1</h2>
        <p className="mb-3">メニューを選択します</p>
        <img
          className="mx-auto"
          src="/help/home.png"
          alt="menu"
          width={"70%"}
        />
        <h2 className="my-4 text-2xl font-bold text-runticketBlue">STEP 2</h2>
        <p className="mb-3">オプションを選択し、カートに追加します</p>
        <img
          className="mx-auto"
          src="/help/detail.png"
          alt="menu"
          width={"70%"}
        />
        <h2 className="my-4 text-2xl font-bold text-runticketBlue">STEP 3</h2>
        <p className="mb-3">決済方法を選択します</p>
        <img
          className="mx-auto"
          src="/help/order.png"
          alt="menu"
          width={"70%"}
        />
        <h2 className="my-4 text-2xl font-bold text-runticketBlue">STEP 4</h2>
        <p className="m-auto mb-3 w-[70%]">
          発行されたQRコードをスキャンし、食券を発行します
        </p>
        <div className="m-[5%_0_13%_0] flex">
          <img
            src="/help/printer.svg"
            alt="menu"
            width={"50%"}
            className="rotate-[-10deg] transform"
          />
          <img
            src="/help/scanner.svg"
            alt="menu"
            width={"50%"}
            className="rotate-[-10deg] transform"
          />
        </div>
      </div>
    </div>
  );
};
