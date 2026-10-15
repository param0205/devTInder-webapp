import EditProfile from "./EditProfile"
import UserCard from "./UserCard"
import { useSelector } from "react-redux"

const Profile = ()=>{
    const user = useSelector((store) => store.user);
    return (
        <div>
        {/* <div className="mx-auto grid w-full max-w-3xl grid-cols-1 items-start gap-8 px-4 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]"> */}
            <EditProfile user={user} />
            {/* <UserCard user={user}/> */}
        </div>
    )
}

export default Profile