import { TodayOrderGet } from "./SubmitGet";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import TableComp from "./component/TableComp";

const Admin = () => {
  const [toDayOrder, setToDayOrder] = useState<DocumentData[]>([]);
  const [resetOrder, setResetOrder] = useState<string[]>([]);
  const [OrderTitle, setOrderTitle] = useState<string[]>([]);
  const [OrderCount, setOrderCount] = useState<number[]>([]);
  useEffect(() => {
    const today = new Date(Date.now());
    // const today:Date = `${year}/${month}/${day}`;
    console.log(today);
    (async () => {
      let order = await TodayOrderGet("order", 10, today);
      setToDayOrder(order);
      console.log(order);
      //   setIsGetToDayOrder(true);
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
    console.log(resetOrder);
    const counter: any = {};
    resetOrder.forEach((item) => {
      counter[item] = (counter[item] || 0) + 1;
    });
    console.log(counter);
    setOrderCount(Object.values(counter));
    setOrderTitle(Object.keys(counter));
  }, [resetOrder]);

  return (
    <div>
      <h1>注文管理画面</h1>
      {/* {resetOrder.map((order, i: number) => {
        return <p key={i}>{order}</p>;
      })} */}
      {/* {OrderTitle.map((order, i: number) => {
        return (
          <div key={i}>
            <p>{order}</p>
          </div>
        );
      })}
      {OrderCount.map((count, i: number) => {
        return (
          <div key={i}>
            <p>{count}</p>
          </div>
        );
      })} */}
      <TableComp title={OrderTitle} count={OrderCount} />
    </div>
  );
};

export default Admin;
