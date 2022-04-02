// Utils
import { Link } from "react-router-dom";
import { useAccount, useBalance } from 'wagmi'
// Components
import { ConnectWallet } from '.'
// Assets
import '../assets/style/header.scss'
import Logo from '../assets/images/TrustNews-logos.png'

export const Header = () => {
  // Connected account details
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  // Fetching balance information
  const [{ data: getBalance }] = useBalance({
    addressOrName: accountData?.address,
  });

  return (
    <header className="nav">
      <Link className="nav-left" to="/">
        <img className="img-fluid" src={Logo} alt="" />
        <span>
          TRUSTNEWS
        </span>
      </Link>

      <div className="nav-right">
        {
          !accountData?.address ?
            <ConnectWallet /> :
            <div>
              {/* <button className="btn">
                <Link to="/post/create">
                  發表文章
                </Link>
              </button> */}
              {/* <button className="btn">
                <Link to="/posts">
                  文章列表
                </Link>
              </button> */}
              <div>
                <button className="btn btn-border">
                  {accountData?.address}
                  {/* Balance: {`${Number(getBalance?.formatted)} ETH`} */}
                </button>
                <button
                  className="btn btn-border"
                  onClick={disconnect}>
                  登出
                </button>

              </div>
            </div>
        }
      </div>
    </header>
  )
}