// Wagmi
import {
  useProvider,
  useContractWrite,
} from "wagmi";
// Contract
import { post_contract } from '../config/contract'
import { ethers } from 'ethers'
// IPFS
const ipfsAPI = require("ipfs-http-client");
const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

/*
  測試合約
*/
export const GetToken = () => {
  const provider = useProvider()

  const [{ }, getThreadOwner] = useContractWrite(
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
  const [{ }, postThread] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
    },
    'postThread',
  )

  const getOwner = async () => {
    const result = await getThreadOwner({
      args: [1],
    })
    console.log('result', result)
  }

  const getTotalCount = async () => {
    const result = await getTotalThreadCount()
    console.log(result)
  }

  // connect to a different API
  const uploadFile = async () => {
    const stringJSON = JSON.stringify({
      name: "article2",
      description: "What is it so worried about?",
      external_url: "https://austingriffith.com/portfolio/paintings/?id=zebra",
      image: [
        {
          authorName: "henry",
          content: "廢文2 測試",
          timeStamp: "2022-02-01",
          cover: "https://austingriffith.com/images/paintings/fish.jpg",
        },
      ],
      attributes: [
        {
          trait_type: "BackgroundColor",
          value: "blue",
        },
        {
          trait_type: "Eyes",
          value: "googly",
        },
        {
          trait_type: "Stamina",
          value: 38,
        },
      ],
    });
    const uploaded = await ipfs.add(stringJSON);
    console.log(uploaded) // https://ipfs.io/ipfs/hash

    let bytes32First = ethers.utils.formatBytes32String(uploaded.path.substring(0, 22));
    let bytes32Sec = ethers.utils.formatBytes32String(uploaded.path.substring(22));
    console.error('bytes32First', bytes32First)
    console.error('bytes32Sec', bytes32Sec)
  };

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
          <button
            className="btn btn-border"
            onClick={uploadFile}>
            upload File
          </button>

        </div>
      </div>
    </section>
  )
}