import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface ControlledRadioButtonsGroupProps {
  payment: string;
  // Paymentの型が不明なので一旦disable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPayment: (payment: any) => void;
}
export default function ControlledRadioButtonsGroup(
  props: ControlledRadioButtonsGroupProps
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPayment((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl className="my-[5%] mx-auto">
      <FormLabel>決済方法 (現金非対応)</FormLabel>
      <RadioGroup value={props.payment} onChange={handleChange}>
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
