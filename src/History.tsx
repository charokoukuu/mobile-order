import { User } from "@firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GetUserInfo, SearchCollectionDataGet } from "./SubmitGet";

export const History = () => {
    const [user, setUser] = useState<User>();
    const [oneOrderData, setOneOrderData] = useState<DocumentData[]>();

    useEffect(() => {
        GetUserInfo((e) => {
            setUser(e);
        });

    }, [])
    useEffect(() => {
        (async () => {
            user && setOneOrderData(await SearchCollectionDataGet("order", "user.uid", user.uid));
        })()
    }, [user])
    useEffect(() => {
        oneOrderData && console.log(oneOrderData[1].date);
    }, [oneOrderData])
    return (
        <div >
            <h1>History</h1>
            {
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
                }
                )
            }

        </div>
    )
}