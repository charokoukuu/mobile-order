import { Button } from "@mui/material";


interface IllegalEmailAddressProps {
    email: string;
    onClick: () => void;
}

export const IllegalEmailAddress = (props: IllegalEmailAddressProps) => {

    return (
        <div>
            <div style={{ textAlign: "center", margin: "5vw 0", fontSize: "7vw" }}>
                <h1>大学のアカウントじゃないと無理だよ</h1>
            </div>
            <div style={{ textAlign: "center", margin: "5vw 0" }}>
                <Button onClick={props.onClick}>
                    再ログイン
                </Button>

            </div>
        </div>
    );
}