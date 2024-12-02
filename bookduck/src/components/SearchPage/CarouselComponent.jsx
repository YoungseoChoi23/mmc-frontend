import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookComponent from "./BookComponent";

const CarouselComponent = ({ popularBooks }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const navigate = useNavigate();
  return (
    <Slider {...settings}>
      {popularBooks.map((book, index) => (
        <div key={index} className="flex flex-row gap-3">
          <BookComponent
            img={book.imgPath}
            title={book.title}
            writer={book.writer}
            handleClick={() => navigate(`/info/book/${book.bookInfoId}`)}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
