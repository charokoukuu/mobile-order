import { Jelly, Orbit } from "@uiball/loaders";

interface LoadingAnimationProps {
  type: "jelly" | "orbit";
}
export const LoadingAnimation = (props: LoadingAnimationProps) => {
  return (
    <>
      {props.type === "jelly" && (
        <div className="relative h-[80vh] w-full">
          <div className="absolute top-[35%] right-1/2 translate-x-1/2 -translate-y-1/2">
            <Jelly size={100} speed={0.8} color="#006C9B" />
          </div>
        </div>
      )}
      {props.type === "orbit" && (
        <div className="relative h-[12vw] w-full">
          <div className="absolute top-[35%] right-1/2 translate-x-1/2 -translate-y-1/2">
            <Orbit size={60} speed={1.2} color="#006C9B" />
          </div>
        </div>
      )}
    </>
  );
};
