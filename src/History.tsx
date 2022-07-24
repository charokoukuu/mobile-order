import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { SearchCollectionDataGet } from "./SubmitGet";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { auth } from "./Firebase";
import { Grid } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
    <div style={{ marginTop: "5%" }}>
      {
        (isGetHistoryData && !oneOrderData?.length) ?
          <div style={{ textAlign: "center" }}>注文履歴はありません</div>
          : (isGetHistoryData && oneOrderData?.length) ?
            <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", width: "90%", margin: "0 auto" }}>
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
                      <Card style={{ borderRadius: "8px", boxShadow: "0px 3px 6px rgba(0,0,0,0.2)" }} sx={{ width: "90%", margin: "0 auto", position: "relative" }} >
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
                                <div key={i} style={{ color: "#707070", marginLeft: "2vw" }}>
                                  {" "}
                                  {e.title}
                                </div>
                              ))}
                            </div>
                            <div
                              className="japanese_B themeFontColor"
                              style={{ fontSize: 30, margin: "auto 0" }}
                            >
                              ¥{e.totalPrice}
                            </div>
                          </div>
                          <Grid container color="text.secondary" >
                            {e.isStatus === "注文完了" && <>
                              <Grid item xs={0} style={{margin:"auto 0",color: "#01AD4A",}}>
                              <ErrorOutlineIcon style={{fontSize: "clamp(0.5rem, 3vw, 1.5rem)"}} />
                              </Grid>
                              <Grid item xs={3} className="japanese_L" style={{textAlign:"start",margin:"auto 0", color: "#01AD4A",fontSize: "clamp(0.5rem, 2vw, 1.5rem)"}}>
                                注文受け取り済み
                              </Grid>
                            </>}
                            {e.isStatus === "決済完了" && <>
                              <Grid item xs={0} style={{margin:"auto 0",color: "#DB8D00"}}>
                              <ErrorOutlineIcon style={{fontSize: "clamp(0.5rem, 3vw, 1.5rem)"}} />
                              </Grid>
                              <Grid item xs={3} className="japanese_L" style={{textAlign:"start",margin:"auto 0", color: "#DB8D00",fontSize: "clamp(0.5rem, 2vw, 1.5rem)"}}>
                                未受け取り
                              </Grid>
                            </>}
                            {e.isStatus === "注文済み" && <>
                              <Grid item xs={0} style={{margin:"auto 0",color: "#D11F00",}}>
                              <ErrorOutlineIcon style={{fontSize: "clamp(0.5rem, 3vw, 1.5rem)"}} />
                              </Grid>
                              <Grid item xs={5} className="japanese_L" style={{textAlign:"start",margin:"auto 0", color: "#D11F00",fontSize: "clamp(0.5rem, 2vw, 1.5rem)"}}>
                              決済情報がありません
                              </Grid>
                            </>}
                            <Grid item xs style={{margin:"auto",textAlign:"end"}}>
                            <div
                              className="japanese_R"
                              style={{
                                // position: "absolute",
                                right: "5%",
                                bottom: "8%",
                                color: "#1FA7D0",
                                fontSize: "clamp(0.5rem, 3vw, 1.5rem)"
                              }}
                            >
                              ID:{e.id}
                            </div>
                            </Grid>
                            <div style={{
                              height: "1.5vw",
                            }}>
                            </div>
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

