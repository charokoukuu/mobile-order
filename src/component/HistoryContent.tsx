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
        })

    }, [menu]);

    return (
        <div style={{ margin: "auto 0" }}>
            {CountTitle.map((e: string, i: number) => (
                <div key={i} style={{ color: "#707070", marginLeft: "2vw", fontSize: "20px" }}>
                    {e} <CountText>×{CountNumber[i]}</CountText>
                    <Divider />
                </div>
            ))}
        </div>
    )
}

const CountText = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #F25F1D;
    z-index: 10 
`