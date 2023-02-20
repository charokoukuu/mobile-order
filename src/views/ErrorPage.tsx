import Button from "@mui/material/Button";
import { Spacer } from "../component/SwipeTabs";
import styled from "@emotion/styled";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorPageProps {
  appBarHeight: number;
  onClick: () => void;
  text: string;
  buttonText: string;
}
export const ErrorPage = (props: ErrorPageProps) => {
  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <IconWrapper>
        <ErrorOutlineIcon style={{ fontSize: "70px" }} />
      </IconWrapper>
      <Warning>
        <p>{props.text}</p>
        <Button variant="outlined" color="primary" onClick={props.onClick}>
          {props.buttonText}
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
