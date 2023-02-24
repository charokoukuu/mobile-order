import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { PaymentGetStatus } from "../api/SubmitGet";
import { Spacer } from "../component/SwipeTabs";
import { paymentType } from "../component/Order";
import { PayPayStatusCheck } from "../api/Payment";
interface Props {
  appBarHeight: number;
}
export const GetPaymentStatus = ({ appBarHeight }: Props) => {
  const params = useParams();
  useEffect(() => {
    (async () => {
      const checkoutId = params.id;
      const paymentType = params.paymentType as paymentType;

      checkoutId && paymentType === "paypay" && PayPayStatusCheck(checkoutId);
      checkoutId &&
        paymentType === "stripe" &&
        (await PaymentGetStatus(paymentType, checkoutId));
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
