const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

const stripe = require("stripe")(
  "sk_test_51LGG4SAYr0GKBopU3nKzyYdbMxkR7VgHllg0riGMvD3tfJ8TsGHRMgqzibyIA8lMkRw6CyI8FB7IYDCkKarADT6X00ZxMN1PO0"
);

app.use(cors());
app.use(bodyParser.json());

app.post("/create-checkout-session", async (req, res) => {
  // res.set({ "Access-Control-Allow-Origin": "*" });
  const orderData = req.body.orderData;
  // const orderTitle = orderData.map((item) => item.title).join(",");

  const data = orderData.flatMap((item) => [
    {
      price_data: {
        currency: "jpy",
        product_data: {
          name: item.title.toString(),
        },
        unit_amount: item.price,
      },
      quantity: 1,
    },
  ]);

  console.log(data);
  const session = await stripe.checkout.sessions.create({
    line_items: data,
    mode: "payment",
    success_url: `http://172.22.26.217:3000/order/${req.body.orderId}`,
    cancel_url: `http://172.22.26.217:3000/order/${req.body.orderId}`,
  });

  res.send(session.url);
  console.log("ok");
  // console.log(orderTitle);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
