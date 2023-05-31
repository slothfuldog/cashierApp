import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../helper";
import Menu2 from "../components/Menu2";
import { Container, Row } from "react-bootstrap";
import { Grid } from "@chakra-ui/react";
import { CiBurger } from "react-icons/ci";
import { BiDrink } from "react-icons/bi";
import { TbDiscount2 } from "react-icons/tb";
import { BsTrophy, BsEraser } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import ReactPaginate from "react-paginate";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import "./Product.css";

const Product = (props) => {
  const [dataMenu, setDataMenu] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [tempMenu, setTempMenu] = useState([]);
  const [loading, setLoading]= useState(false);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 6;
  const getData = async () => {
    try {
      let res = await Axios.post(API_URL + "/products/filter", {
        types: filter,
      });
      setDataMenu(res.data.result);
      console.log(dataMenu)
      setPageCount(Math.ceil(res.data.result.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };
  const renderMenu = () => {
    if (dataMenu.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      const currentData = dataMenu.slice(itemOffset, endOffset);
      return currentData.map((val, index) => {
        return <Menu2 data={val} key={index} />;
      });
    }
  };

  const handlePageClick = (event) => {
    if(dataMenu.length> 0){
      setLoading(true);
      const newOffset = (event.selected * itemsPerPage) % dataMenu.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
      setLoading(false);
    }
    
  };

  useEffect(() => {
      getData();
  }, [filter, itemOffset, itemsPerPage, pageCount, loading]);
  return (
    <div>
      <div style={{ height: "" }}>
        <div
          className="d-flex flex-column justify-content-between align-items-center"
          style={{}}
        >
          <div
            className="d-flex flex-row justify-content-start align-items-center"
            style={{ width: "100%", margin: "15px auto" }}
          >
            
            <div
              className=" btn d-flex flex-row justify-content-center align-items-center bg-light shadow"
              style={{ margin: "0 0 0 25px" }}
              onClick={() => setFilter("promo")}
            >
              <TbDiscount2 size={23} />
              <p style={{ marginLeft: "5px" }}>Promo</p>
            </div>
            <div
              className=" btn d-flex flex-row justify-content-center align-items-center bg-light shadow"
              style={{ margin: "0 0 0 25px" }}
              onClick={() => setFilter("food")}
            >
              <CiBurger size={25} />
              <p>Food</p>
            </div>
            <div
              className=" btn d-flex flex-row justify-content-center align-items-center bg-light shadow"
              style={{ margin: "0 0 0 25px" }}
              onClick={() => setFilter("drink")}
            >
              <BiDrink size={23} />
              <p>Drink</p>
            </div>
            <div
              className=" btn d-flex flex-row justify-content-center align-items-center bg-light shadow"
              style={{ margin: "0 0 0 10px", borderRadius: "50%" }}
              onClick={() => setFilter("")}
            >
              <ImCross size={10} />
            </div>
          </div>
          <Container
            className="container-fluid bg-light shadow"
            style={{ margin: "30px auto", width: "95%" }}
          >
            <Grid templateColumns="repeat(3,1fr)">{renderMenu()}</Grid>
          </Container>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<GiNextButton color="rgb(231, 150, 0)" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={<GiPreviousButton color="rgb(231, 150, 0)" />}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousClassName="page-previous"
            nextClassName="page-next"
            activeLinkClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;

{/* <div
              className=" btn d-flex flex-row justify-content-center align-items-center bg-light shadow"
              style={{ margin: "0 0 0 25px" }}
            >
              <BsTrophy size={23} />
              <p style={{ marginLeft: "5px" }}>Best Seller</p>
            </div> */}