import React from 'react'
import { useNavigate } from 'react-router'
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {

    // const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [username, setUsername] = useState(user?.username || "");
    const [skills, setSkills] = useState(user?.skills || []);
    const [gender, setGender] = useState(user?.gender || "");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSaveChanges = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const resp = await axios.patch("/api/profile/edit", {
                firstName,
                lastName,
                age,
                about,
                photoUrl,
                username,
                skills,
            }, {
                withCredentials: true
            });
            dispatch(addUser(resp.data));
        } catch (err) {
            setError(err?.response?.data || {});
            console.error(err);
            alert(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 items-start gap-8 px-4 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
            <div className="w-full">
                <div className="card w-full bg-base-300 shadow-sm">
                    <div className="card-body gap-6">
                        <div>
                            <h2 className="card-title text-2xl">Update Profile</h2>
                            <p className="text-sm text-base-content/60">Keep your details current for better connections.</p>
                        </div>
                        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => { handleSaveChanges(); }}>
                            <label className="fieldset">
                                <span className="fieldset-legend">First name</span>
                                <input type="text" className="input w-full" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label className="fieldset">
                                <span className="fieldset-legend">Last name</span>
                                <input type="text" className="input w-full" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </label>
                            <label className="fieldset">
                                <span className="fieldset-legend">Username</span>
                                <input type="text" className="input w-full" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                            <label className="fieldset">
                                <span className="fieldset-legend">Age</span>
                                <input type="number" min="18" className="input w-full" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                            </label>
                            <label className="fieldset">
                                <span className="fieldset-legend">Gender</span>
                                <input type="text" className="input w-full" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </label>
                            <label className="fieldset">
                                <span className="fieldset-legend">Skills</span>
                                <input type="text" className="input w-full" placeholder="" value={skills.join(",")} onChange={(e) => setSkills(e.target.value.split(",").map((skill) => skill.trim()))} />
                                <span className="label text-base-content/60">
                                    Separate skills with commas.
                                </span>
                            </label>
                            <label className="fieldset sm:col-span-2">
                                <span className="fieldset-legend">Profile photo URL</span>
                                <input type="url" className="input w-full" placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                            </label>
                            <label className="fieldset sm:col-span-2">
                                <span className="fieldset-legend">About you</span>
                                <textarea className="textarea min-h-20 w-full" placeholder="Tell people a little about yourself" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </label>
                            <div className="card-actions mt-2 sm:col-span-2">
                                <button className="btn btn-primary w-full sm:w-auto" type="submit" disabled={loading}>
                                    {loading && <span className="loading loading-spinner loading-sm"></span>}
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, skills, photoUrl, about, editprofile : true }} />
        </div>
    )
}

export default EditProfile