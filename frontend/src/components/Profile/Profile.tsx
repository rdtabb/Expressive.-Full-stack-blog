import useProfileContext from "../../hooks/useProfileContext"
import Feed from "./Feed/Feed"

const Profile = () => {
  const { handleLogOut, user } = useProfileContext()

  return (
    <div className="profile">
      <h1>Hello, {user.username}</h1>
      <button
        type="button"
        onClick={handleLogOut}
      >LogOut</button>
      <Feed />
    </div>
  )
}

export default Profile
