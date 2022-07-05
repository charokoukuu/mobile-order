import { Card, CardActionArea, CardMedia } from "@mui/material";
import { DocumentData } from "firebase/firestore";

interface FoodCardProps {
    menu: DocumentData;
    onClick: () => void;
}
export const FoodCard = (props: FoodCardProps) => {
    return (
        <div >
            <Card 
                onClick={() => {
                    //  売り切れならクリックできない
                    {props.menu.isStatus &&
                        props.onClick();
                    }
                }} 
            style={{ borderRadius: "13px", width: "45vw", height: "45vw" }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.menu.image}
                        alt="grenen iguana"
                        style={{ position: "relative", height: "45vw", filter: props.menu.isStatus ? "": "brightness(35%)" }}
                    />
                    {props.menu.isStatus === false &&
                    <div 
                    style={{
                        position:"absolute",
                        top:"50%",
                        left:"50%",
                        fontSize: "5vw",
                        transform: "translate(-50%, -50%) rotate(-23deg)",
                        color:"#ff2424",
                        textAlign:"center",
                        width:"60%",
                        backgroundColor:"rgba(255,255,255,0.7)",
                    }}>
                        SOLD OUT
                    </div>
                    }
                    <div style={{ position: "absolute", right: "0", bottom: "0", width: "90vw", height: "30%", backgroundColor: "rgba(0,0,0,0.7)", }}></div>
                    <div className="japanese_R" style={{ position: "absolute", left: "4vw", top: "33vw", color: "#ffffff", fontSize: "4.2vw" }}>
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