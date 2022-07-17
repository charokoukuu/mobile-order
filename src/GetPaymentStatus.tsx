import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { CheckPayment } from "./SubmitGet";
export const GetPaymentStatus = () => {
  const params = useParams();
  useEffect(() => {
    (async () => {
      const checkoutId = params.id;
      console.log(checkoutId);
      await CheckPayment("stripe",checkoutId||"");
    })();
  }, [params.id]);

  return (
    <>
      <LoadingAnimation type={"jelly"} />
    </>
  );
};
