import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.esm';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import HomePage from './pages/Home';
import Axios from 'axios';
import { API_URL } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loginAction } from './action/userAction';
import Sidebar from './components/Sidebar';
import ProtectedLogin from './routes/protectedLogin';
import Registration from './pages/Registration';
import Product from './pages/Product';
import Report from './pages/Report';
import RightSideBar from './components/RightSideBar';
import { addItems } from './action/orderAction';
import AdminProducts from './pages/AdminProducts';
import ProtectedAdmin from './routes/protectedAdmin';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState('0px');
  const {id, items, totalPrice} = useSelector(state => {
    return{
      id: state.userReducer.id,
      items: state.orderCartReducer.items,
      totalPrice: state.orderCartReducer.totalPrice
    }
  })
  const keepLogin = async () =>{
    try {
      let getLocalStorage = localStorage.getItem('cashier_login')
      if(getLocalStorage){
        let res = await Axios.post(API_URL + `/users/keep-login`,{}, {
          headers:{
            "Authorization" : `Bearer ${getLocalStorage}`
          }
        })
        dispatch(loginAction(res.data.result))
        localStorage.setItem("cashier_login", res.data.token)
        setLoading(false)
      }
    else{
      setLoading(false)
    }} catch (error) {
        setLoading(false)
        localStorage.removeItem("cashier_login")
        console.log(error)
      }
    }
    const checkItems = () =>{
      let getStorage = JSON.parse(localStorage.getItem('add_item'))
      if(getStorage){
        dispatch(addItems(getStorage))
        if(items.length > 0){
          setWidth("330px");
        }else if(totalPrice == 0){
            setWidth("0px");
        }else{
          setWidth("0px")
        }
        }
        else{
          setWidth("0px")
        }
  }
    useEffect(() => {
      keepLogin();
      checkItems();
    },[totalPrice])
  return (
    <div>
      {(id) ? <>
        <Sidebar />
        <div style={{marginLeft: "60px"}}>
      <Navbar data = {loading} />
        <div style={{ marginRight: width}}> 
      <RightSideBar width = {width}/>
      <Routes>
        <Route path= "/login" element={<Login/>}/>
        <Route path= "/" element={<ProtectedLogin><HomePage/></ProtectedLogin>}/>
        <Route path= "/menu" element={<ProtectedLogin><Product/></ProtectedLogin>} />
        <Route path= "/admin-registration" element={<ProtectedLogin><ProtectedAdmin><Registration/></ProtectedAdmin></ProtectedLogin>} />
        <Route path= "/report" element={<ProtectedLogin><ProtectedAdmin><Report/></ProtectedAdmin></ProtectedLogin>} />
        <Route path= "/product" element={<ProtectedLogin><ProtectedAdmin><AdminProducts/></ProtectedAdmin></ProtectedLogin>} />
      </Routes>
      </div></div> </>:(id && items.length > 0 && totalPrice > 0)? <>
        <Sidebar />
        <div style={{marginLeft: "60px", marginRight: width}}> 
      <Navbar data = {loading} />
      <RightSideBar width = {width}/>
      <Routes>
        <Route path= "/login" element={<Login/>}/>
        <Route path= "/" element={<ProtectedLogin><HomePage/></ProtectedLogin>}/>
        <Route path= "/menu" element={<ProtectedLogin><Product/></ProtectedLogin>} />
        <Route path= "/admin-registration" element={<ProtectedLogin><ProtectedAdmin><Registration/></ProtectedAdmin></ProtectedLogin>} />
        <Route path= "/report" element={<ProtectedLogin><ProtectedAdmin><Report/></ProtectedAdmin></ProtectedLogin>} />
        <Route path= "/product" element={<ProtectedLogin><ProtectedAdmin><AdminProducts/></ProtectedAdmin></ProtectedLogin>} />
      </Routes>
      </div> </>: <><Sidebar />
        <div style={{marginLeft: "0px"}}> 
      <Navbar data = {loading} />
      <div style={{ marginRight: width}}></div>
      <Routes>
        <Route path= "/login" element={<Login/>}/>
        <Route path= "/" element={<ProtectedLogin><HomePage/></ProtectedLogin>}/>
        <Route path= "/menu" element={<ProtectedLogin><Product/></ProtectedLogin>} />
        <Route path= "/admin-registration" element={<ProtectedLogin><ProtectedAdmin><Registration/></ProtectedAdmin></ProtectedLogin>} />
        <Route path= "/report" element={<ProtectedLogin><ProtectedAdmin><Report/></ProtectedAdmin></ProtectedLogin>} />
        <Route path= "/product" element={<ProtectedLogin><ProtectedAdmin><AdminProducts/></ProtectedAdmin></ProtectedLogin>} />
      </Routes>
      </div> </>}
      
    </div>
  );
}

export default App;
