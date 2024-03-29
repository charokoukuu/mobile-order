import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QrCodeMock } from "./icons/QrCodeMock";
import { Scan } from "./icons/Scan";
import { Printer } from "./icons/Printer";
import { Ticket } from "./icons/Ticket";

export default function Slide() {
  const SlideStyle = {
    hight: "30%",
    maxWidth: "90%",
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,
  };

  const Slides = [
    [
      "チケットの受け取りには、画面に表示されたQRコードを利用します",
      <QrCodeMock style={SlideStyle} key="0" className="h-60 md:h-96" />,
    ],
    [
      "21階に設置したQRコードリーダーでチケットを読み取ります",
      <Scan style={SlideStyle} key="1" className="h-60 md:h-96" />,
    ],
    [
      "チケットを読み取ると、隣に設置してあるプリンターから食券を受け取ります",
      <Printer style={SlideStyle} key="2" className="h-60 rotate-[-10deg] md:h-96" />,
    ],
    [
      "食堂のスタッフへ食券を提示してください",
      <Ticket style={SlideStyle} key="3" className="h-60 md:h-96" />,
    ],
  ];

  return (
    <Slider {...settings}>
      {Slides.map((slide, index) => {
        return (
          <div key={index}>
            <p className="my-[5%] mx-[10%] text-black">
              <span className="mr-2 text-lg font-bold text-black/80">
                {index + 1}.
              </span>
              {slide[0] as string}
            </p>
            <div className="mx-auto flex justify-center">{slide[1]}</div>
          </div>
        );
      })}
    </Slider>
  );
}
