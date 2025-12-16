import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedStore";

const UserCard = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const getFeed = async () => {
        try {
            if (feed) return;
            const UserFeed = await axios.get("/api/feed", { withCredentials: true })
            console.log(UserFeed);
            dispatch(addFeed(UserFeed.data.userFeed));
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFeed()
    }, [])

    return (
        <div className="flex justify-center my-10">
            <div className="card card-sm bg-base-300 max-w-70 shadow">
                <figure className="hover-gallery">
                    <img src={feed[0].photoUrl} />
                    {/* <img src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
                    <img src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
                    <img src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" /> */}
                </figure>
                <div className="card-body">
                    <h2 className="card-title flex justify-between">
                        {feed[0].firstName}
                        <span className="font-normal">$25</span>
                    </h2>
                    <p>{feed[0].about}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard