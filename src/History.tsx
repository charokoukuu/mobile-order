import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { SearchCollectionDataGet } from "./SubmitGet";
import { UserInfo } from "./UserInfo";

export const History = () => {
    const [oneOrderData, setOneOrderData] = useState<DocumentData[]>();
    const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);
    const [sortOrderData, setSortOrderData] = useState<DocumentData[]>();


    useEffect(() => {
        (async () => {
            setOneOrderData(await SearchCollectionDataGet("order", "user.uid", UserInfo.user.uid));
            setIsGetHistoryData(true);
        })()
    }, [])
    useEffect(() => {
        let order = oneOrderData;
        order?.sort((prev, curr) => {
            if (prev.date.seconds > curr.date.seconds) {
                return -1;
            } else if (prev.date.seconds < curr.date.seconds) {
                return 1;
            } else {
                return 0;
            }

        });
        setSortOrderData(order);

    }, [oneOrderData])
    return (
        <div >
            <h1>History</h1>
            {
                isGetHistoryData ?
                    sortOrderData?.map((e, i) => {
                        return (
                            <div style={{ margin: "20vw 0" }} key={i}>
                                <div>{e.id}</div>
                                <div>{e.menu.map((e: any, i: number) => {
                                    return <div key={i}> {e.title}</div>
                                })}</div>
                                <div>{e.date.toDate().toString()}</div>
                            </div>
                        )
                    }) :
                    <LoadingAnimation />
            }

        </div>
    )
}