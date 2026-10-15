import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router"
import { useEffect } from "react"
import axios from "axios"
import { addFeed } from "../utils/feedStore";
import UserCard from "./UserCard"

const Feed = () => {
   const user = useSelector((store) => store.user);
   const feed = useSelector((store) => store.feed);
   const dispatch = useDispatch();
   const getFeed = async () => {
      try {
         if (feed !== null) return;
         const UserFeed = await axios.get("/api/feed", { withCredentials: true })
         console.log(UserFeed);
         dispatch(addFeed(UserFeed.data.userFeed ?? []));
      } catch (err) {
         console.log(err)
      }
   }
   useEffect(() => {
      getFeed()
   }, [])

   if (!user) {
      return <Navigate to="/login" replace />
   }
   if (feed === null) {
      return (
         <div className="flex justify-center my-10">
            <div className="card card-sm bg-base-300 max-w-70 shadow">
               <div className="card-body">
                  <p>Loading feed...</p>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div>
         <UserCard user={feed[0]} />
      </div>
   )
}

export default Feed