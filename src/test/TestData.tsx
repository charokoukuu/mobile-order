import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { functions } from "../api/Firebase";
import { RedirectModal } from "../component/RedirectModal";
import { Spacer } from "../component/SwipeTabs";

export const TestData = (props: { appBarHeight: number }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const Pay = () => {
    const paypay = httpsCallable(functions, "test");
    (async () => {
      // PayPayの型がわからないので一旦disable
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await paypay({
        orderId: "ljnvkjdnjdfnjklsf",
        redirectUrl: "https://mobile-order-4d383.web.app",
        amount: 300,
        orderDescription: "test",
      });
      console.log(data);
    })();
  };
  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <RedirectModal
        isModal={isModal}
        countTimer={50000}
        toURL="/register"
        buttonText="ログイン画面に戻る"
        noPaymentTitle={["なるき", "じゅんじゅん"]}
      />
      <button onClick={() => setIsModal(true)}>モーダルを開く</button>
    </div>
  );
};
