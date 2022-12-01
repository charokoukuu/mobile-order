import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CountOrder } from "../api/SubmitGet";
import { MenuData } from "../types";

interface Props {
  menu: MenuData[];
}
export const HistoryContent = ({ menu }: Props) => {
  const [CountTitle, setCountTitle] = useState<string[]>([]);
  const [CountNumber, setCountNumber] = useState<number[]>([]);
  const GetCount = useRef(new CountOrder(setCountNumber, setCountTitle));

  useEffect(() => {
    menu.forEach((data) => {
      GetCount.current.titleCount(data.title);
    });
  }, [menu]);

  return (
    <div className="my-auto">
      {CountTitle.map((e: string, i: number) => (
        <div key={i} className="ml-2 text-xl text-runticketGrayText">
          {e} <CountText>×{CountNumber[i]}</CountText>
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
