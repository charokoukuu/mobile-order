import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { GetAllData, GetOrderData } from "./SubmitGet";
import { Order } from "./component/Order";
import { DocumentData } from "firebase/firestore";
export const OrderCompleted = () => {
  const [orderData, setOrderData] = useState<DocumentData>();
  const params = useParams();

  useEffect(() => {
    (async () => {
      params.id && setOrderData(await GetOrderData(params.id));
      console.log(params.id);
    })();
  }, []);

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
