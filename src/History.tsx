import { User } from "@firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MenuData } from "./Interface";
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
        let test: any = oneOrderData?.map(e => e.menu).flatMap(e => e).map(e => e.title);
        console.log(oneOrderData);
    }, [oneOrderData])
    return (
        <div >
            <h1>History</h1>
            {
                oneOrderData?.map((e, i) => {
                    return (
                        <div style={{ margin: "20vw 0" }} key={i}>
                            <p>{e.id}</p>
                            <p>{e.user.uid}</p>
                            <div>{e.menu.map((e: any, i: number) => {
                                return <p key={i}> {e.title}</p>
                            })}</div>
                            <p>{e.date.toString()}</p>
                        </div>
                    )
                }
                )
            }

        </div>
    )
}