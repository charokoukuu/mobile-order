import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QrCodeMock from "../img/QRcode-mock.svg";
import PhoneMock from "../img/Phone-mock.svg";

export default function Slide() {
  // style
  const SlideStyle = {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    hight: "30%",
  };

  // slideSetting
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,
  };

  const Slides = [
    [
      "チケットの受け取りには、画面に表示されたQRコードを利用します。",
      QrCodeMock,
    ],
    ["21階に設置したQRコードをリーダーにかざしてください。", PhoneMock],
  ];

  return (
    <Slider {...settings}>
      {Slides.map((slide, i) => {
        return (
          <div key={i}>
            <p>{slide[0]}</p>
            <img style={SlideStyle} src={slide[1]} alt="slide" />
          </div>
        );
      })}
    </Slider>
  );
}
