import GtTokenAbi from './GoveranceToken.json'
import UtTokenAbi from './UtilizeToken.json'
import YourCollectibleAbi from './YourCollectible.json'

export const gt_token_contract = {
  address: '0x481c77dbf00d50c83766d72008C2128802788daf',
  abi: GtTokenAbi.abi
}

export const ut_token_contract = {
  address: '0xcFb2631be709ef5F374b5ECaE2718B1fd82184d6',
  abi: UtTokenAbi.abi
}

export const post_contract = {
  // v2:
  address: '0x8613E3DAB26E9Cf1a935966f9aDd88682cB74133',
  // address: '0x261C1Fd5ac9DE6D041daAE671E2C84FE6874a52E',
  abi: YourCollectibleAbi.abi
}