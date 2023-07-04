import { Spacer } from "../component/SwipeTabs";
import Iframe from "react-iframe";
import { useEffect, useState } from "react";
import { RandomID } from "../api/helper";
export const Help = (props: { appBarHeight: number }) => {
  const [randomQuery, setRandomQuery] = useState<string>("");
  useEffect(() => {
    setRandomQuery(RandomID());
  }, []);
  return (
    <div className="mt-4 max-w-3xl text-center">
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <Iframe
        id="page1"
        // キャッシュを無効にするためにランダムなクエリを付与する
        url={"https://runticket-law.web.app/help.html?query=" + randomQuery}
        position="absolute"
        className="mx-auto max-w-3xl rounded-lg bg-white p-[3%]"
        width="90%"
        height="90%"
        styles={{
          left: "50%",
          transform: "translateX(-50%)",
          border: "none",
          overflow: "hidden",
          zIndex: 1,
        }}
      />
    </div>
  );
};
