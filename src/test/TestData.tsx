import { Button } from "@mui/material";
import { httpsCallable } from "firebase/functions";
import IntegrationNotistack from "../component/IntegrationNotistack";
import { functions } from "../api/Firebase";

export const TestData = () => {
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
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      <RedirectModal
        isModal={isModal}
        countTimer={50000}
        toURL="/register"
        noPaymentTitle={["なるき", "じゅんじゅん"]}
      />
      <button onClick={() => setIsModal(true)}>モーダルを開く</button>
    </div>
  );
};
