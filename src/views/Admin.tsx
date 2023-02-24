import { TodayAllOrderGet } from "../api/helper";
import { useEffect, useState } from "react";
import TableComp from "../component/TableComp";
import { OrderData } from "../types";
import { Spacer } from "../component/SwipeTabs";

const Admin = (props: { appBarHeight: number }) => {
  const [toDayOrder, setToDayOrder] = useState<OrderData[]>([]);
  const [resetOrder, setResetOrder] = useState<string[]>([]);
  const [OrderTitle, setOrderTitle] = useState<string[]>([]);
  const [OrderCount, setOrderCount] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      const order = await TodayAllOrderGet("order", 10);
      setToDayOrder(order);
    })();
  }, []);

  // Order.menu.titleをそれぞれリスト型へ
  useEffect(() => {
    toDayOrder.map((order) => {
      //   setResetOrder((resetOrder) => [...resetOrder, order.id]);
      return order.menu.map((menu) => {
        return setResetOrder((resetOrder) => [...resetOrder, menu.title]);
      });
    });
  }, [toDayOrder]);

  // リスト内の重複をカウント
  useEffect(() => {
    const counter: { [key: string]: number } = {};
    resetOrder.forEach((item) => {
      counter[item] = (counter[item] || 0) + 1;
    });
    setOrderCount(Object.values(counter));
    setOrderTitle(Object.keys(counter));
  }, [resetOrder]);

  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight || 56} mode={"history"} />
      <h1>注文管理画面</h1>
      <TableComp title={OrderTitle} count={OrderCount} />
    </div>
  );
};

export default Admin;
