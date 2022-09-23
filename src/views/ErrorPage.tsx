import { Button } from "@mui/material";

interface ErrorPageProps {
    onClick: () => void;
    text: string;
    buttonText: string;
}
export const ErrorPage = (props: ErrorPageProps) => {
    return (
        <div>
            <div style={{ margin: "3vw auto", height: "92.5vh" }}>
                <h1 style={{ textAlign: 'center', marginTop: "10px" }}>

                    {props.text}

                </h1>
                <div style={{ marginTop: "7vh", textAlign: "center" as "center" }}>
                    <Button onClick={props.onClick} >
                        {props.buttonText}
                    </Button>
                </div>
            </div>
        </div>
    )
}