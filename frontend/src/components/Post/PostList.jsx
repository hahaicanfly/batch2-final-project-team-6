import { Header } from '../../components'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import {
  useContractRead,
} from "wagmi";
// Contract
import { post_contract } from '../../config/contract'

export const PostList = () => {
  const postList = [
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
  ]
  const contract = new ethers.Contract(post_contract.address, post_contract.abi)
  const [{ data, error, loading }, getTotalThreadCount] = useContractRead(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
    },
    'getHunger',
  )

  const test = async () => {
    // Ether
    // let currentValue = await contract.getTotalThreadCount();
    // console.log(currentValue)
    const result = await getTotalThreadCount()
    console.log(result)
  }
  // const count = await readContracts.YourCollectible.getTotalThreadCount();
  // const countNumber = count.toNumber();


  return (
    <>
      <Header />
      <div className="post-list">
        <div className="container">
          {
            postList.map((post, index) => (
              <div className="box post" key={index}>
                <div className="post-info">
                  <h2 className="linear-text">
                    {post.title}{index}
                  </h2>
                  <span>
                    {post.description}
                  </span>
                </div>
                <div className="post-btn">
                  <button className="btn btn-border" onClick={test}>
                    閱讀
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}