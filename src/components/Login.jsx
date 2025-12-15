import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, SetError] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleLogin = async () => {
        try {
            const resp = await axios.post("/api/login",
                {
                    email, password
                }, {
                withCredentials: true
            }
            )
            console.log(resp);
            console.log(resp.data.data);
            dispatch(addUser(resp.data.data));
            return navigate("/feed")
        } catch (err) {
            SetError(err)
            console.log(err);
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body items-center">
                    <h2 className="card-title">Login</h2>
                    <div className="w-[90%]">
                        <fieldset className="fieldset my-5">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="text" className="input" placeholder="Email..." value={email} onChange={onChangeEmail} />
                            {error?.response?.data?.field === "email" && <p className="label"> {error?.response?.data?.message}</p> || ""}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input" placeholder="Password..." value={password} onChange={onChangePassword} />
                            {error?.response?.data?.field === "password" && <p className="label"> {error?.response?.data?.message}</p> || ""}
                        </fieldset>
                    </div>
                    <p>New User <a className="link link-primary">Sign Up Here !!!</a></p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login