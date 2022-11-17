import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface ControlledRadioButtonsGroupProps {
  payment: string;
  setPayment: (payment: unknown) => void;
}
export default function ControlledRadioButtonsGroup(
  props: ControlledRadioButtonsGroupProps
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPayment((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl style={{ margin: "5% auto" }}>
      <FormLabel id="demo-controlled-radio-buttons-group">
        決済方法 (現金非対応)
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.payment}
        onChange={handleChange}
      >
        <FormControlLabel value="paypay" control={<Radio />} label="PayPay" />
        <FormControlLabel
          value="stripe"
          control={<Radio />}
          label="クレジットカード,ApplePay etc..."
        />
      </RadioGroup>
    </FormControl>
  );
}
