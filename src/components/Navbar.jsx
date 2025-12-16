import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, Links, useNavigate } from "react-router"
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = async () => {
        try {
            const resp = await axios.post("/api/log", {}, { withCredentials: true })
            console.log(resp);
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.log("Error: " + err);
        }
    }
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl"> DevTinder</Link>
            </div>
            <div className="flex gap-1">
                {user &&
                    <div className="flex">
                        <div className="p-2 mr-2"> Welcome , {user.firstName}</div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online mr-5">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="user-photo"
                                        src={user.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/Profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li><Link onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
