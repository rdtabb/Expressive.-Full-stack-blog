import { Link } from "react-router-dom"
import useUserData from "../../../hooks/useQueryHooks/useUserData/useUserData"
import { useUserDataType } from "../../../hooks/useQueryHooks/useUserData/useUserData"

const Nav = () => {
  const profileData: useUserDataType = useUserData()

  return (
    <nav className="nav">
      {profileData.isLoading ? (<p>Loading...</p>) : (<p>{profileData.data?.username}</p>)}
        <ul aria-expanded="false" className="nav__list">
          <li className="list-item">
            <Link className="nav__link" to="/">Profile</Link>
          </li>
          <li className="list-item">
            <Link className="nav__link" to="/post">New Post</Link>
          </li>
          <li className="list-item">
            <Link className="nav__link" to="/generalfeed/">General feed</Link>
          </li>
        </ul>
    </nav>
  )
}

export default Nav
