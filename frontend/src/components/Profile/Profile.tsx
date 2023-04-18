import useProfileContext from "../../hooks/useProfileContext"

const Profile = () => {
  const { handleLogOut, user } = useProfileContext()

  return (
    <div className="profile">
      <h1>Hello, {user.username}</h1>
      <button
        type="button"
        onClick={handleLogOut}
      >LogOut</button>
    </div>
  )
}

export default Profile
