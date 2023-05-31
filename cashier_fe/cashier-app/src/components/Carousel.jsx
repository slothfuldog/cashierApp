import { API_URL } from "../helper";

const Carousel = (props) => {
  const images = () => {
    let str = `${API_URL}${props.data.picture}`;
    return str;
  };
  return (
      <div className="carousel-item active">
        <img
          src={images()}
          className="d-block w-100"
          alt="..."
          style={{ height: "450px", width: "75%", objectFit: "fill" }}
        />
      </div>
  );
};

export default Carousel;
