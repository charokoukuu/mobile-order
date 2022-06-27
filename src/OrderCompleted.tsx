import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSpecificData } from "./SubmitGet";
import { DocumentData } from "firebase/firestore";
export const OrderCompleted = () => {
  const [orderData, setOrderData] = useState<DocumentData>();
  const params = useParams();

  useEffect(() => {
    (async () => {
      params.id && setOrderData(await GetSpecificData("order", params.id));
      console.log(params.id);
    })();
  }, [params.id]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);
  return (
    <div>
      <h1>Order</h1>
      {/* <p>{id}</p> */}
    </div>
  );
};
