import GtTokenAbi from './GoveranceToken.json'
import UtTokenAbi from './UtilizeToken.json'
import YourCollectibleAbi from './YourCollectible.json'

export const gt_token = {
  address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  abi: GtTokenAbi.abi
}

export const ut_token = {
  address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  abi: UtTokenAbi.abi
}

export const post_contract = {
  // v2:
  address: '0x8613E3DAB26E9Cf1a935966f9aDd88682cB74133',
  // address: '0x261C1Fd5ac9DE6D041daAE671E2C84FE6874a52E',
  abi: YourCollectibleAbi.abi
}