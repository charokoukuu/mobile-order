import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { convertToTitleCountFormat } from "../api/helper";
import { MenuData, OrderListTypes } from "../types";

interface Props {
  menu: MenuData[];
}
export const HistoryContent = ({ menu }: Props) => {
  const [orderList, setOrderList] = useState<OrderListTypes[]>([]);

  useEffect(() => {
    setOrderList(convertToTitleCountFormat(menu));
  }, [menu]);

  return (
    <div className="my-auto">
      {orderList.map((e, i) => (
        <div
          className="ml-2 flex h-full items-center justify-center gap-2 font-bold text-black opacity-[0.65]"
          key={i}
        >
          <div className="w-40 text-left text-xl font-bold text-runticketGrayText">
            {e.title}
          </div>
          <CountText>×{e.count}</CountText>
        </div>
      ))}
    </div>
  );
};

const CountText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #f25f1d;
  z-index: 10;
`;
