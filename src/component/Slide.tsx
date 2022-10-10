import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QrCodeMock } from "./icons/QrCodeMock";
import { PhoneMock } from "./icons/PhoneMock";

export default function Slide() {
  // style
  const SlideStyle = {
    hight: "30%",
    maxWidth: "90%",
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
      "チケットの受け取りには、画面に表示されたQRコードを利用します",
      <QrCodeMock style={SlideStyle} />,
    ],
    ["21階に設置したQRコードをリーダーにかざしてください", <PhoneMock style={SlideStyle}/>],
  ];

  return (
    <Slider {...settings}>
      {Slides.map((slide, index) => {
        return (
          <div key={index} style={{margin:"0 auto",position:"absolute"}}>
            <p style={{ margin: "5% 10%", color: "#000000" }}>{slide[0] as string}</p>
            <div style={{display:"flex", justifyContent: "center" , margin:"0 auto"}}>
              {slide[1]}
            </div>
          </div>
        );
      })}
    </Slider >
  );
}
