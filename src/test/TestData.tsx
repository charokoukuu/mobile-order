import { useState } from "react";
import { RedirectModal } from "../component/RedirectModal";
import { Spacer } from "../component/SwipeTabs";
interface Props {
  appBarHeight: number;
}

export const TestData = ({ appBarHeight }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(true);
  return (
    <div>
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      <RedirectModal isModal={isModal} countTimer={10} toURL="/register" />
    </div>
  );
};
