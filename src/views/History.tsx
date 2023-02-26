import { useEffect, useRef, useState } from "react";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { SearchCollectionDataGet } from "../api/helper";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { HistoryContent } from "../component/HistoryContent";
import { Spacer } from "../component/SwipeTabs";
import { OrderData } from "../types";
import { DocumentSnapshot } from "firebase/firestore";
import HistoryTabs from "../component/HistoryTabs";
interface Props {
  appBarHeight: number;
}
export const History = ({ appBarHeight }: Props) => {
  const [oneOrderData, setOneOrderData] = useState<OrderData[]>(
    [] as OrderData[]
  );
  const lastDoc = useRef<DocumentSnapshot | null>(null);
  const [isGetHistoryData, setIsGetHistoryData] = useState<boolean>(false);
  const [filterStatusListNumber, setFilterStatusListNumber] = useState(0);
  const [isTabChenged, setIsTabChenged] = useState(false);
  const filterStatusList = ["all", "complete", "ordered", "not_payed"];

  useEffect(() => {
    (async () => {
      setOneOrderData([]);
      setIsTabChenged(false);
      await SearchCollectionDataGet(
        setOneOrderData,
        lastDoc.current,
        filterStatusList[filterStatusListNumber]
      );
      setIsGetHistoryData(true);
      setIsTabChenged(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatusListNumber]);

  const handleScroll = async () => {
    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5 && oneOrderData.length) {
      await SearchCollectionDataGet(
        setOneOrderData,
        lastDoc.current,
        filterStatusList[filterStatusListNumber]
      );
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneOrderData]);
  return (
    <div className="mx-auto mt-[10px] max-w-3xl">
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      {isGetHistoryData ? (
        <div className="mx-auto w-[97%] rounded-lg bg-white py-[10px]">
          <h1 className="japanese_L my-5 text-center text-2xl font-bold text-runticketGrayText">
            注文履歴
          </h1>
          <HistoryTabs
            value={filterStatusListNumber}
            setValue={setFilterStatusListNumber}
          />
          {oneOrderData.length === 0 && isTabChenged && (
            <div className="h-[100vh] text-center m-auto text-[1.5rem] mt-10 japanese_L text-black opacity-[0.65]">
              該当するものがありません
            </div>
          )}
          {oneOrderData.length !== 0 &&
            oneOrderData
              .filter((item) =>
                filterStatusList[filterStatusListNumber] === "all"
                  ? true
                  : item.isStatus === filterStatusList[filterStatusListNumber]
              )
              .map((e, i) => (
                <div key={i} className="my-[3%]">
                  <Link to={`/order/${e.id}`}>
                    <div className="mx-auto w-[95%] rounded-lg px-3 py-2 shadow-[0px_3px_6px_rgba(0,0,0,0.2)]">
                      <div color="text.secondary">
                        <p className="text-end text-runticketGrayText">
                          {e.date.toDate().toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <HistoryContent menu={e.menu} />
                        <h3 className="my-auto mr-2 text-[30px] text-runticketBlue">
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
                              <p className="ml-1 text-[15px] text-indicatorGreen">
                                受取済み
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
                              <p className="ml-1 text-[15px] text-indicatorOrange">
                                未受取
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
                              <p className="ml-1 text-[15px] text-indicatorRed">
                                決済エラー
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
                    </div>
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
