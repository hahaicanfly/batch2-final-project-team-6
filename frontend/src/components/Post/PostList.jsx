import { Header } from '../../components'
import Swal from 'sweetalert2'
import { ethers, utils } from 'ethers'
import {
  useProvider,
  useAccount,
  useContractRead,
  useContractWrite
} from "wagmi";
import React, { useCallback, useEffect, useState } from "react";
import { handleError } from '../../config/handle-error'
// Contract
import { post_contract } from '../../config/contract'
import { getFromIPFS } from '../../config/ipfs'
// IPFS
// const ipfsAPI = require("ipfs-http-client");
// const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

export const PostList = () => {
  const [loadedAssets, setLoadedAssets] = useState([])

  const provider = useProvider()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const contractConfig = {
    addressOrName: post_contract.address,
    contractInterface: post_contract.abi,
    signerOrProvider: provider,
  }



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
      ...contractConfig
    },
    'getTotalThreadCount',
  )

  const [{ }, getThreadById] = useContractRead(
    {
      ...contractConfig
    },
    'getThreadById',
  )

  const [{ }, getThreadOwner] = useContractWrite(
    {
      ...contractConfig
    },
    "getThreadOwner"
  );

  const [{ }, getThreadGoodCount] = useContractWrite(
    {
      ...contractConfig
    },
    "getThreadGoodCount"
  );

  const [{ }, giveThreadOneGood] = useContractWrite(
    {
      ...contractConfig
    },
    "giveThreadOneGood"
  );




  const getPostList = async () => {
    console.error('[getPostList]')
    try {
      const { data, error } = await getTotalThreadCount()
      const countNumber = parseInt(data._hex) // 5

      const assets = [];

      if (error) handleError(error)

      for (let i = 1; i < countNumber + 1; i++) {
        // 鏈上資料 byte32 不滿 32 個字元會自動補 0
        // 從鏈上抓下來轉成數字會有奇怪的資料，因此要用 replace 取代 0
        const { data: threadRaw } = await getThreadById({ args: [i] });

        const ipfsHash = threadRaw.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");

        const jsonManifestBuffer = await getFromIPFS(ipfsHash);
        const jsonManifest = JSON.parse(jsonManifestBuffer);

        // 取得文章作者
        let owner = await getThreadOwner({ args: [i] })
        // 取得文章按讚次數
        let count = await getThreadGoodCount({ args: [i] })

        // 組合資料
        assets[ipfsHash] = {
          ...jsonManifest,
          owner,
          threadId: i,
          good: parseInt(count)
        };

        const topicList = [];
        for (const a in assets) {
          try {
            topicList.push({ id: a, ...assets[a] });
          } catch (e) {
            console.log(e);
          }
        }

        setLoadedAssets(topicList);
        console.log(loadedAssets)
      }

    } catch (error) {
      handleError({ reason: error })
      Swal.fire({
        icon: 'error',
        title: '發生錯誤',
        text: `${error}`,
      })
    }
  }

  const giveGood = async () => {

  }


  // useEffect(() => {
  // console.log(accountData)
  // getPostList()
  // }, [accountData])


  return (
    <>
      <Header />
      <div className="post-list">
        <div className="container">
          {
            // loadedAssets.length === 0 && !accountData?.address
            //   ? <div>
            //     無資料
            //   </div>
            //   :
            loadedAssets?.map((post, index) => (
              post.image.map((img, i) => (
                <div className="box post" key={index}>
                  <div className="post-info">
                    <h2 className="linear-text">
                      {post.name}
                    </h2>
                    <span>
                      {img.content}
                    </span>
                  </div>
                  <div className="post-btn">
                    <button className="btn btn-border" onClick={getPostList}>
                      閱讀
                    </button>
                    <button onClick={giveGood}>讚</button>
                  </div>
                </div>
              ))
            ))
          }
        </div>
      </div>
    </>
  )
}