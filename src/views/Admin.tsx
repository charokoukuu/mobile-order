import { TodayAllOrderGet } from "../api/SubmitGet";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import TableComp from "../component/TableComp";

const Admin = () => {
  const [toDayOrder, setToDayOrder] = useState<DocumentData[]>([]);
  const [resetOrder, setResetOrder] = useState<string[]>([]);
  const [OrderTitle, setOrderTitle] = useState<string[]>([]);
  const [OrderCount, setOrderCount] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      let order = await TodayAllOrderGet("order", 10);
      setToDayOrder(order);
    })();
  }, []);

  // Order.menu.titleをそれぞれリスト型へ
  useEffect(() => {
    toDayOrder.map((order) => {
      //   setResetOrder((resetOrder) => [...resetOrder, order.id]);
      return order.menu.map((menu: DocumentData) => {
        return setResetOrder((resetOrder) => [...resetOrder, menu.title]);
      });
    });
  }, [toDayOrder]);

  // リスト内の重複をカウント
  useEffect(() => {
    const counter: any = {};
    resetOrder.forEach((item) => {
      counter[item] = (counter[item] || 0) + 1;
    });
    setOrderCount(Object.values(counter));
    setOrderTitle(Object.keys(counter));
  }, [resetOrder]);

  return (
    <div>
      <h1>注文管理画面</h1>
      <TableComp title={OrderTitle} count={OrderCount} />
    </div>
  );
};

export default Admin;
