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
    <footer>
      <div className="w-full">
        <p className="flex flex-col items-center justify-center">
          © 2020-2021
          <br />
          <img
            className="w-24 md:w-32"
            src="https://firebasestorage.googleapis.com/v0/b/mobile-order-4d383.appspot.com/o/runticket-reverse.png?alt=media&token=da8afd80-097b-442a-993e-6f067164117e"
            alt="RunTicket"
            onClick={() => {
              countTopButton(count);
            }}
          />
        </p>
      </div>
    </footer>
  );
};
export default Footer;
