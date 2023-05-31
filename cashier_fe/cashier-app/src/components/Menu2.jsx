import { useEffect, useState } from "react";
import { API_URL } from "../helper";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { SwiperSlide } from "swiper/react";
import './Menu.css'
import { Col } from "react-bootstrap";
import { GridItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../action/orderAction";

const Menu2 = (props) => {
  const dispatch = useDispatch();
  const [str, setStr] = useState('');
  const [strName, setStrName] = useState('');
  const [qty, setQty] = useState(0);
    const [data, setData] = useState([])
  const [colorChange, setColor] = useState('orange')
  const { items} = useSelector(state => {
    return{
      items: state.orderCartReducer.items
    }
  })
const currentData = () =>{
    let curDat = [...items]
    let datas = curDat.find(val => {
      return val.productsId == props.data.productsId});
    if(datas){
      setData(datas)
      setQty(datas.qty)
    }else{
      setQty(0)
    }
  }
  const setValue = (op) =>{
    if(op === "-" && qty > 0){
        setQty(qty - 1)
    }else if(op === "+"){
        setQty(qty + 1)
    }
  }
  const addItem = () =>{
    let data = [...items];
    
    const exist = items.find(val =>  val.productsId == props.data.productsId)
    if(exist){
      const currentData = items.map(val => val.productsId == props.data.productsId ? {...exist, qty: exist.qty + 1} : val)
      dispatch(addItems(currentData))
      localStorage.setItem("add_item", JSON.stringify(currentData))
      setValue('+');
    }
    else{
      const newData = [...items, {...props.data, qty: 1}]
      dispatch(addItems(newData));
      localStorage.setItem("add_item", JSON.stringify(newData))
      setValue('+');
    }
  }
  const removeHandler = () => {
    const exist = items.find(val => val.productsId === props.data.productsId);
    console.log("qty",exist.qty)
    if(exist.qty == 1){
      let currentData = items.filter(val => val.productsId !== props.data.productsId)
      console.log(currentData)
        dispatch(addItems(currentData))
        localStorage.setItem("add_item", JSON.stringify(currentData))
    }else{
      let currentData = items.map(val => val.productsId === props.data.productsId ? {...exist, qty: exist.qty - 1}: val)
      dispatch(addItems(currentData))
      localStorage.setItem("add_item", JSON.stringify(currentData))
    }
  }
  const setStringName = () => {
    if (props.data.name.length > 27) {
      setStrName(`${props.data.name.substring(0, 28)}...`);
    } else {
      setStrName(props.data.name);
    }
  };
  const setString = () => {
    if (props.data.description.length > 38) {
      setStr(`${props.data.description.substring(0, 38)}...`);
    } else {
      setStr(props.data.description);
    }
  };
  const images = () => {
    let str = `${API_URL}${props.data.picture}`;
    return str;
  };
  useEffect(() => {
    setString();
    setStringName();
    currentData();
  }, [items, props.data]);
  return (
      <GridItem className="bg-light shadow"
      style={{
        margin: "15px auto",
        height: "250px",
        width: "280px",
        borderRadius: "7%",
      }}>
        <div style={{ paddingTop: "15px" }}>
          <img
            src={images()}
            alt=""
            style={{
              height: "130px",
              width: "90%",
              objectFit: "cover",
              margin: "0 auto",
              borderRadius: "7%",
            }}
          />
        </div>
        <div style={{ margin: "10px 13px" }}>
          <p style={{ fontWeight: "700", fontSize: "16px" }}>
            {strName}
          </p>
          <p style={{ fontWeight: "600", fontSize: "13px", color: "gray" }}>
            {str}
          </p>
          <div className="d-flex flex-row justify-content-between mt-2">
            <p style={{ fontWeight: "700", fontSize: "16px", color: "orange" }}>
              {props.data.price.toLocaleString("id", {
                style: "currency",
                currency: "idr",
              })}
            </p>
            
                {!(qty > 0) ? <div className="d-flex flex-row buttons align-items-center" style={{marginRight: "30px"}}>  <AiFillPlusCircle
                color={colorChange}
                onClick={() => addItem()}
                size={25}
                style={{ cursor: "pointer"}}
              /> </div>:<div className="d-flex flex-row buttons align-items-center"> <AiFillMinusCircle
              onClick={() => removeHandler()}
              color="orange"
              size={25}
              style={{ cursor: "pointer" }}
            />
            <input
            value={qty}
              style={{
                width: "20px",
                height: "15px",
                marginLeft: "5px",
                textAlign: "center",
              }}
            ></input>
            <AiFillPlusCircle
              color={colorChange}
              onClick={() => addItem()}
              size={25}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            /></div>}
              
            
          </div>
        </div>
        </GridItem>
  );
};
export default Menu2;
