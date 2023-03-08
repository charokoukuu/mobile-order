import { CSSProperties } from "react";

interface Props {
  style: CSSProperties | undefined;
  className?: string;
}

export const ScanCG = ({ style, className }: Props) => {
  return (
    <img
      style={style}
      className={className}
      src="/logo/rendering_scan_phone.png"
      alt="scanCG"
    />
  );
};
