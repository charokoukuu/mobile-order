import { Button } from "@mui/material";
import { Spacer } from "../component/SwipeTabs";

interface ErrorPageProps {
  onClick: () => void;
  text: string;
  buttonText: string;
  appBarHeight: number;
}
export const ErrorPage = (props: ErrorPageProps) => {
  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <div className="my-4">
        <h1 className="mt-3 text-center">{props.text}</h1>
        <div className="mt-3 text-center">
          <Button onClick={props.onClick}>{props.buttonText}</Button>
        </div>
      </div>
    </div>
  );
};
