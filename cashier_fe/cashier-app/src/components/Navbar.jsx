import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";
import { BiReset, BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../action/userAction";
import {cancel} from '../action/orderAction';
import Axios from 'axios';
import { API_URL } from "../helper";
import { useEffect, useState } from "react";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderNum, setOrder] = useState(0);
  const { fullname, role, items } = useSelector((state) => {
    return {
      fullname: state.userReducer.fullname,
      role: state.userReducer.role,
      items: state.orderCartReducer.items
    };
  });
  const logoutHandler = () => {
    localStorage.removeItem("cashier_login");
    localStorage.removeItem("add_item");
    dispatch(logoutAction());
    navigate("/login", { replace: true });
    window.location.reload();
  };
  const getAllTransaction = async () =>{
    try {
      const res = await Axios.get(API_URL + `/transaction`)
      setOrder(res.data.result.length + 1)
    } catch (error) {
      console.log(error)
    }
  }
  const resetHandler = () =>{
    dispatch(cancel());
    localStorage.removeItem('add_item')
  }
  useEffect(() => {
    getAllTransaction()
  },[items])
  return (
    <div className="navbar navbar=expand-lg navbar-light sticky-top bg-white shadow" style={{width: "100%"}}>
      {!fullname ?  (
        ""
      ): <div className="d-flex flex-row justify-content-between mt-3 " style={{marginLeft: "0px", paddingLeft: "20px", paddingBottom: "10px", paddingRight: "50px", width: "100%"}}>
      <div >
        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input placeholder="Search here" />
            <InputRightElement>
              <AiOutlineFilter type="button" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </div>
      <div className="d-flex flex-row">
        <div
          className="d-flex flex-column align-item-center justify-content-center text-center"
          style={{ marginRight: "25px" }}
        >
          <p style={{ color: "gray", fontSize: "14px" }}>Order No.</p>
          <p className="fw-bold" style={{ fontSize: "16px" }}>
            #{orderNum}
          </p>
        </div>
        <div
          className="d-flex flex-row align-items-center"
          style={{ marginRight: "25px", cursor: "pointer" }}
          onClick={resetHandler}
        >
          <span>
            <BiReset size={27} style={{ marginRight: "10px" }} />
          </span>
          <span style={{ fontWeight: "500" }}>Reset Order</span>
        </div>
        <div
          className="d-flex flex-row align-items-center"
          style={{ marginRight: "25px", cursor: "pointer" }}
        >
          <span>
            <BiPencil size={27} style={{ marginRight: "10px" }} />
          </span>
          <span style={{ fontWeight: "500" }}>Add Note</span>
        </div>
        <div>
          <div className="d-flex flex-row justify-content-center align-items-center dropdown">
            <Avatar size="sm" />{" "}
            <button
              className="btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {fullname}
            </button>
            <div className="dropdown-menu">
              <p className="dropdown-item">Profile</p>
              <p className="dropdown-item" onClick={logoutHandler}>
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
};

export default Navbar;
