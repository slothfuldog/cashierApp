import { API_URL } from "../helper";
import Axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import './Home.css'

const HomePage = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    swipeToSlide: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false
  };
  const getDataPromo = async () => {
    try {
      let res = await Axios.post(API_URL + "/products/filter", {
        types: "promo"
      });
      setData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      let res = await Axios.get(API_URL + "/products/menu");
      setDataMenu(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCarousel = () => {
    if (data.length > 0) {
      return data.map((val, index) => {
        return <Carousel data={val} key={index} />;
      });
    }
  };
  const renderMenu = () => {
    if (dataMenu.length > 0) {
      return dataMenu.map((val, index) => {
        if(index <= 3){
          return (
            <SwiperSlide key={index}>
              <Menu data={val} key={index} />
            </SwiperSlide>
          );
        }
      });
    }
  };
  useEffect(() => {
    getDataPromo();
    getData();
  }, []);
  return (
    <div
      className=" d-flex flex-column"
      style={{margin: " auto", width: "80%" }}
    >
      <div style={{ marginBottom: "20px", marginTop: "50px" }}>
        <p className="fw-bold" style={{ color: "black", fontSize: "27px" }}>
          TODAY'S SALE!
        </p>
      </div>
      <div>
        <Slider {...settings}>{renderCarousel()}</Slider>
      </div>
      <div className="mt-5">
        <div
          className="d-flex flex-row justify-content-between"
          style={{ marginBottom: "10px" }}
        >
          <p className="fw-bold" style={{ color: "black", fontSize: "27px", marginBotton:"-20px" }}>
            Menu
          </p>
          <p
            style={{ color: "blue", cursor: "pointer", width: "100px" , marginTop: "20px", marginBottom: "-20px"}}
            onClick={() => navigate("/menu", { replace: true })}
          >
            See More...
          </p>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          slidesPerGroup={2}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {renderMenu()}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePage;
