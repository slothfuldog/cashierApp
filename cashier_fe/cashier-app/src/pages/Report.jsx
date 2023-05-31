import { useEffect, useState } from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API_URL } from "../helper";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";


const Report = (props) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [past, setPast] = useState(null);
  const[date, setDate] = useState(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const { items, id } = useSelector((state) => {
    return {
      items: state.orderCartReducer.items,
      id: state.userReducer.id,
    };
  });
  const getChartData = () =>{
    if(data.length> 0){
        setLoading(true);
        setChartData({
            labels: allData.map((val) => val.date),
            datasets: [
              {
                label: "All time sells",
                data: allData.map((val) => val.total),
              },
            ],
          });
          setLoading(false);
    }
  }
  const checkData = () =>{
    let newArr =[];
    let result = allData.map(val => newArr.concat(val.items));
    console.log(result)
  };
  const createReportHandler = () =>{
    setLoading(true)
    let total = 0;
    data.forEach(val =>{
      total += parseInt(val.total) 
    })
    Swal.fire({
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonColor: "rgb(231, 150, 0)",
      confirmButtonText: "Yes",
      title: "Do you want to create report?"
    }).then(result =>{
      if(result.isConfirmed){
        let currentTime = new Date().toTimeString();
        console.log(parseInt(currentTime.substring(0,2)))
        if(parseInt(currentTime.substring(0,2)) >= 19){
          Axios.post(API_URL + '/report',{
            total: total
          }).then(res =>{
            Swal.fire({
              confirmButtonColor: "rgb(231, 150, 0)",
              title: res.data.message,
              icon: "success"
            })
            setLoading(false)
          }).catch(e => console.log(e))
        }else{
          Swal.fire({
            confirmButtonColor: "rgb(231, 150, 0)",
            title: "You are only able to make a report after 19:00 or 07:00 PM",
            icon: "error"
          })
        }
      }else if(result.isDenied){
        Swal.fire({
          confirmButtonColor: "rgb(231, 150, 0)",
          title: "You are not making any report",
          icon: "error"
        })
      }
    })
  }
  const getAllTrans = async () => {
    try {
      setLoading(true)
      let res = await Axios.post(API_URL + "/report/all", {
        past: past,
        date: date
      });
      setAllData(res.data.result);
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error);
      setLoading(false)
    }
  };
  const getData = async () => {
    try {
      setLoading(true)
      let res = await Axios.get(API_URL + "/transaction");
      setData(res.data.result);
      console.log(res.data.result)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error);
      setLoading(false)
    }
  };
  const renderData = () => {
    if (data.length > 0) {
      return data.map((val) => {
        let tempsData = [];
        let prices = [];
        let totalPrices = 0;
        val.items.forEach((val2) => {
          tempsData.push(`${val2.name} ${val2.qty}x`);
          prices.push(parseInt(val2.price * val2.qty));
        });
        let tempsStr = tempsData.join(", ");
        for (let i = 0; i < prices.length; i++) {
          totalPrices = totalPrices + prices[i];
        }
        
        return (
          <tr>
            <td>{val.date}</td>
            <td>{val.username}</td>
            <td>{tempsStr}</td>
            <td>
              {parseInt(val.total).toLocaleString("id", {
                style: "currency",
                currency: "IDR",
              })}
            </td>
          </tr>
        );
      });
    }
  };
  const getTotal = () =>{
    return data.map(val =>{
      let prices = [];
      let totalPrices = 0;
      val.items.forEach((val2) => {
        prices.push(parseInt(val2.price * val2.qty));
      });
      for (let i = 0; i < prices.length; i++) {
        totalPrices = totalPrices + prices[i];
      }
      setTotal(totalPrices)
    })
  }
  const checkState = () => {
    if(JSON.stringify(chartData) != "{}"){
       return <Bar data={chartData} />
    }else{
        return "Is loading..."
    }
  };
  useEffect(() => {
    getData();
    getAllTrans();
    checkData()
    getChartData();
    getTotal();
  }, [items, loading]);
  return (
    <div>
      <div className="d-flex flex-column" style={{ marginLeft: "20px", marginBottom: "30px" }}>
        <div style={{ marginTop: "20px" }}>
            {checkState()}</div>
            <div className="d-flex flex-row" style={{marginTop: "10px"}}>
              From: <input type="date" style={{margin: "0 10px"}} onChange={(e) => setPast(e.target.value)}/>
              To: <input type="date" style={{margin: "0 10px"}} onChange={(e) => setDate(e.target.value)}/>
              <Button colorScheme="orange" onClick={() =>{
                setLoading(true)
                getAllTrans();
                getChartData();
                setLoading(false)
              }}>Get Data</Button>
          </div>
        <div>
          History Data
          <table className="table" style={{ textAlign: "center" }}>
            <tr>
              <th>date</th>
              <th>username</th>
              <th>items</th>
              <th>total</th>
            </tr>
            {renderData()}
          </table>
          
          <div className="d-flex flex-row justify-content-end">
            <p style={{ marginRight: "30px" }}>
              TOTAL:{" "}
              {total.toLocaleString("id", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div>
            <Button colorScheme="orange" onClick={createReportHandler}>Create Report</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
