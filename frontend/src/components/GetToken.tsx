import {
  useProvider,
  useContract,
  useContractRead,
  useContractWrite,
} from "wagmi";

import { gt_token, ut_token, post_contract } from '../config/contract'

export const GetToken = () => {
  const provider = useProvider()

  const [{ data, error, loading }, getThreadOwner] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
    },
    'getThreadOwner',
  )
  const [{ }, getTotalThreadCount] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
    },
    'getTotalThreadCount',
  )

  const getOwner = async () => {
    console.log(12312)
    const result = await getThreadOwner({
      args: [1],
    })
    console.log('result', result)
  }

  const getTotalCount = async () => {
    const result = await getTotalThreadCount()
    console.log(result)
  }

  return (
    <section className="section3">
      <div className="container">
        <div className="info flex-justify flex-column">
          <div className="title linear-text">合約測試</div>
        </div>

        <div className="btn-list">

          <button
            className="btn btn-border"
            onClick={getOwner}>
            Get Thread Owner
          </button>
          <button
            className="btn btn-border"
            onClick={getTotalCount}>
            get Total Thread Count
          </button>

        </div>
      </div>
    </section>
  )
}