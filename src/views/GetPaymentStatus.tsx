import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { PaymentGetStatus } from "../api/helper";
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
      try {
        checkoutId && paymentType === "paypay" && PayPayStatusCheck(checkoutId);
        checkoutId &&
          paymentType === "stripe" &&
          (await PaymentGetStatus(paymentType, checkoutId));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [params.id, params.paymentType]);

  return (
    <>
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      <div className="my-4">
        <h2 className="japanese_L py-5 text-center text-2xl font-bold">
          決済を確認中です
        </h2>
        <LoadingAnimation type="orbit" />
      </div>
    </>
  );
};
