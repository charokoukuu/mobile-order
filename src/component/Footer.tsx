import { useState } from "react";

const Footer = () => {
  const [count, setCount] = useState(0);
  const countTopButton = (counter: number) => {
    counter++;
    setCount(counter);
    if (count === 7) {
      console.log(count);
      window.location.href = "/admin";
    }
  };
  return (
    <footer>
      <p
        style={{
          textAlign: "center",
        }}
        onClick={() => {
          countTopButton(count);
        }}
      >
        © 2020-2021
        <br />
        <img
          style={{
            width: "20%",
          }}
          src="https://firebasestorage.googleapis.com/v0/b/mobile-order-4d383.appspot.com/o/runticket-reverse.png?alt=media&token=da8afd80-097b-442a-993e-6f067164117e"
          alt="RunTicket"
        />
      </p>
    </footer>
  );
};
export default Footer;
