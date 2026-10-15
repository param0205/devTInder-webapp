import axios from "axios";
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, SetError] = useState({});
    const [loading,setloading] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    useEffect(() => {
        const errorField = error?.response?.data?.field;
        if (errorField === "email") {
            emailRef.current.focus();
        } else if (errorField === "password") {
            passwordRef.current.focus();
        }
    }, [error])
    const handleLogin = async () => {
        if(loading) return;
        setloading(true);
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
            alert(err?.response?.data?.message || "Something went wrong");
            console.log(err);
        }finally{
            setloading(false);
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
                            <input ref={emailRef} type="text" className="input" placeholder="Email..." value={email} onChange={onChangeEmail} />
                            {error?.response?.data?.field === "email" && <p className="text-red-500"> {error?.response?.data?.message}</p> || ""}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input ref={passwordRef} type="password" className="input" placeholder="Password..." value={password} onChange={onChangePassword} />
                            {error?.response?.data?.field === "password" && <p className="text-red-500"> {error?.response?.data?.message}</p> || ""}
                        </fieldset>
                    </div>
                    <p>New User? <a className="link link-primary" onClick={() => navigate("/signUp")}>Sign Up Here !!!</a></p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={handleLogin}>
                            {loading && <span className="loading loading-spinner loading-sm"></span>}
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login