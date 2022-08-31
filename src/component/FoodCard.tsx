import { Card, CardActionArea, CardMedia } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface FoodCardProps {
    menu: DocumentData;
    onClick: () => void;
    deleteButton: boolean;
}
export const FoodCard = (props: FoodCardProps) => {
    return (
        <div >
            <Card
                onClick={() => {
                    props.menu.isSale &&
                        props.onClick();
                }}
                style={{
                    borderRadius: "13px",
                    width: "180px",
                    height: "180px",
                }}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.menu.image}
                        alt="menu image"
                        style={{ position: "relative", height: "180px", filter: props.menu.isSale ? "" : "brightness(35%)" }}
                    />
                    {props.deleteButton && (
                        <div style={{ display: "flex", position: "absolute", right: "5%", top: "5%", zIndex: "1", backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: "100%" }}>
                            <HighlightOffIcon style={{ color: "black", fontSize: "clamp(1.5rem, 4.2vw, 2rem)" }} />
                        </div>
                    )}
                    {props.menu.isSale === false &&
                        <div
                            className="japanese_B"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                fontSize: "clamp(0.5rem, 4.2vw, 2rem)",
                                transform: "translate(-50%, -50%) rotate(-20deg)",
                                color: "#FC3f46",
                                textAlign: "center",
                                width: "80%",
                                borderStyle: "solid",
                                borderWidth: "3px",
                                zIndex: 1
                            }}>
                            SOLD OUT
                        </div>
                    }
                    <div style={{ position: "absolute", right: "0", bottom: "0", width: "100%", height: "33%", background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(255,255,255,0.01))" }}></div>
                    <div className="japanese_R" style={{ position: "absolute", left: "12px", bottom: "15px", color: "#ffffff", fontSize: "18px" }}>
                        {props.menu.title}
                    </div>
                    <div className="japanese_B" style={{ position: "absolute", right: "12px", bottom: "15px", color: "#FA9534", fontSize: "18px" }}>
                        ¥{props.menu.price}
                    </div>
                </CardActionArea>
            </Card>
        </div>
    );
}