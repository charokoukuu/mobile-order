import { Card, CardActionArea, CardMedia } from "@mui/material";
import { DocumentData } from "firebase/firestore";

interface FoodCardProps {
    menu: DocumentData;
    onClick: () => void;
}
export const FoodCard = (props: FoodCardProps) => {
    return (
        <div>
            <Card onClick={() => {
                props.onClick();
            }} style={{ borderRadius: "13px", width: "45vw", height: "45vw" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.menu.image}
                        alt="green iguana"
                        style={{ position: "relative", height: "45vw" }}
                    />
                    <div style={{ position: "absolute", right: "0", bottom: "0", width: "90vw", height: "7vh", backgroundColor: "rgba(0,0,0,0.7)", }}></div>
                    <div className="japanese_R" style={{ position: "absolute", left: "4vw", top: "32vw", color: "#ffffff", fontSize: "4.2vw" }}>
                        {props.menu.title}
                    </div>
                    <div className="japanese_B" style={{ position: "absolute", right: "4vw", top: "36vw", color: "#ffffff", fontSize: "5vw" }}>
                        ¥{props.menu.price}
                    </div>
                </CardActionArea>
            </Card>
        </div>
    );
}