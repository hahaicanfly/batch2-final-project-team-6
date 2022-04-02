// IPFS
const ipfsAPI = require("ipfs-http-client");
export const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

const BufferList = require('bl/BufferList')

/**
  * 將取得的 Hash 轉化成 JSON 物件型態
  * @date 2022-03-30
  * @param {String} hash 放入16位元的 hash
  * @returns {Obbject} content 回傳物件
  */
export const getFromIPFS = async (hash) => {
  for await (const file of ipfs.get(hash)) {

    if (!file.content) continue;
    const content = new BufferList()
    for await (const chunk of file.content) {
      content.append(chunk)
    }

    return content
  }
}