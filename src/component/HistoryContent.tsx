import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { convertToTitleCountFormat } from "../api/helper";
import { MenuData, OrderListTypes } from "../types";

interface Props {
  menu: MenuData[];
}
export const HistoryContent = ({ menu }: Props) => {
  const [CountTitle, setCountTitle] = useState<OrderListTypes[]>([]);

  useEffect(() => {
    setCountTitle(
      convertToTitleCountFormat(
        menu.map((item) => item.title),
        menu.map((item) => item.price)
      )
    );
  }, [menu]);

  return (
    <div className="my-auto">
      {CountTitle.map((e, i) => (
        <div key={i} className="ml-2 text-xl font-bold text-runticketGrayText">
          {e.title} <CountText>×{e.count}</CountText>
          <Divider />
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
