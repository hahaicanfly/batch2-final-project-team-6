import { Header } from '../../components'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import {
  useProvider,
  useContractRead,
  useContractWrite
} from "wagmi";
// IPFS
import { create } from 'ipfs-http-client'
// Contract
import { post_contract } from '../../config/contract'
const ipfs = create('https://ipfs.infura.io:5001/api/v0');
const { BufferList } = require("bl");

export const PostList = () => {
  const provider = useProvider()
  const postList = [
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
    { title: '文章', description: '這是文章描述描述描述' },
  ]

  const [{ }, getTotalThreadCount] = useContractRead(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
      signerOrProvider: provider,
    },
    'getTotalThreadCount',
  )
  const [{ }, getThreadById] = useContractRead(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
      signerOrProvider: provider,
    },
    'getThreadById',
  )

  const [{ }, getThreadOwner] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
      signerOrProvider: provider,
    },
    "getThreadOwner"
  );

  const [{ }, getThreadGoodCount] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
      signerOrProvider: provider,
    },
    "getThreadGoodCount"
  );

  const getFromIPFS = async (hash) => {
    for await (const file of ipfs.get(hash)) {
      console.log(file.path);
      if (!file.content) continue;
      const content = new BufferList();
      for await (const chunk of file.content) {
        content.append(chunk);
      }
      console.log(content);
      return content;
    }
  }

  const getPostList = async () => {

    const { data, error } = await getTotalThreadCount()
    const countNumber = parseInt(data._hex)

    const assets = [];

    for (let i = 1; i < countNumber + 1; i++) {
      const { data: threadRaw } = await getThreadById({ args: [i] });
      const ipfsHash = threadRaw.replace(/[^A-Za-z 0-9]\.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");
      const jsonManifestBuffer = await getFromIPFS(ipfsHash);
      const jsonManifest = JSON.parse(jsonManifestBuffer);
      console.error('jsonManifest', jsonManifest)

      let owner = await getThreadOwner({ args: [i] })
      let count = await getThreadGoodCount({ args: [i] })
      assets[ipfsHash] = {
        ...jsonManifest,
        owner,
        threadId: i,
        good: parseInt(count)
      };
      console.log('owner', owner)
      console.log('count', count)

      // let owner = await YourCollectible.getThreadOwner(i);
      // let count = await YourCollectible.getThreadGoodCount(i);
      // assets[ipfsHash] = { ...jsonManifest, owner, threadId: i, good: count.toNumber() };

      // let owner = await readContracts.YourCollectible.getThreadOwner(i);
      // let count = await readContracts.YourCollectible.getThreadGoodCount(i);
      // assets[ipfsHash] = { ...jsonManifest, owner, threadId: i, good: count.toNumber() };
    }

    // if (error) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '發生錯誤',
    //     text: `${error.reason || error.message}`,
    //   })
    // }
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
                  <button className="btn btn-border" onClick={getPostList}>
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