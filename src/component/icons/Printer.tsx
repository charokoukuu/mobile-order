import { CSSProperties } from "react";

interface Props {
  style: CSSProperties | undefined;
  className?: string;
}

export const Printer = ({ style, className }: Props) => {
  return (
    <img
      style={style}
      className={className}
      src="/help/printer.svg"
      alt="scanCG"
    />
  );
};
