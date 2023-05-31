import "./Sidebar.css";
import { AiFillHome, AiOutlineOrderedList } from "react-icons/ai";
import { MdRestaurantMenu } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {BsGraphUp} from "react-icons/bs"

const Sidebar = (props) => {
  const navigate = useNavigate();
  const { fullname, role } = useSelector((state) => {
    return {
      fullname: state.userReducer.fullname,
      role: state.userReducer.role,
    };
  });
  return (
    <div>
      {!fullname ? (
        ""
      ) : role === "admin" || role === "superadmin" ? (
        <div className="sidenav shadow" style={{backgroundColor: "white"}}>
          <p
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-placement="right"
            title="Home"
            onClick={() => navigate("/product", { replace: true })}
          >
            <AiOutlineOrderedList size={25} />
          </p>
          <p
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-placement="right"
            title="Menu"
            onClick={() => navigate("/report", { replace: true })}
          >
            <BsGraphUp size={25} />
          </p>
          <p
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-placement="right"
            title="Register Employee"
            onClick={() => navigate("/admin-registration", { replace: true })}
          >
            <IoPersonAddSharp size={25} />
          </p>
        </div>
      ) : (
        <div className="sidenav shadow">
          <p
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-placement="right"
            title="Home"
            onClick={() => navigate("/", { replace: true })}
          >
            <AiFillHome size={25} />
          </p>
          <p
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-placement="right"
            title="Menu"
            onClick={() => navigate("/menu", { replace: true })}
          >
            <MdRestaurantMenu size={25} />
          </p>

        </div>
      )}
    </div>
  );
};

export default Sidebar;
