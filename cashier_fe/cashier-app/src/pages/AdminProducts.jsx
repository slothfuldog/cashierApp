import { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../helper";
import ProductsAdmin from "../components/ProductsAdmin";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const AdminProducts = (props) => {
  const [data, setData] = useState([]);
  const [addItem, setAddItem] = useState(false);
  const [nameItem, setNameItem] = useState("");
  const [descriptions, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [selectImg, setSelectImg] = useState(null);
  const [values, setValue] = useState("productsId");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const { id } = useSelector((state) => {
    return {
      id: state.userReducer.id,
    };
  });

  const getData = async () => {
    try {
      setLoading(true)
      let res = await Axios.post(API_URL + "/products-list/filter", {
        name: nameItem,
        type : type,
        values: values,
        order: order
      });
      setData(res.data.result);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const renderData = () => {
    return data.map((val, index) => {
      return <ProductsAdmin data={val} getData={getData} key={index} />;
    });
  };
  const addItemTrue = () => {
    setAddItem(true);
  };
  const addItemFalse = () => {
    setAddItem(false);
  };
  const imgSaverHandler = () => {
    let token = localStorage.getItem("cashier_login");
    let formData = new FormData();
    formData.append("images", selectImg);
    formData.append("name", nameItem);
    formData.append("description", descriptions);
    formData.append("price", parseInt(price));
    formData.append("type", type);
    console.log(formData);
    Swal.fire({
      title: "Add new product",
      showDenyButton: true,
      confirmButtonColor: "rgb(231, 150, 0)",
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(API_URL + "/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: res.data.message,
                confirmButtonColor: "rgb(231, 150, 0)",
                icon: "success",
              });
              setAddItem(false);
              getData();
            }
          })
          .catch((error) => {
            console.log(error);
            setAddItem(false);
          });
      } else if (result.isDenied) {
        Swal.fire({
          title: "You are not adding this products",
          confirmButtonColor: "rgb(231, 150, 0)",
          icon: "error",
        });
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div
        className="bg-light shadow"
        style={{ margin: "20px auto", width: "95%" }}
      >
        <div style={{ marginLeft: "20px", paddingTop: "5px" }}>
          <p
            style={{
              fontSize: "26px",
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            PRODUCT LIST
          </p>
          <div style={{ overflow: "scroll", height: "400px" }}>
            <table className="table">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {renderData()}
                {!addItem ? (
                  ""
                ) : (
                  <tr>
                    <td>
                      <input
                        type="file"
                        onChange={(e) => setSelectImg(e.target.files[0])}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="name"
                        onChange={(e) => setNameItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="description"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="type"
                        onChange={(e) => setType(e.target.value)}
                      />
                    </td>
                  </tr>
                )}
                {console.log(selectImg)}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="d-flex flex-row justify-content-between"
          style={{
            marginTop: "20px",
            paddingBottom: "20px",
            marginRight: "10px",
          }}
        >
          <div className="d-flex flex-row">
            <input
              className="input"
              type="text"
              placeholder="Item name"
              style={{ marginLeft: "10px" }}
              onChange ={(e) => setNameItem(e.target.value)}
            />
            <select style={{ marginLeft: "10px" }} onChange={e => setValue(e.target.value)}>
              <option value="productsId">Select Filter</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="type">Type</option>
            </select>
            <select style={{ marginLeft: "10px" }} onChange={e => setOrder(e.target.value)}>
              <option value="asc">Select Sort</option>
              <option value="asc">ASC</option>
              <option value="desc">Desc</option>
            </select>
            <select style={{ marginLeft: "10px" }} onChange={e => setType(e.target.value)}>
              <option value="">Filter Type</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
              <option value="promo">Promo</option>
            </select>
            <Button colorScheme="orange" style={{ marginLeft: "10px" }} onClick={getData}>
              Search Now
            </Button>
          </div>
          <div>
            {addItem ? (
              <div>
                {" "}
                <Button colorScheme="orange" onClick={imgSaverHandler}>
                  Save
                </Button>{" "}
                <Button
                  variant="outline"
                  colorScheme="orange"
                  onClick={addItemFalse}
                >
                  Cancel
                </Button>{" "}
              </div>
            ) : (
              <Button colorScheme="orange" onClick={addItemTrue}>
                Add Item
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
