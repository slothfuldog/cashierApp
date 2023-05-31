import { useState } from "react";
import { API_URL } from "../helper";
import Axios from 'axios';
import Swal from "sweetalert2";

const ProductsAdmin = (props) => {
  const [editMode, setEdit] = useState(false);
  const [nameItem, setNameItem] = useState(props.data.name);
    const [descriptions, setDesc] = useState(props.data.description);
    const [price, setPrice] = useState(props.data.price);
    const [type, setType] = useState(props.data.type);
    const [selectImg, setSelectImg] = useState(null);
    const [image, setImg] = useState(props.data.picture.substring(16, props.data.picture.length));
  const images = () => {
    let str = `${API_URL}${props.data.picture}`;
    return str;
  };
  const editModeTrue = () => {
    setEdit(true);
  };
  const editModeFalse = () => {
    setEdit(false);
  };
  const deleteHandler = () =>{
        Swal.fire({
            title: "Do you want to delete this product?",
            confirmButtonColor: "rgb(231, 150, 0)",
            showDenyButton: true,
            denyButtonText: "No",
            confirmButtonText: "Yes"
        }).then(result => {
            if(result.isConfirmed){
                Axios.patch(API_URL+ '/products/delete', {
                    productsId: props.data.productsId
                }).then(res =>{
                    Swal.fire({
                        title: res.data.message,
                        confirmButtonColor: "rgb(231, 150, 0)",
                        icon: "success"
                    })
                    props.getData();
                }).catch(error =>{
                    Swal.fire({
                        title: error.response.data.message,
                        confirmButtonColor: "rgb(231, 150, 0)",
                        icon: "error"
                    })
                })
                
            }else if(result.isDenied){
                Swal.fire({
                    title: "You are not deleting this product",
                    confirmButtonColor: "rgb(231, 150, 0)",
                    icon: "error"
                })
            }
        })
  }
  const imgSaverHandler = async () => {
    try {
        let token = localStorage.getItem('cashier_login');
        let formData = new FormData();
        if(selectImg != null){
            formData.append('images', selectImg);
            formData.append("filename", "")
        }else{
            formData.append("filename", image)
        }
        formData.append("name", nameItem);
        formData.append("description", descriptions);
        formData.append("price", parseInt(price))
        formData.append("type", type)
        formData.append("productsId", props.data.productsId)
        console.log(formData)
        let res = await Axios.patch(API_URL + '/products', formData, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        if(res.data.success){
            console.log(res.data)
            props.getData();
            alert(res.data.message);
            setEdit(false)
        }
    } catch (error) {
        console.log(error)
        setEdit(false)
    }
}
  return (
    <tr style={{ marginBottom: "10px" }}>
        {console.log(props.data.picture)}
        {console.log(image)}
      {editMode ? (
        <>
         <td><input type="file" onChange={e => setSelectImg(e.target.files[0])}/></td>
            <td><input type="text" value={nameItem} onChange={e => setNameItem(e.target.value)}/></td>
            <td><input type="text" value={descriptions} onChange={e=> setDesc(e.target.value)}/></td>
            <td><input type="text" value={price} onChange={e=> setPrice(e.target.value)}/></td>
            <td><input type="text" value={type} onChange={e=> setType(e.target.value)}/></td>
          <td>
            <button className="btn btn-success text-white" onClick={imgSaverHandler}>Save</button>
          </td>
          <td>
            <button className="btn btn-outline-dark" onClick={editModeFalse}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          {" "}
          <td>
            <img
              src={images()}
              style={{ height: "100px", width: "100px", objectFit: "cover" }}
            />
          </td>
          <td style={{ fontSize: "20px", fontWeight: "600" }}>
            {props.data.name}{" "}
          </td>
          <td>{props.data.description}</td>
          <td>
            {props.data.price.toLocaleString("id", {
              style: "currency",
              currency: "IDR",
            })}
          </td>
          <td>{props.data.type}</td>
          <td>
            <button
              className="btn btn-warning text-white"
              onClick={editModeTrue}
            >
              Edit
            </button>
          </td>
          <td>
            <button className="btn btn-outline-danger " onClick={deleteHandler}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default ProductsAdmin;
