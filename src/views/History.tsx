import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { SearchCollectionDataGet } from "../api/SubmitGet";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { auth } from "../api/Firebase";
import { Grid } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import { OrderCompleted } from "./OrderCompleted";
// import dayjs from "dayjs";
// import 'dayjs/locale/ja';

export const History = () => {
  const [oneOrderData, setOneOrderData] = useState<DocumentData[]>();
  const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      let order = await SearchCollectionDataGet(
        "order",
        "user.uid",
        auth.currentUser?.uid || "",
        10
      );

      setOneOrderData(order);
      setIsGetHistoryData(true);
    })();
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      {
        (isGetHistoryData && !oneOrderData?.length) ?
          <div style={{ textAlign: "center" }}>注文履歴はありません</div>
          : (isGetHistoryData && oneOrderData?.length) ?
            <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", width: "97%", margin: "0 auto", padding: "10px 0" }}>
              <h2 className="japanese_L" style={{ textAlign: "center", color: "#707070" }}>注文履歴</h2>

              {oneOrderData?.map((e, i) => {
                return (
                  <div key={i} style={{ margin: "5% 0" }}>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/order/${e.id}`}
                    >
                      <Card style={{ borderRadius: "8px", boxShadow: "0px 3px 6px rgba(0,0,0,0.2)" }} sx={{ width: "95%", margin: "0 auto", position: "relative" }} >
                        <CardContent>
                          <div color="text.secondary">
                            <div className="japanese_L" style={{ textAlign: "right", color: "#000000" }}>
                              {e.date.toDate().toLocaleString()}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div style={{ margin: "auto 0" }}>
                              {e.menu.map((e: DocumentData, i: number) => (
                                <div key={i} style={{ color: "#707070", marginLeft: "2vw", fontSize: "20px" }}>
                                  {e.title}
                                </div>
                              ))}
                            </div>
                            <div
                              className="japanese_B themeFontColor"
                              style={{ fontSize: "30px", margin: "auto 0" }}
                            >
                              ¥{e.totalPrice}
                            </div>
                          </div>
                          <Grid container color="text.secondary" >
                            {e.isStatus === "complete" && <>
                              <Grid item xs={0} style={{ margin: "auto 0", color: "#01AD4A", }}>
                                <TaskAltIcon style={{ fontSize: "20px", margin: "6px 3px 0 0" }} />
                              </Grid>
                              <Grid item xs={5} className="japanese_L" style={{ textAlign: "start", margin: "auto 0", color: "#01AD4A", fontSize: "15px" }}>
                                注文受け取り済み
                              </Grid>
                            </>}
                            {e.isStatus === "ordered" && <>
                              <Grid item xs={0} style={{ margin: "auto 0", color: "#DB8D00" }}>
                                <ErrorOutlineIcon style={{ fontSize: "20px", margin: "6px 3px 0 0" }} />
                              </Grid>
                              <Grid item xs={5} className="japanese_L" style={{ textAlign: "start", margin: "auto 0", color: "#DB8D00", fontSize: "15px" }}>
                                未受け取り
                              </Grid>
                            </>}
                            {e.isStatus === "not_payed" && <>
                              <Grid item xs={0} style={{ margin: "auto 0", color: "#D11F00", }}>
                                <ErrorOutlineIcon style={{ fontSize: "20px", margin: "6px 3px 0 0" }} />
                              </Grid>
                              <Grid item xs={5} className="japanese_L" style={{ textAlign: "start", margin: "auto 0", color: "#D11F00", fontSize: "15px" }}>
                                決済情報なし
                              </Grid>
                            </>}
                            <Grid item xs style={{ margin: "auto", textAlign: "end" }}>
                              <div
                                className="japanese_R"
                                style={{
                                  color: "#1FA7D0",
                                  fontSize: "13px"
                                }}
                              >
                                ID: {e.id}
                              </div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              }
              )}
            </div> :
            <LoadingAnimation type={"jelly"} />
      }
    </div>
  );
}

