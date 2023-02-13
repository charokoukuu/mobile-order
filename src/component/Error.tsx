import styled from "@emotion/styled";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Spacer } from "./SwipeTabs";

interface Props {
  appBarHeight: number;
  children: React.ReactNode;
}
export const Error = (props: Props) => {
  return (
    <div>
      <Spacer appBarHeight={props.appBarHeight} mode={"history"} />
      <IconWrapper>
        <ErrorOutlineIcon style={{ fontSize: "70px" }} />
      </IconWrapper>
      <WarningText>{props.children}</WarningText>
    </div>
  );
};

const WarningText = styled.div`
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
