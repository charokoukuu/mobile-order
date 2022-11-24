import { useState } from "react";
import { RedirectModal } from "../component/RedirectModal";
import { Spacer } from "../component/SwipeTabs";
interface Props {
  appBarHeight: number;
}

export const TestData = ({ appBarHeight }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <div>
      <Spacer appBarHeight={appBarHeight} mode={"history"} />
      <RedirectModal isModal={isModal} countTimer={5000} toURL="/register" />
      <button onClick={() => setIsModal(true)}>モーダルを開く</button>
    </div>
  );
};
