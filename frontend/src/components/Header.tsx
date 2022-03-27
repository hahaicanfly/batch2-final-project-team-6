import '../assets/style/header.scss'

import Logo from '../assets/images/TrustNews-logos.png'

export const Header = () => {
  return (
    <header className="nav">
      <div className="nav-left">
        <img className="img-fluid" src={Logo} alt="" />
        TRUSHNEWS
      </div>

      <div className="nav-right">
        <button className="btn">發表文章</button>
        <button className="btn btn-border">連接錢包</button>
      </div>
    </header>
  )
}