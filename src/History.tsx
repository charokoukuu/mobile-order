import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { SearchCollectionDataGet } from "./SubmitGet";
import { UserInfo } from "./UserInfo";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { OrderCompleted } from "./OrderCompleted";
// import dayjs from "dayjs";
// import 'dayjs/locale/ja';

export const History = () => {
    const [oneOrderData, setOneOrderData] = useState<DocumentData[]>();
    const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            let order = await SearchCollectionDataGet("order", "user.uid", UserInfo.user.uid);
            order?.sort((prev, curr) => {
                if (prev.date.seconds > curr.date.seconds) return -1;
                else if (prev.date.seconds < curr.date.seconds) return 1;
                else return 0;
            });
            setOneOrderData(order);
            setIsGetHistoryData(true);
        })()
    }, [])
    // console.log(oneOrderData);

    return (
        <div >
            <h1>History</h1>
            {
                isGetHistoryData ?
                    oneOrderData?.map((e, i) => {
                        return (
                            <div style={{ margin: "5vw 0" }} key={i}>
                                <Card sx={{ minWidth: 275 }} onClick={()=>{
                                   console.log(e.id);
                                //    <OrderCompleted />
                                }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <div style={{textAlign:"right"}}>{e.date.toDate().toDateString()}</div>
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                        <div>{e.menu.map((e: any, i: number) => {
                                            return <div key={i}> {e.title}</div>
                                        })}</div>
                                        <div style={{textAlign:"right"}}>￥{e.totalPrice}</div>
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <div style={{textAlign:"right"}}>ID:{e.id}</div>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    }) :
                    <LoadingAnimation />
            }
        </div>
    )
}

