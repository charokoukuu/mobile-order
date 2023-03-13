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
        d="m502.95,244.18l-40.93-35.41c-4.16-3.6-11.61-8.51-16.56-10.91,0,0-4.37-2.12-11.05-.04-1.33.41-2.71.49-4.06.22-5.54-1.11-7.42-.26-7.42-.26-5.02,2.25-12.83,6.65-17.36,9.76l-43.48,29.9c-4.53,3.12-8.3,10.17-8.36,15.67l-1.03,22.11c.35,5.49,1.45,14.4,2.46,19.81,0,0,6.19,33.21,20.23,36.93l9.23,2.44c.18-5.45-.14-14.38-.71-19.86l-2-19.2c-.82-4.02.66-8.2,3.71-10.45l42.3-31.27c3.08-2.28,7.09-2.11,10.01.42l36.87,31.9c9.78,8.46,23.76,6.34,31.23-4.74l1.1-1.63c7.47-11.08,5.6-26.92-4.18-35.38Z"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        d="m502.95,244.18l-40.93-35.41c-4.16-3.6-11.61-8.51-16.56-10.91,0,0-4.37-2.12-11.05-.04-1.33.41-2.71.49-4.06.22-5.54-1.11-7.42-.26-7.42-.26-5.02,2.25-12.83,6.65-17.36,9.76l-43.48,29.9c-4.53,3.12-8.3,10.17-8.36,15.67l-1.03,22.11c.35,5.49,1.45,14.4,2.46,19.81,0,0,6.19,33.21,20.23,36.93l9.23,2.44c.18-5.45-.14-14.38-.71-19.86l-2-19.2c-.82-4.02.66-8.2,3.71-10.45l42.3-31.27c3.08-2.28,7.09-2.11,10.01.42l36.87,31.9c9.78,8.46,23.76,6.34,31.23-4.74l1.1-1.63c7.47-11.08,5.6-26.92-4.18-35.38Z"
      />
      <path
        style={{
          fill: "#FFF",
        }}
        d="m500.96,206.34l-39.64-35.3c-4.11-3.66-11.49-8.66-16.41-11.12,0,0-4.04-2.02-10.53.06-1.29.41-2.63.49-3.95.22-5.39-1.11-7-.36-7-.36-4.99,2.31-12.75,6.8-17.24,9.97l-41.92,29.67c-4.49,3.18-8.81,10.23-9.61,15.67l-3.4,22.01c-.69,5.46-.61,14.37.18,19.82,0,0,5.96,41.1,19.59,44.82,8.97,2.44,11.91-5.74,11.91-5.74,1.86-5.18,2.93-13.89,2.38-19.36l-1.94-19.19c-.8-4.02.64-8.2,3.6-10.45l41.09-31.27c2.99-2.28,6.89-2.11,9.72.42l35.82,31.9c9.5,8.46,23.09,6.34,30.34-4.74l1.07-1.63c7.26-11.08,5.44-26.92-4.06-35.38Z"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        d="m500.96,206.34l-39.64-35.3c-4.11-3.66-11.49-8.66-16.41-11.12,0,0-4.04-2.02-10.53.06-1.29.41-2.63.49-3.95.22-5.39-1.11-7-.36-7-.36-4.99,2.31-12.75,6.8-17.24,9.97l-41.92,29.67c-4.49,3.18-8.81,10.23-9.61,15.67l-3.4,22.01c-.69,5.46-.61,14.37.18,19.82,0,0,5.96,41.1,19.59,44.82,8.97,2.44,11.91-5.74,11.91-5.74,1.86-5.18,2.93-13.89,2.38-19.36l-1.94-19.19c-.8-4.02.64-8.2,3.6-10.45l41.09-31.27c2.99-2.28,6.89-2.11,9.72.42l35.82,31.9c9.5,8.46,23.09,6.34,30.34-4.74l1.07-1.63c7.26-11.08,5.44-26.92-4.06-35.38Z"
      />
      <path
        style={{
          fill: "#FFF",
        }}
        d="m579.98,511.25s-3.63-11.76-13.71-42.18l-35.42-61.77c-19.14-42.95-19.14-85.3-19.14-141.22,0-28.2,4.79-63.51.11-71.45-5.27-8.96-23.68-28.25-32.1-40.83-9.14-13.64-24.49-28.93-24.49-28.93-3.9-3.88-11.29-8.66-16.43-10.61,0,0-12.09-4.6-22.46-5.46l.2,13.44c.08,5.5.06,14.5-.06,20l-.15,7.14c0,.47,6.21,7.79,11.55,15.69l4.71,9.19c2.51,4.89,2.67,12.98.36,17.98l-4.43,18.08c-2.35,4.97-1.6,12.67,1.65,17.1,0,0,8.14,11.07,11.52,15.03,3.99,4.67-13.96-12.6-15-24.86-3.23-37.97-7.19-52.47-7.19-52.47-1.45-5.31-3.82-13.99-5.26-19.3,0,0-10.59-38.92-29.3-42.28l-1.65.14c-14.03,4.9-14.03,35.16-13.73,51.43.25,13.46,7.52,44.87,4.5,89.63-3.2,47.39,1.83,79.48,8.64,103.6,8.19,28.98,26.27,59.69,26.27,59.69,2.79,4.74,6.57,12.86,8.39,18.05,0,0,25,71.09,29.29,84.9"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeMiterlimit: 10,
          strokeWidth: "6px",
        }}
        d="m579.98,511.25s-3.63-11.76-13.71-42.18l-35.42-61.77c-19.14-42.95-19.14-85.3-19.14-141.22,0-28.2,4.79-63.51.11-71.45-5.27-8.96-23.68-28.25-32.1-40.83-9.14-13.64-24.49-28.93-24.49-28.93-3.9-3.88-11.29-8.66-16.43-10.61,0,0-12.09-4.6-22.46-5.46l.2,13.44c.08,5.5.06,14.5-.06,20l-.15,7.14c0,.47,6.21,7.79,11.55,15.69l4.71,9.19c2.51,4.89,2.67,12.98.36,17.98l-4.43,18.08c-2.35,4.97-1.6,12.67,1.65,17.1,0,0,8.14,11.07,11.52,15.03,3.99,4.67-13.96-12.6-15-24.86-3.23-37.97-7.19-52.47-7.19-52.47-1.45-5.31-3.82-13.99-5.26-19.3,0,0-10.59-38.92-29.3-42.28l-1.65.14c-14.03,4.9-14.03,35.16-13.73,51.43.25,13.46,7.52,44.87,4.5,89.63-3.2,47.39,1.83,79.48,8.64,103.6,8.19,28.98,26.27,59.69,26.27,59.69,2.79,4.74,6.57,12.86,8.39,18.05,0,0,25,71.09,29.29,84.9"
      />
    </svg>
  );
};
