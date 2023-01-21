import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QrCodeMock } from "./icons/QrCodeMock";
import { PhoneMock } from "./icons/PhoneMock";

export default function Slide() {
  const SlideStyle = {
    hight: "30%",
    maxWidth: "90%",
  };

  const settings = {
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
      <QrCodeMock style={SlideStyle} key="0" />,
    ],
    [
      "21階に設置したQRコードをリーダーにかざしてください",
      <PhoneMock style={SlideStyle} key="1" />,
    ],
  ];

  return (
    <Slider {...settings}>
      {Slides.map((slide, index) => {
        return (
          <div key={index}>
            <p className="my-[5%] mx-[10%] text-black">{slide[0] as string}</p>
            <div className="mx-auto flex justify-center">{slide[1]}</div>
          </div>
        );
      })}
    </Slider>
  );
}
