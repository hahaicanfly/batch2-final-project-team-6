import { useLocation } from 'react-router-dom';
// Utils
import { Link } from "react-router-dom";
import { useAccount, useBalance } from 'wagmi'
// Components
import { ConnectWallet } from '.'
// Assets
import '../assets/style/header.scss'
import Logo from '../assets/images/TrustNews-logos.png'

export const Header = () => {
  const location = useLocation();
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
                <Link to="/posts">
                  文章列表
                </Link>
              </button> */}
              <div>
                <button className="btn btn-border">
                  <span>
                    {accountData?.address.substring(0, 5)}...
                  </span>
                </button>
                <button
                  className="btn btn-border"
                  onClick={disconnect}>
                  登出
                </button>
                {
                  location.pathname === '/posts'
                    ?
                    <Link to="/post/create">
                      <button className="btn btn-border">
                        發表文章
                      </button>
                    </Link>
                    :
                    <></>
                }

              </div>
            </div>
        }
      </div>
    </header>
  )
}