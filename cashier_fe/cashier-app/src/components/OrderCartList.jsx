import { API_URL } from "../helper";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../action/orderAction";
import './OrderCart.css'

const OrderCartList = (props) => {
    const dispatch = useDispatch();
  const number = parseInt(props.data.price);
  const [qty, setQty] = useState(0);
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
      setQty(datas.qty)
    }else{
      setQty(0)
    }
  }
  const images = () => {
    let str = `${API_URL}${props.data.picture}`;
    return str;
  };
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
  useEffect(() => {
    currentData();
  }, [items]);
  return (
    <div className="container fade-in" style={{marginBottom: "10px", marginRight: "5px",width: "300px", backgroundColor: "#EBE9E9", padding: "5px 3px"}}>
      <div className="d-flex flex-row" >
        <img
          src={images()}
          alt=""
          style={{ width: "55px", height: "50px", marginRight: "10px" }}
        />
        <div className="d-flex flex-column w-100">
          <p style={{ fontSize: "12px", fontWeight: "700" }}>
            {props.data.name}
          </p>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ marginTop: "7px", justifyContent: "space-between"}}
          >
            <p style={{ fontSize: "12px", fontWeight: "600", color: "orange" }}>
              {number.toLocaleString("id", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <div className="d-flex flex-row align-items-center">
              <AiFillMinusCircle
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
                  backgroundColor: "#EBE9E9"
                }}
              ></input>
              <AiFillPlusCircle
                color={colorChange}
                onClick={() => addItem()}
                size={25}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCartList;

// {index + 1}. {val.name} {val.qty}x {val.price.toLocaleString('id', {style: "currency", currency: "IDR"})}
