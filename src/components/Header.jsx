import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {/* Brand logo */}
        <Link className="navbar-brand" to="/">
          CRUD
        </Link>

        {/* Navbar toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
            {/* Home link */}
            <li className="nav-item">
              <NavLink className="nav-link"  to="/">
                Home
              </NavLink>
            </li>

            {/* User link */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/user">
                User
              </NavLink>
            </li>

            {/* Add User link */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-user">
                Add User
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
