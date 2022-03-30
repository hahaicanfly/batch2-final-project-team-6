import { Form, Input, Button } from 'antd';
import {
  useProvider,
  useContract,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from "wagmi";
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
// Contract
import { post_contract } from '../../config/contract'
// IPFS
import { create } from 'ipfs-http-client'
// Component
import { Header } from '../Header'

const ipfs = create('https://ipfs.infura.io:5001/api/v0');

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const CreatePost = () => {
  const provider = useProvider()
  const [form] = Form.useForm();

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const onReset = () => {
    form.resetFields();
  };

  const [{ }, postThread] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
      signerOrProvider: provider,
    },
    "postThread"
  );

  const [{ }, wait] = useWaitForTransaction({
    hash: ''
  })

  const onFinish = async ({ title, description }) => {
    console.log(title, description);

    let today = new Date()
    today = today.toISOString().split('T')[0]
    console.log(today)

    const item = JSON.stringify({
      name: 'Article',
      image: [
        {
          authorName: "henry",
          content: description,
          timeStamp: today,
          cover: "https://austingriffith.com/images/paintings/fish.jpg",
        },
      ]
    })

    // 上傳至 IPFS
    const uploaded = await ipfs.add(item)
    console.error('已上傳IPFS: ', uploaded)

    // 給 postThread 的參數
    let bytes32First = ethers.utils.formatBytes32String(uploaded.path.substring(0, 22));
    let bytes32Sec = ethers.utils.formatBytes32String(uploaded.path.substring(22));

    // 呼叫智能合約
    const { data, error } = await postThread({
      args: [bytes32First, bytes32Sec],
      overrides: {
        gasLimit: 203000,
        gasPrice: 60000000000,
      },
    })

    console.log(data)
    const hash = data.hash

    if (hash) {
      Swal.fire({
        icon: 'info',
        title: '成功送出交易...',
        text: `https://rinkeby.etherscan.io/tx/${hash}`,
      })
    }

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '發生錯誤',
        text: `${error.reason || error.message}`,
      })
    }

  };

  return (
    <div className="create-post">
      <Header />
      <div className="container">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="文章標題"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="文章內容"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <button className="btn btn-border" type="submit">
              送出
            </button>
            <button className="btn btn-border" onClick={onReset}>
              重置
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

}


export default CreatePost