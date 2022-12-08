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
      <Section>
        <h2 className="themeFontColor">決済方法</h2>
        <p
          className="descriptionColor"
          style={{
            fontSize: "13px",
          }}
        >
          お支払い方法を選択してください。なお、RunTicketは現金決済に対応しておりません。ご了承ください。
        </p>
      </Section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <BaseButton
          text={"PayPay"}
          image={"/logo/paypay.png"}
          isSelect={true}
          payment={props.payment}
          setPayment={props.setPayment}
        />
        <BaseButton
          text={"クレジットカード\nApple Pay\nGoogle Pay"}
          image={"/logo/stripe.png"}
          imageStyle={{
            borderRadius: "10px",
            width: "40px",
            height: "40px",
          }}
          textStyle={{
            fontSize: "0.5rem",
            lineHeight: "1rem",
            marginLeft: "10px",
          }}
          isSelect={false}
          payment={props.payment}
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
  imageStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}
const BaseButton = (props: BaseButtonProps) => {
  return (
    <div>
      <Button
        style={{
          ...BaseButtonStyles,
          backgroundColor: props.isSelect ? "#FFECD8" : "#ffffff",
          boxShadow: props.isSelect ? "inset 0px 3px 6px #00000029" : "none",
        }}
      >
        <img
          style={props.imageStyle}
          src={props.image}
          alt="payment_logo"
          width="50px"
          height="50px"
        />
        <ButtonText style={props.textStyle} className="japanese_L">
          {props.text.split("\n").map((str, index) => (
            <React.Fragment key={index}>
              {str}
              <br />
            </React.Fragment>
          ))}
        </ButtonText>
      </Button>
    </div>
  );
};
const BaseButtonStyles: React.CSSProperties = {
  border: "none",
  width: "170px",
  padding: "13px 17px",
  borderRadius: "10px",
  fontSize: "1.5rem",
  display: "flex",
  alignItems: "center",
  margin: "10px 10px",
  textTransform: "none",
};

const ButtonText = styled.div`
  font-size: 1.5rem;
  color: #707070;
  text-align: left;
`;

const Section = styled.div`
  width: 80%;
  margin: 0 auto;
`;
