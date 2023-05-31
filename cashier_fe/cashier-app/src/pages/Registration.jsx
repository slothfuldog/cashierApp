import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../helper";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

const Registration = (props) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState("password");
  const hideHandler = () => {
    hide === "password" ? setHide("text") : setHide("password");
    console.log(hide);
  };
  const containsUpperCaseChar = (str) => {
    return Boolean(str.match(/[A-Z]/));
  };
  const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };
  const containsNumber = (str) => {
    return /\d/.test(str);
  };
  const [employeeId, setEmployeeId] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [randomPass, setPass] = useState("");
  const [heights, setHeight] = useState("0px");
  const [pad, setPad] = useState("0px");
  const [indicators, setInd] = useState(false);
  const [bgColor, setBgColor] = useState("red");
  const [data, setData] = useState(null);
  const [errMsg, setErr] = useState('')
  const registerEmployee = () => {
    if (employeeId.length > 0 && randomPass.length > 6) {
      if (window.confirm("Do you want to register new employee?") == true) {
        axios
          .post(API_URL + "/users/regis", {
            username: employeeId,
            fullname,
            email,
            password: randomPass,
            birthPlace: birthPlace,
            birthDate: birthDate,
            address,
            phoneNumber: phoneNumber,
            role: "student",
          })
          .then((res) => {
            setInd(true);
            setHeight("40px");
            setBgColor("green");
            setPad("10px");
            alert(res.data.message)
            window.location.reload()
          })
          .catch((err) => {
            setHeight("40px");
            setPad("10px");
            setErr(err.response.data.message)
            window.location.reload()
          });
      } else {
        alert("You are not registering any employee");
      }
    } else {
      setHeight("40px");
      setPad("10px");
    }
  };
  const passwordHandler = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const charsCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "1234567890";
    const specialChar = "!@#$%^&*-_+.";
    const mixed = chars + nums + charsCaps + specialChar;
    const random = Math.round(Math.random() * 8 + 6);
    let str = "";
    for (let i = 0; i < random; i++) {
      str += mixed[Math.round(Math.random() * (mixed.length - 1))];
    }
    setPass(str);
  };
  const getData = async () => {
    try {
        const getLocalStorage = localStorage.getItem("cashier_login")
      const res = await axios.get(API_URL + "/users", {
        headers:{
            "authorization" : `Bearer ${getLocalStorage}`
        }
      });
      console.log(res.data.result)
      setData(res.data.result);
    } catch (err) {}
  };
  const usernameHandler = () => {
    if(data != null){
        let str= "";
        str = "CASHIER_";
        str = str + new Date().toLocaleDateString().substring(0, 2) + data.length + "_";
        str = str + fullname.split(" ")[0].toUpperCase();
        setEmployeeId(str)}
    }
  useEffect(() => {
    usernameHandler()
    getData()
  }, [fullname]);
  return (
    <div>
      <Box className="d-flex">
        <Box style={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
          <div style={{ height: "10px" }}></div>
          <div
            className="text-white fw-bold d-flex flex-column justify-content-center"
            style={{
              paddingLeft: "20px",
              paddingTop: pad,
              height: heights,
              backgroundColor: bgColor,
              transition:
                "height 0.5s ease-in-out, padding-top 0.5s ease-in-out",
            }}
          >
            {indicators == true ? (
              <p>Employee has been registered</p>
            ) : (
              <p>{errMsg}</p>
            )}
          </div>
          <div
            className="shadow bg-light w-50"
            style={{ margin: "50px auto", height: "700px" }}
          >
            <div style={{margin: "0 40px", paddingTop: "50px"}}>
                <div>
                    <p className="fw-bold" style={{fontSize: "26px", marginBottom: "10px", marginTop:"-5px"}}>Register Employee</p>
                </div>
            <div>
              <p>Username</p>
              <input
                disabled
                className="mb-3"
                style={{ width: "100%" }}
                value= {employeeId}
              />
            </div>
            <div>
              <p>Fullname</p>
              <input
                required
                className="mb-3"
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                required
                className="mb-3"
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Phone Number</p>
              <input
                required
                className="mb-3"
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="d-flex flex-row ">
              <div>
                <p>Birth Place</p>
                <input
                  required
                  className="mb-3"
                  type="text"
                  onChange={(e) => setBirthPlace(e.target.value)}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <p>Birth Date</p>
                <input
                  required
                  className="mb-3"
                  type="date"
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p>Address</p>
              <input
                required
                className="mb-3"
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <p>Password</p>
              <div className="input-group mb-3">
                <input
                  required
                  type={hide}
                  style={{ width: "80%" }}
                  onChange={(e) => setPass(e.target.value)}
                  value={randomPass}
                />
                <span className="input-group-text bg-light border-top-0 border-left-0">
                  {hide === "text" ? (
                    <AiFillEye
                      onClick={hideHandler}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={hideHandler}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </span>
              </div>
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  border: "black solid 1px",
                  fontWeight: "600",
                }}
                id="btn-generate"
                onClick={passwordHandler}
              >
                Generate
              </Button>
            </div>
            <div style={{ marginTop: "45px" }}>
              <Button
                className="fw-bold"
                colorScheme="orange"
                style={{ width: "100%" }}
                onClick={registerEmployee}
              >
                Register
              </Button>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Registration;
