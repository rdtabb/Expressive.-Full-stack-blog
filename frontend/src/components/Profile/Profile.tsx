import useProfileContext from "../../hooks/useProfileContext"

const Profile = () => {
  const { handleLogOut } = useProfileContext()

  return (
    <div className="profile">
      <h1>Hello!</h1>
      <button
        type="button"
        onClick={handleLogOut}
      >LogOut</button>
    </div>
  )
}

export default Profile
