import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancel } from "../action/orderAction";
import "./RightSideBar.css";
import Axios from 'axios'
import { API_URL } from "../helper";
import Swal from "sweetalert2";
import OrderCartList from "./OrderCartList";

const RightSideBar = (props) => {
    const dispatch = useDispatch()
    const { items, totalPrice, userId, username} = useSelector(state => {
      return{
        items: state.orderCartReducer.items,
        totalPrice: state.orderCartReducer.totalPrice,
        username: state.userReducer.username,
        userId: state.userReducer.id,
      }
    });
    const cancelHandler = () =>{
      dispatch(cancel())
      localStorage.removeItem('add_item')
 } 
    const checkoutHandler = () =>{
        Swal.fire({
          title: 'Do you want to checkout?',
          showDenyButton: true,
          confirmButtonColor: "rgb(231, 150, 0)",
          confirmButtonText: 'Checkout',
          denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              input: 'number',
              inputLabel: `Total amount to pay: ${totalPrice.toLocaleString('id', {style: "currency", currency: "IDR"})}`,
              showDenyButton: true,
              confirmButtonText: "Submit",
              denyButtonText: "Cancel",
              confirmButtonColor: "rgb(231, 150, 0)"
            }).then((result1) => {
              if(result1.value == totalPrice){
                Axios.post(API_URL + '/transaction/create', {
                  jsonItems: items,
                  id: userId,
                  username,
                  total: totalPrice
                }).then(res => {
                    Swal.fire({
                      title: res.data.message,
                      icon: "success",
                      confirmButtonColor: "rgb(231, 150, 0)"
                    })
                    cancelHandler();
                }).catch(e => console.log(e.response.data.message))
              }
              else if(result1.value > totalPrice){
                Axios.post(API_URL + '/transaction/create', {
                  jsonItems: items,
                  id: userId,
                  username,
                  total: totalPrice
                }).then(res => {
                    Swal.fire({
                      title: `${res.data.message}\n The change: ${(result1.value - totalPrice).toLocaleString('id', {style: "currency", currency: "IDR"})}`,
                      icon: "success",
                      confirmButtonColor: "rgb(231, 150, 0)"
                    })
                    cancelHandler();
                }).catch(e => console.log(e.response.data.message))
              }else if(result1.isDenied){
                Swal.fire({
                  title: `Transaction canceled!`,
                  icon: 'error',
                  confirmButtonColor: "rgb(231, 150, 0)"
                })
              }else if(result1.value < totalPrice){
                let paidAmount = parseInt(result1.value)
                Swal.fire({
                  title: `You paid ${(paidAmount) ? paidAmount.toLocaleString('id', {style:"currency", currency: "IDR"}): "0".toLocaleString('ID', {style: "currency", currency:"IDR"})}\n You need to pay ${(totalPrice - result1.value).toLocaleString('id', {style:"currency", currency: "IDR"})} more`,
                  icon: 'error',
                  confirmButtonColor: "rgb(231, 150, 0)"
                })
              }
            })
          } else if (result.isDenied) {
            Swal.fire({
              title:'You are not checking out the order',
              confirmButtonColor: "rgb(231, 150, 0)",
              icon: "error"
            })
          }
        })
      }

   const renderItems = () =>{
    return items.map((val, index) => {
      return <OrderCartList data = {val} key={index}/>
    })
   } 
   useEffect(() => {
    console.log("id", userId)
   }, [items])
  return (
    <div>
      <div
        className="right-side-bar shadow"
        style={{ width: props.width, marginRight: "0", height:"100%", transition:"width 0.3s ease-in-out", backgroundColor: "white"}}
      >
        <div style={{ margin: "30px 0 20px 30px" }}>
          <p style={{ fontSize: "24px" }}>Orders List</p>
          <div style={{marginLeft: "-5px", marginTop: "15px", height: "300px" ,overflow: "scroll"}}>
            {renderItems()}
          </div>
          
          <div className="btns-group" style={{width: "300px"}}>
            <div style={{marginRight: "10%"}}>
            <div className="d-flex flex-row justify-content-between">
            <p style={{marginBottom: "20px", color: "grey", fontWeight:"700"}}>Subtotal: </p> 
            <p style={{fontWeight: "700"}}>{totalPrice.toLocaleString('id',{style: "currency", currency: "IDR"})}</p>
            </div>
            <Button colorScheme="orange" className="btn btn-warning justify-content-cneter" onClick={checkoutHandler} style={{width: "100%"}}>Check Out</Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
