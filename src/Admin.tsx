import { TodayOrderGet } from "./SubmitGet";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

const Admin = () => {
    const [toDayOrder, setToDayOrder] = useState<DocumentData[]>([]);
    const [isGetToDayOrder, setIsGetToDayOrder] = useState<boolean>(false);
    useEffect(() => {
        const today = new Date(Date.now());
        // const today:Date = `${year}/${month}/${day}`;
        console.log(today);
        (async () => {
          let order = await TodayOrderGet(
            "order",
            10,
            today,
          );
          setToDayOrder(order);
          setIsGetToDayOrder(true);
          console.log(order);
        })();
    }, []);

    return (
        <div>
            <h1>Admin</h1>
            {toDayOrder.map((e, i) => {
                return (
                    <div key={i}>
                        <div>{e.date.toDate().toLocaleString()}</div>
                        <div>{e.id}</div>
                    </div>
                );
            }
            )}
        </div>
    );
}

export default Admin;