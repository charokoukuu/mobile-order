import { CSSProperties } from "react";

interface Props {
  style: CSSProperties | undefined;
  className?: string;
}

export const Scan = ({ style, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 700"
      style={style}
      className={className}
    >
      <g>
        <path
          style={{
            fill: "#fff",
            stroke: "#000",
            strokeMiterlimit: "10",
            strokeWidth: "5px",
          }}
          d="m350.85,43.34c-.43-.53-.58-1.23-.41-1.89l6.67-25.69c1.24-3.33,7.43-3.01,9.76-3.08,12.33-.39,26.06,2.98,45.63,6.68,20.9,3.95,52.21,19.08,54.1,20,.06.03.12.06.18.1,2.02,1.26,5.08,2.61,4.92,4.96h0c-.27,1.08.27,2.2,1.28,2.66l25.17,11.47c.67.31,32.95,181.95,33.58,286.56.4,66.66-6.69,113.35-14.45,135.69-6.06,17.46-24.05,44.9-28.2,51.98-.59,1.01-.23,2,.71,2.7l7.1,4.41c3.85,2.9,7,8.79,6.73,13.6l-.27,4.83c-.25,4.49-3.04,8.43-7.19,10.16,0,0-274.5,121.69-274.57,121.72-22.65,7.65-48.8,10.42-73.4-2.01l-75.99-51.01c-6.04-4.94-5.72-7.15-6.05-10.13,0,0-.01-12.4.07-12.63,0,0,.44-4.3,3.56-7.87,2.92-3.34,19.09-11.18,19.09-11.18l253.44-111.82c12.96-4.25,23.02-5.86,34.51-2.06,10.74,3.56,15.8,7.54,15.8,7.54l-19.86,18.66s15.55-8.92,27.98-30.85c3.99-7.03,18.23-37.48,24.37-58.21,10.1-34.1,14.03-86.27,14.29-121.55.48-65.91-25.77-210.58-28.53-225.6-.14-.79-.68-1.44-1.43-1.73-5.77-2.23-30.73-11.92-38.91-15.29-10.68-4.4-19.7-11.13-19.7-11.13Z"
        />
        <path
          style={{
            fill: "none",
            stroke: "#000",
            strokeMiterlimit: "10",
            strokeWidth: "5px",
          }}
          d="m350.45,41.45s22.28-5.63,73.78,11.72,68.57,27.99,68.57,27.99c0,0,26.25,194.72,26.25,253.8,0,108.93-14.91,135.22-21.75,151.8-15.85,38.42-53.35,63.5-53.35,63.5l47.94-18.95"
        />
        <path
          style={{
            fill: "none",
            stroke: "#000",
            strokeMiterlimit: "10",
            strokeWidth: "5px",
          }}
          d="m502.16,545.67c-.76,5.46-.32,5.9-3.42,9.07-5.46,5.58-270.41,115.37-270.41,115.37-33,13.89-48.42,14.68-75.7,2.67l-67.38-45.77c-2.95-1.97-14.36-8.5-15.3-14.7-.99-6.51,6.29-10.25,6.29-10.25"
        />
      </g>
      <g>
        <g>
          <rect
            style={{ fill: "none" }}
            x="1.06"
            width="598.94"
            height="732.87"
          />
          <path
            style={{
              fill: "#fff",
              stroke: "#000",
              strokeMiterlimit: "10",
              strokeWidth: "5px",
            }}
            d="m38.38,549.67l-1.82,19.02c-.32,3.39,1.13,6.71,3.85,8.77l87.09,65.99c3.43,2.55,9.17,2.94,14.52,3.88l279.8-84.6c3.32-1.57,4.79-3.82,4.79-8.03l-.08-17.06"
          />
          <path
            style={{
              fill: "#fff",
              stroke: "#000",
              strokeMiterlimit: "10",
              strokeWidth: "5px",
            }}
            d="m314.25,480.45l-272.79,66.79c-3.49.86-4.38,5.41-1.47,7.52l87.45,65.79c7.27,5.27,10.06,5.06,21.1,4.2l275.5-81.86c2.58-1.17,3.6-6.12.21-8.59l-98.52-52.42c-3.52-1.87-7.6-2.38-11.48-1.44Z"
          />
        </g>
      </g>
      <g id="QR">
        <path d="m309.73,493.14l-33.22,8.94,39.09,22.07,33.64-9.03-39.5-21.99Zm4.79,24.93l-23.75-13.41,20.19-5.44,24,13.36-20.44,5.49Z" />
        <path d="m270.11,503.65l-33.22,8.94,39.09,22.07,33.64-9.03-39.5-21.99Zm4.79,24.93l-23.75-13.41,20.19-5.44,24,13.36-20.44,5.49Z" />
        <path d="m357.18,519.15l-33.22,8.94,39.09,22.07,33.64-9.03-39.5-21.99Zm4.79,24.93l-23.75-13.41,20.19-5.44,24,13.36-20.44,5.49Z" />
        <polygon points="274.26 524.87 259.84 516.73 272.09 513.43 286.66 521.54 274.26 524.87" />
        <polygon points="313.87 514.37 299.46 506.23 311.71 502.93 326.27 511.04 313.87 514.37" />
        <polygon points="361.32 540.38 346.91 532.24 359.16 528.94 373.73 537.05 361.32 540.38" />
        <polygon points="321.7 551.39 307.28 543.25 319.53 539.95 334.1 548.06 321.7 551.39" />
        <polygon points="310.94 531.94 305.35 528.94 311.9 527.22 317.64 530.19 310.94 531.94" />
        <polygon points="338.77 548.08 330.89 543.52 337.59 541.68 345.55 546.22 338.77 548.08" />
        <polygon points="314.26 550.52 298.68 541.73 292.15 543.52 307.69 552.3 314.26 550.52" />
        <polygon points="343.55 555.77 357.05 552.15 349.42 547.9 342.35 549.8 342.25 549.75 335.95 551.44 343.55 555.77" />
        <polygon points="329.19 553.25 322.35 555.09 322.32 555.08 315.75 556.85 323.42 561.17 336.72 557.61 329.19 553.25" />
        <polygon points="296.13 532.93 288.82 534.9 294.53 538.16 301.78 536.2 296.13 532.93" />
        <polygon points="317.55 530.16 307.49 532.87 315.14 537.23 318.78 536.24 328.33 541.56 334.87 539.8 317.55 530.16" />
      </g>
    </svg>
  );
};