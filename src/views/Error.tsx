import Button from "@mui/material/Button";
import { Spacer } from "../component/SwipeTabs";
import styled from "@emotion/styled";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useParams } from "react-router-dom";
interface ErrorPageProps {
  appBarHeight: number;
  onClick: () => void;
  text: string;
  buttonText: string;
  isMaintenance?: boolean;
}
export const ErrorPage = (props: ErrorPageProps) => {
  const { errorText } = useParams();
  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <IconWrapper>
        <ErrorOutlineIcon style={{ fontSize: "70px" }} />
      </IconWrapper>
      <Warning>
        <div className="whitespace-pre-line">
          <p className="my-4 text-xl">{props.text}</p>
          {errorText && (
            <div className="my-8 mx-auto flex w-5/6 flex-col gap-1 divide-y divide-zinc-600 break-words bg-black/80 p-2 text-left text-sm text-red-500">
              {errorText?.split("+").map((text, index) => (
                <p className="text-base" key={index}>
                  {text}
                </p>
              ))}
            </div>
          )}
          {props.isMaintenance && (
            <p className="my-4 text-base">
              ご迷惑をおかけしております。
              <br />
              {/* TODO:メンテナンス期間を表示する */}
              メンテナンスが終了次第、サービスを再開いたします。
            </p>
          )}
        </div>
        <Button
          variant="text"
          LinkComponent={Link}
          color="primary"
          onClick={props.onClick}
        >
          {props.buttonText}
        </Button>
        <span>/</span>
        <Button
          variant="text"
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform?usp=pp_url&entry.951689160=${
            errorText || ""
          }`}
        >
          問い合わせる
        </Button>
      </Warning>
    </div>
  );
};

const Warning = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #e68e28;
  text-align: center;
  margin-top: 20px;
  width: 80%;
  margin: 0 auto;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
  color: #e68e28;
`;
