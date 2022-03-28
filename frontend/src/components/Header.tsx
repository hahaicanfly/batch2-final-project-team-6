// Utils
import { Link } from "react-router-dom";
import { useConnect, useAccount } from 'wagmi'
// Components
import { ConnectWallet } from '../components'
// Assets
import '../assets/style/header.scss'
import Logo from '../assets/images/TrustNews-logos.png'

export const Header = () => {
  const [{ data: accountData, loading }, disconnect] = useAccount({
    fetchEns: true,
  })

  return (
    <header className="nav">
      <Link className="nav-left" to="/">
        <img className="img-fluid" src={Logo} alt="" />
        <span>
          TRUSHNEWS
        </span>
      </Link>

      <div className="nav-right">
        {
          !accountData?.address ?
            <ConnectWallet /> :
            <div>
              <button className="btn">
                <Link to="/post/create">
                  發表文章
                </Link>
              </button>
              <button className="btn">
                <Link to="/posts">
                  文章列表
                </Link>
              </button>
              <button className="btn btn-border">
                {accountData?.address}
              </button>
              <button
                className="btn btn-border"
                onClick={disconnect}>
                登出
              </button>
            </div>
        }
      </div>
    </header>
  )
}