import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";

interface FoodCardProps {
    menu: DocumentData;
    onClick: () => void;
}
export const FoodCard = (props: FoodCardProps) => {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }} onClick={() => {
                props.onClick();
            }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.menu.image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.menu.title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {props.menu.price}円
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}