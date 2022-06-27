import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { GetAllData, GetOrderData } from "./SubmitGet";
import { Order } from "./component/Order";
export const OrderCompleted = () => {
  const [orderId, setOrderId] = useState<any>();
  const [order, setOrder] = useState("");
  const { id } = useParams<string>();
  useEffect(() => {
    setOrderId(id);
    (async () => {
      id !== undefined && setOrderId(await GetOrderData(id));
      console.log(id);
      console.log(orderId);
    })();
  }, []);

  return (
    <div>
      <h1>Order</h1>
      <p>{orderId}</p>
    </div>
  );
};
