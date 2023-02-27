// import { httpsCallable } from "firebase/functions";
// import { useState } from "react";
// import { functions } from "../api/Firebase";
// import { RedirectModal } from "../component/RedirectModal";
import { ErrorPage } from "../views/Error";
// import { Spacer } from "../component/SwipeTabs";

export const TestData = (props: { appBarHeight: number }) => {
  // const [isModal, setIsModal] = useState<boolean>(false);
  // const Pay = () => {
  //   const paypay = httpsCallable(functions, "test");
  //   (async () => {
  //     // PayPayの型がわからないので一旦disable
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const data: any = await paypay({
  //       orderId: "ljnvkjdnjdfnjklsf",
  //       redirectUrl: "https://mobile-order-4d383.web.app",
  //       amount: 300,
  //       orderDescription: "test",
  //     });
  //     console.log(data);
  //   })();
  // };
  return (
    <ErrorPage
      appBarHeight={props.appBarHeight}
      onClick={() => {
        window.location.href = "/";
      }}
      text="こんちは"
      buttonText="メニューに戻る"
    />
  );
};
