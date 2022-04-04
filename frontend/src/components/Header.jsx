// Utils
import { Menu, Dropdown, Button } from 'antd';
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useProvider, useAccount, useContractRead } from 'wagmi'
// Components
import { ConnectWallet } from '.'
import { gt_token_contract, ut_token_contract } from '../config/contract'
import { handleError } from '../config/handle-error'
// Assets
import '../assets/style/header.scss'
import Logo from '../assets/images/TrustNews-logos.png'

export const Header = () => {
  const provider = useProvider()
  const location = useLocation();
  // Connected account details
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const [gtBalance, setGtBalance] = useState(0)
  const [utBalance, setUtBalance] = useState(0)

  // 取得 GT Token 餘額
  const [{ }, getGtBalanceOf] = useContractRead(
    {
      addressOrName: gt_token_contract.address,
      contractInterface: gt_token_contract.abi,
      signerOrProvider: provider,
    },
    'balanceOf',
  )

  // 取得 UT Token 餘額
  const [{ }, getUtBalanceOf] = useContractRead(
    {
      addressOrName: ut_token_contract.address,
      contractInterface: ut_token_contract.abi,
      signerOrProvider: provider,
    },
    'balanceOf',
  )

  const menu = (
    <Menu>
      <Menu.Item>
        {accountData?.address}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          GT幣 {gtBalance} 顆
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
          UT幣 {utBalance} 顆
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="/posts">
          文章列表
        </Link>
      </Menu.Item>
      {
        location.pathname === '/posts' && (
          <Menu.Item>
            <Link to="/post/create">
              發表文章
            </Link>
          </Menu.Item>
        )
      }
      <Menu.Item>
        <div
          onClick={disconnect}>
          登出
        </div>
      </Menu.Item>
    </Menu>
  );

  const getGtBalance = async () => {
    try {
      const { data, error } = await getGtBalanceOf({
        args: [accountData?.address]
      })

      console.log('[GT]', data)

      if (error) {
        handleError(error)
        return
      }

      const balance = parseInt(data._hex)
      setGtBalance(balance)
    } catch (error) {
      console.error(error)
    }
  }

  const getUtBalance = async () => {
    try {
      const { data, error } = await getUtBalanceOf({
        args: [accountData?.address]
      })

      if (error) {
        handleError(error)
        return
      }

      console.log('[UT]', data)

      const balance = parseInt(data._hex)
      setUtBalance(balance)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getGtBalance()
    getUtBalance()
  }, [accountData?.address])


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
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
              >
                <button className="btn btn-border">
                  {accountData?.address.substring(0, 15)}...
                </button>
              </Dropdown>
            </div>
        }
      </div>
    </header>
  )
}