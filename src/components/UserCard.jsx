import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedStore";

const UserCard = ({ user }) => {
    return (
        <div className="flex w-full justify-center mt-5">
            <div className="card card-sm w-full max-w-80 bg-base-300 shadow">
                <figure className="">
                    <img src={user.photoUrl} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title flex justify-between text-lg">
                        {user.firstName + "  " + user.lastName}
                        <span className="font-normal">{user.age}, {user.gender}</span>
                    </h2>
                    <div className="mt-2">
                        <h3 className="font-semibold text-sm">Bio:</h3>
                        <p>{user.about}</p>
                    </div>
                    {!user.editprofile && (<div className="card-actions grid grid-cols-2 gap-3 pt-3">
                        <button className="btn btn-outline btn-secondary text-base-content" type="button">
                            Ignore
                        </button>
                        <button className="btn btn-primary" type="button">
                            Interested
                        </button>
                    </div>)}
                    {user.skills && (
                        <div className="mt-2">
                            <h2 className="font-semibold text-sm">Skills:</h2>
                            <div className="flex flex-wrap gap-2 p-0">
                                {user.skills.map((skill, index) => (
                                    <button className="skill-chip" key={index} type="button">
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserCard