import { Spacer } from "../component/SwipeTabs";
import Iframe from "react-iframe";
export const Help = (props: { appBarHeight: number }) => {
  return (
    <div className="m-4 mx-auto h-[100vh] max-w-3xl text-center">
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <Iframe
        id="page1"
        url="https://runticket-law.web.app/help.html?a=5"
        position="absolute"
        className="mx-auto max-w-3xl rounded-lg bg-white p-[2%] [&_h2]:my-[0.83em] [&_h2]:text-[1.5em] [&_h2]:font-bold [&_li]:list-decimal [&_ul]:ml-4 [&_ul_ul>li]:list-[lower-latin] [&_ul_ul_ul>li]:ml-4 [&_ul_ul_ul>li]:list-[cjk-ideographic]"
        width="90%"
        height="100%"
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
