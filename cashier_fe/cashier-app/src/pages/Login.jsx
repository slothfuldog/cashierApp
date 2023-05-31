import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../action/userAction";
import {AiFillEye ,AiFillEyeInvisible} from 'react-icons/ai';
import Swal from "sweetalert2";
import './Login.css'

const Login = (props) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [msgHeight, setMsgHeight] = useState('0px');
  const [inputUsername, setUsername] = useState(null);
  const [inputPassword, setPassword] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const loginHandler = async () => {
    try {
      let res = await Axios.post(API_URL + `/users`, {
        login: inputUsername,
        password: inputPassword,
      });
      dispatch(loginAction(res.data.result));
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
      localStorage.setItem("cashier_login", res.data.token);
      if(res.data.result.role == 'employee'){
        navigate("/", { replace: true });
      }else if(res.data.result.role == 'admin' || res.data.result.role == 'superadmin'){
        navigate("/product", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setMsgHeight("30px");
      Toast.fire({
        icon: 'error',
        title: 'Signed in failed'
      })
    }
  };
  useEffect(() => {

  }, [msgHeight])
  return (
    <div className="container login">
      <div className="bg-light shadow" style={{ margin: "80px auto" }}>
        <div
          style={{
            margin: "20px 40px",
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <h1 className="fw-bold" style={{ fontSize: "30px" }}>
            Login
          </h1>
          {(errorMsg != "") ? <div style={{height: msgHeight, paddingLeft: "10px", backgroundColor: "red", color: "white", fontWeight: "600", transition: "all 0.5s ease-in-out"}}> {errorMsg} </div> : <div style={{height: "0px"}}> {errorMsg} </div> }
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl style={{ marginTop: "30px" }}>
              <FormLabel>Username or Email</FormLabel>
              <Input
                type="text"
                value={inputUsername}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={inputUsername === "" || inputUsername === " "}
              />
              {!(inputUsername === "" || inputUsername === " ") ? (
                <FormHelperText />
              ) : (
                <FormHelperText color="red">
                  Username is required
                </FormHelperText>
              )}
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  value={inputPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={inputPassword === "" || inputPassword === " "}
                />
                
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </InputRightElement>
                
              </InputGroup>
              {!(inputPassword === "" || inputUsername === " ") ? (
                  <FormHelperText />
                ) : (
                  <FormHelperText color="red">
                    Password is required
                  </FormHelperText>
                )}
              <Button
                type="submit"
                colorScheme="orange"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={loginHandler}
              >
                Login
              </Button>
              <p
                style={{
                  textAlign: "end",
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "gray",
                }}
              >
                Contact the admin to reset your password
              </p>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
