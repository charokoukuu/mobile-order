import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import { paymentType } from "./Order";

interface Props {
  payment: paymentType;
  setPayment: (payment: paymentType) => void;
}

export const PaymentSelectButton = (props: Props) => {
  return (
    <div>
      <div className="flex justify-center">
        <BaseButton
          text={"PayPay"}
          image={"/logo/paypay.png"}
          isSelect={props.payment === "paypay"}
          payment={"paypay"}
          setPayment={props.setPayment}
        />
        <BaseButton
          text={"クレジット\nApple Pay\nGoogle Pay"}
          image={"/logo/stripe.png"}
          textStyle={{
            fontSize: "0.9rem",
            lineHeight: "1rem",
          }}
          isSelect={props.payment === "stripe"}
          payment={"stripe"}
          setPayment={props.setPayment}
        />
      </div>
    </div>
  );
};

interface BaseButtonProps extends Props {
  isSelect: boolean;
  text: string;
  image: string;
  textStyle?: React.CSSProperties;
}
const BaseButton = (props: BaseButtonProps) => {
  return (
    <Button
      style={{
        ...BaseButtonStyles,
        backgroundColor: props.isSelect ? "#FFECD8" : "#ffffff",
        boxShadow: props.isSelect ? "inset 0px 3px 6px #00000029" : "none",
      }}
      onClick={() => {
        props.setPayment(props.payment);
      }}
    >
      <img
        className="h-10 w-10 rounded-lg"
        src={props.image}
        alt="payment_logo"
      />
      <ButtonText style={props.textStyle}>
        {props.text.split("\n").map((str, index) => (
          <React.Fragment key={index}>
            {str}
            <br />
          </React.Fragment>
        ))}
      </ButtonText>
    </Button>
  );
};
const BaseButtonStyles: React.CSSProperties = {
  border: "none",
  width: "170px",
  padding: "0px 17px",
  height: "70px",
  borderRadius: "10px",
  fontSize: "1.5rem",
  display: "flex",
  alignItems: "center",
  margin: "10px 10px",
  textTransform: "none",
};

const ButtonText = styled.p`
  font-size: 1.5rem;
  color: #707070;
  text-align: left;
  margin-left: 10px;
`;
