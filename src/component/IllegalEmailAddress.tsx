import { Button } from "@mui/material";
import { deleteUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase";

interface IllegalEmailAddressProps {
    email: string;
    onClick: () => void;
}

export const IllegalEmailAddress = (props: IllegalEmailAddressProps) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    useEffect(() => {
        if (auth.currentUser) {
            deleteUser(auth.currentUser).then(() => {
                console.log("delete user");
                setIsDelete(true);
            }).catch((error) => {
                // An error ocurred
                // ...
            });
        }
    }, [])
    return (
        <div>
            <div style={{ textAlign: "center", margin: "5vw 0", fontSize: "7vw" }}>
                <h1>大学のアカウントじゃないと無理だよ</h1>
            </div>
            <div style={{ textAlign: "center", margin: "5vw 0" }}>
                {isDelete && <Button onClick={props.onClick}>
                    再ログイン
                </Button>
                }
            </div>
        </div>
    );
}