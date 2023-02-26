import { useEffect, useState } from "react";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { SearchCollectionDataGet } from "../api/SubmitGet";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { auth } from "../api/Firebase";
import { Grid } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { HistoryContent } from "../component/HistoryContent";
import { Spacer } from "../component/SwipeTabs";
import { OrderData } from "../types";
interface Props {
  appBarHeight: number;
}
export const History = ({ appBarHeight }: Props) => {
  const [oneOrderData, setOneOrderData] = useState<OrderData[]>();
  const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const order = await SearchCollectionDataGet(
        "order",
        "user.uid",
        auth.currentUser?.uid || "",
        10
      );

      setOneOrderData(order as OrderData[]);
      setIsGetHistoryData(true);
    })();
  }, []);

  return (
    <div className="mx-auto mt-[10px] max-w-3xl">
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      {isGetHistoryData && !oneOrderData?.length ? (
        <div className="text-center">注文履歴はありません</div>
      ) : isGetHistoryData && oneOrderData?.length ? (
        <div className="mx-auto w-[97%] rounded-lg bg-white py-[10px]">
          <h1 className="japanese_L my-5 text-center text-2xl font-bold text-runticketGrayText">
            注文履歴
          </h1>

          {oneOrderData?.map((e, i) => (
            <div key={i} className="my-[5%]">
              <Link to={`/order/${e.id}`}>
                <Card className="mx-auto w-[95%] rounded-lg shadow-[0px_3px_6px_rgba(0,0,0,0.2)]">
                  <CardContent>
                    <div color="text.secondary">
                      <p className="text-end text-runticketGrayText">
                        {e.date.toDate().toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <HistoryContent menu={e.menu} />
                      <h3 className="my-auto text-[30px] text-runticketBlue">
                        ¥{e.totalPrice}
                      </h3>
                    </div>
                    <Grid container color="text.secondary">
                      {e.isStatus === "complete" && (
                        <>
                          <Grid
                            item
                            xs={0}
                            className="flex items-center text-indicatorGreen"
                          >
                            <TaskAltIcon className="text-xl" />
                          </Grid>
                          <Grid item xs={5}>
                            <p className="text-[15px] text-indicatorGreen">
                              注文受け取り済み
                            </p>
                          </Grid>
                        </>
                      )}
                      {(e.isStatus === "ordered" ||
                        e.isStatus === "cooked") && (
                        <>
                          <Grid
                            item
                            xs={0}
                            className="flex items-center text-indicatorOrange"
                          >
                            <ErrorOutlineIcon className="text-xl" />
                          </Grid>
                          <Grid item xs={5} className="text-start">
                            <p className="text-[15px] text-indicatorOrange">
                              未受け取り
                            </p>
                          </Grid>
                        </>
                      )}
                      {e.isStatus === "not_payed" && (
                        <>
                          <Grid
                            item
                            xs={0}
                            className="flex items-center text-indicatorRed"
                          >
                            <ErrorOutlineIcon className="text-xl" />
                          </Grid>
                          <Grid item xs={5} className="text-start">
                            <p className="text-[15px] text-indicatorRed">
                              決済情報なし
                            </p>
                          </Grid>
                        </>
                      )}
                      <Grid item xs className="my-auto text-end">
                        <div className="japanese_R text-sm text-blue-400">
                          ID: {e.id}
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <LoadingAnimation type="jelly" />
      )}
    </div>
  );
};
