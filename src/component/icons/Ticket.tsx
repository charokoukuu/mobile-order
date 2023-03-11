import { CSSProperties } from "react";

interface Props {
  style: CSSProperties | undefined;
  className?: string;
}

export const Ticket = ({ style, className }: Props) => {
  return (
    <svg
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
    >
      <defs></defs>
      <polyline
        style={{
          fill: "#FFF",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        points="416.29 105.49 416.29 49.81 183.71 49.81 183.71 173.4 416.29 173.4 416.29 163.98"
      />
      <path
        style={{
          fill: "#FFF",
        }}
        d="m510.84,240.41l-46.98-35.88c-4.37-3.34-12.08-7.84-17.14-10.01,0,0-5.95-2.55-13.52-.47-1.5.41-3.07.49-4.6.22-6.28-1.11-9.44.15-9.44.15-5.11,2.03-13.14,6.02-17.84,8.88l-50.81,30.85c-4.7,2.85-8.61,9.69-8.69,15.19l-1.16,22.12c.39,5.49,1.64,14.38,2.78,19.76,0,0,7.03,33.26,22.92,36.97l10.46,2.44c.21-5.45-.15-14.38-.8-19.84l-2.26-19.21c-.93-4.02.74-8.2,4.2-10.45l47.91-31.27c3.49-2.28,8.03-2.11,11.34.42l41.76,31.9c11.08,8.46,26.92,6.34,35.38-4.74l1.25-1.63c8.46-11.08,6.34-26.92-4.74-35.38Z"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        d="m510.84,240.41l-46.98-35.88c-4.37-3.34-12.08-7.84-17.14-10.01,0,0-5.95-2.55-13.52-.47-1.5.41-3.07.49-4.6.22-6.28-1.11-9.44.15-9.44.15-5.11,2.03-13.14,6.02-17.84,8.88l-50.81,30.85c-4.7,2.85-8.61,9.69-8.69,15.19l-1.16,22.12c.39,5.49,1.64,14.38,2.78,19.76,0,0,7.03,33.26,22.92,36.97l10.46,2.44c.21-5.45-.15-14.38-.8-19.84l-2.26-19.21c-.93-4.02.74-8.2,4.2-10.45l47.91-31.27c3.49-2.28,8.03-2.11,11.34.42l41.76,31.9c11.08,8.46,26.92,6.34,35.38-4.74l1.25-1.63c8.46-11.08,6.34-26.92-4.74-35.38Z"
      />
      <path
        style={{
          fill: "#FFF",
        }}
        d="m508.27,202.57l-46.98-35.88c-4.37-3.34-12.08-7.84-17.14-10.01,0,0-5.95-2.55-13.52-.47-1.5.41-3.07.49-4.6.22-6.28-1.11-9.44.15-9.44.15-5.11,2.03-13.14,6.02-17.84,8.88l-50.81,30.85c-4.7,2.85-9.3,9.63-10.22,15.05l-3.97,22.07c-.8,5.44-.71,14.33.2,19.75,0,0,6.95,41.14,22.85,44.85,10.46,2.44,13.97-5.93,13.97-5.93,2.13-5.07,3.34-13.69,2.69-19.15l-2.26-19.21c-.93-4.02.74-8.2,4.2-10.45l47.91-31.27c3.49-2.28,8.03-2.11,11.34.42l41.76,31.9c11.08,8.46,26.92,6.34,35.38-4.74l1.25-1.63c8.46-11.08,6.34-26.92-4.74-35.38Z"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        d="m508.27,202.57l-46.98-35.88c-4.37-3.34-12.08-7.84-17.14-10.01,0,0-5.95-2.55-13.52-.47-1.5.41-3.07.49-4.6.22-6.28-1.11-9.44.15-9.44.15-5.11,2.03-13.14,6.02-17.84,8.88l-50.81,30.85c-4.7,2.85-9.3,9.63-10.22,15.05l-3.97,22.07c-.8,5.44-.71,14.33.2,19.75,0,0,6.95,41.14,22.85,44.85,10.46,2.44,13.97-5.93,13.97-5.93,2.13-5.07,3.34-13.69,2.69-19.15l-2.26-19.21c-.93-4.02.74-8.2,4.2-10.45l47.91-31.27c3.49-2.28,8.03-2.11,11.34.42l41.76,31.9c11.08,8.46,26.92,6.34,35.38-4.74l1.25-1.63c8.46-11.08,6.34-26.92-4.74-35.38Z"
      />
      <path
        style={{
          fill: "#FFF",
        }}
        d="m595.33,507.47s-3.97-11.76-15-42.18l-38.76-61.77c-20.94-42.95-20.94-85.3-20.94-141.22,0-28.2,5.24-63.51.13-71.45-5.77-8.96-25.91-28.25-35.12-40.83-10-13.64-27.15-29.25-27.15-29.25-4.07-3.7-11.65-8.21-16.84-10.02,0,0-14-4.87-25.35-5.73l.22,13.44c.09,5.5.06,14.5-.06,20l-.16,7.14c0,.47,6.79,7.79,12.63,15.69l5.25,9.37c2.69,4.8,2.86,12.74.38,17.65l-5.01,18.39c-2.52,4.89-1.77,12.39,1.68,16.68,0,0,9.12,11.34,12.81,15.29,4.36,4.67-15.27-12.6-16.41-24.86-3.53-37.97-7.89-52.54-7.89-52.54-1.57-5.27-4.15-13.89-5.72-19.17,0,0-11.61-38.98-32.08-42.35l-1.81.14c-15.35,4.9-15.35,35.16-15.02,51.43.27,13.46,8.23,44.87,4.92,89.63-3.5,47.39,2,79.48,9.46,103.6,8.96,28.98,28.87,59.9,28.87,59.9,2.98,4.62,7.03,12.61,9,17.74,0,0,27.39,71.19,32.09,85"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        d="m595.33,507.47s-3.97-11.76-15-42.18l-38.76-61.77c-20.94-42.95-20.94-85.3-20.94-141.22,0-28.2,5.24-63.51.13-71.45-5.77-8.96-25.91-28.25-35.12-40.83-10-13.64-27.15-29.25-27.15-29.25-4.07-3.7-11.65-8.21-16.84-10.02,0,0-14-4.87-25.35-5.73l.22,13.44c.09,5.5.06,14.5-.06,20l-.16,7.14c0,.47,6.79,7.79,12.63,15.69l5.25,9.37c2.69,4.8,2.86,12.74.38,17.65l-5.01,18.39c-2.52,4.89-1.77,12.39,1.68,16.68,0,0,9.12,11.34,12.81,15.29,4.36,4.67-15.27-12.6-16.41-24.86-3.53-37.97-7.89-52.54-7.89-52.54-1.57-5.27-4.15-13.89-5.72-19.17,0,0-11.61-38.98-32.08-42.35l-1.81.14c-15.35,4.9-15.35,35.16-15.02,51.43.27,13.46,8.23,44.87,4.92,89.63-3.5,47.39,2,79.48,9.46,103.6,8.96,28.98,28.87,59.9,28.87,59.9,2.98,4.62,7.03,12.61,9,17.74,0,0,27.39,71.19,32.09,85"
      />
    </svg>
  );
};