import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        console.log(e)
        setPassword(e.target.value)
    }
    const handleLogin = async () => {
        try {
            const resp = await axios.post("/api/login",
                {
                    email, password
                }
            )
            console.log(resp.data.data);
            dispatch(addUser(resp.data.data));
            return navigate("/feed")
        }catch (e) {
           console.log("Error : " + e);
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
                            {/* <p className="label">Required</p> */}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input" placeholder="Password..." value={password} onChange={onChangePassword} />
                            {/* <p className="label">Required</p> */}
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