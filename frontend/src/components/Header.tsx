import '../assets/style/header.scss'

import Logo from '../assets/images/TrustNews-logos.png'
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="nav">
      <Link className="nav-left" to="/">
        <img className="img-fluid" src={Logo} alt="" />
        <span>
          TRUSHNEWS
        </span>
      </Link>

      <div className="nav-right">
        <button className="btn">文章列表</button>
        <button className="btn">發表文章</button>
        <button className="btn btn-border">連接錢包</button>
      </div>
    </header>
  )
}