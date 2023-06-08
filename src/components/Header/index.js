import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill, BsArrowBarRight} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-website-logo"
        />
      </Link>
      <ul className="mobile-list-items-container">
        <Link to="/">
          <li className="nav-item">
            <AiFillHome className="icons" />
          </li>
        </Link>
        <Link to="/jobs">
          <li className="nav-item">
            <BsFillBriefcaseFill className="icons" />
          </li>
        </Link>
        <li className="nav-item">
          <BsArrowBarRight className="icons" onClick={onClickLogoutButton} />
        </li>
      </ul>
      <ul className="desktop-items-container">
        <Link to="/" className="nav-link">
          <li className="desktop-item">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="desktop-item">Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
