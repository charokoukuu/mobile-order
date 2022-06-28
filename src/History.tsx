import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { SearchCollectionDataGet } from "./SubmitGet";
import { UserInfo } from "./UserInfo";

export const History = () => {
    const [oneOrderData, setOneOrderData] = useState<DocumentData[]>();
    const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            let order = await SearchCollectionDataGet("order", "user.uid", UserInfo.user.uid);
            order?.sort((prev, curr) => {
                if (prev.date.seconds > curr.date.seconds) return -1;
                else if (prev.date.seconds < curr.date.seconds) return 1;
                else return 0;
            });
            setOneOrderData(order);
            setIsGetHistoryData(true);
        })()
    }, [])

    return (
        <div >
            <h1>History</h1>
            {
                isGetHistoryData ?
                    oneOrderData?.map((e, i) => {
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