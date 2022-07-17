import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { PayPayGetStatus, StripeGetStatus } from "./SubmitGet";
export const GetPaymentStatus = () => {
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
      <h2 style={{ textAlign: "center" }}>決済を確認中です...</h2>
      <LoadingAnimation type={"orbit"} top="70%" />
    </>
  );
};
