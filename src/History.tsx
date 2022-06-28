import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { GetUserInfo } from "./SubmitGet";

export const History = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        GetUserInfo((e) => {
            setUser(e);
        })
    }, [])
    return (
        <div>
            <h1>History</h1>
            <h1>{user?.uid}</h1>
        </div>
    )
}