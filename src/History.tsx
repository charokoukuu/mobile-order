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
            setOneOrderData(await SearchCollectionDataGet("order", "user.uid", UserInfo.user.uid));
            setIsGetHistoryData(true);
        })()
    }, [])
    useEffect(() => {
        oneOrderData && console.log(oneOrderData[1].date);
    }, [oneOrderData])
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