import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="nav">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="nav__search"
            type="text" 
            placeholder="Search posts"
            id="search"
          />
        </form>
        <ul aria-expanded="false" className="nav__list">
          <li className="list-item">
            <Link className="nav__link" to="/">Home</Link>
          </li>
          <li className="list-item">
            <Link className="nav__link" to="/post">New Post</Link>
          </li>
        </ul>
    </nav>
  )
}

export default Nav
