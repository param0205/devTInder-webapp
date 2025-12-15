import Navbar from "./Navbar"
import Footer from './Footer'
import { Outlet, useNavigate } from "react-router"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addUser } from "../utils/userSlice"
const Body = () => {

    const userData = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchUser = async () => {
        try {
            if (!userData) return;
            const user = await axios.get("/api/profile/view", {
                withCredentials: true
            })
            console.log(user);
            dispatch(addUser(user.data));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.log("Error:" + err);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body