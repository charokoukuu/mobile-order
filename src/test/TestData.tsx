import { RedirectModal } from "../component/RedirectModal";
import { Spacer } from "../component/SwipeTabs";
interface Props {
  appBarHeight: number;
}

export const TestData = ({ appBarHeight }: Props) => {
  return (
    <div>
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      <RedirectModal isModal={true} countTimer={3000} />
    </div>
  );
};
