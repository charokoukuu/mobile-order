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
}
export const ErrorPage = (props: ErrorPageProps) => {
  const params = useParams();
  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <IconWrapper>
        <ErrorOutlineIcon style={{ fontSize: "70px" }} />
      </IconWrapper>
      <Warning>
        <p>{props.text}</p>
        {params.errorText &&
          params.errorText
            .split("\n")
            .map((line, index) => <p key={index}>{line}</p>)}
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
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfRRIK0WBAoMt_WN3RAKbP598LZOQAhsOrIQu8O7eAZE81x1Q/viewform?usp=pp_url&entry.951689160=${params.errorText}`}
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
