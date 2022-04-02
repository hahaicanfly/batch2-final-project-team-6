import GtTokenAbi from '../../../scaffold-eth/packages/hardhat/artifacts/contracts/GT.sol/GoveranceToken.json'
import UtTokenAbi from '../../../scaffold-eth/packages/hardhat/artifacts/contracts/UT.sol/UtilizeToken.json'
import YourCollectibleAbi from '../../../scaffold-eth/packages/hardhat/artifacts/contracts/YourCollectible.sol/YourCollectible.json'

export const gt_token = {
  address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  abi: GtTokenAbi.abi
}

export const ut_token = {
  address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  abi: UtTokenAbi.abi
}

export const post_contract = {
  address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  abi: YourCollectibleAbi.abi
}