import { useState } from "react";

const Footer = () => {
  const [count, setCount] = useState(0);
  const countTopButton = (counter: number) => {
    counter++;
    setCount(counter);
    if (count === 7) {
      window.location.href = "/admin";
    }
  };
  return (
    <footer className="relative">
      <div className="absolute bottom-0 w-full">
        <p className="flex justify-center">
          © 2023-2024
          <span
            className="mx-1"
            onClick={() => {
              countTopButton(count);
            }}
          >
            RunTicket
          </span>
          Teams.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
