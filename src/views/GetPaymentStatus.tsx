import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { PayPayGetStatus, StripeGetStatus } from "../api/SubmitGet";
import { Spacer } from "../component/SwipeTabs";
interface Props {
  appBarHeight: number;
}
export const GetPaymentStatus = ({ appBarHeight }: Props) => {
  const params = useParams();
  useEffect(() => {
    (async () => {
      const checkoutId = params.id;
      const paymentType = params.paymentType;
      if (paymentType === "stripe") {
        await StripeGetStatus(checkoutId || "");
      } else if (paymentType === "paypay") {
        await PayPayGetStatus(checkoutId || "");
      }
    })();
  }, [params.id, params.paymentType]);

  return (
    <>
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      <h2 style={{ textAlign: "center" }}>決済を確認中です</h2>
      <LoadingAnimation type={"orbit"} top="70%" />
    </>
  );
};
