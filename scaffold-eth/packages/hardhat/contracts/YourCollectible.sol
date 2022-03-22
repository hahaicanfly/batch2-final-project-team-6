pragma solidity >=0.6.0 <0.7.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
//learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract YourCollectible is ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct Thread {
    bytes32 tokenId;
    bytes32 tokenId2;
    uint256 editCount;
    address author;
    uint256 good;
    uint256 suspect;
  }

  mapping(uint256 => Thread) public allThread;
  mapping(address => bool) public whiteList;

  constructor() public ERC721("YourCollectible", "YCB") {
    _setBaseURI("https://ipfs.io/ipfs/");
    // for(uint256 i=0;i<assetsForSale.length;i++){
    //   //forSale[assetsForSale[i]] = true;

    //   _tokenIds.increment();
    //   uint256 id = _tokenIds.current();
    //   allThread[id] = Thread(
    //     assetsForSale[i],
    //     assetsForSale2[i],
    //     0,
    //     msg.sender,
    //     0,
    //     0
    //   );
    // }
  }

  //this marks an item in IPFS as "forsale"
  mapping (bytes32 => bool) public forSale;
  //this lets you look up a token by the uri (assuming there is only one of each uri for now)
  mapping (bytes32 => uint256) public uriToTokenId;

  // function mintItem(string memory tokenURI)
  //     public
  //     returns (uint256)
  // {
  //     bytes32 uriHash = keccak256(abi.encodePacked(tokenURI));

  //     //make sure they are only minting something that is marked "forsale"
  //     require(forSale[uriHash],"NOT FOR SALE");
  //     forSale[uriHash]=false;

  //     _tokenIds.increment();

  //     uint256 id = _tokenIds.current();
  //     _mint(msg.sender, id);
  //     _setTokenURI(id, tokenURI);

  //     uriToTokenId[uriHash] = id;

  //     return id;
  // }

    function postThread(bytes32 ipfsHash, bytes32 ipfsHash2)
      public
      returns (uint256)
  {
      _tokenIds.increment();
      uint256 id = _tokenIds.current();
      allThread[id] = Thread(
        ipfsHash,
        ipfsHash2,
        0,
        msg.sender,
        0,
        0
      );
      return id;
  }

    function getThreadById(uint256 threadId)
      public view 
      returns (string memory )
  {
      string memory id = string(abi.encodePacked(allThread[threadId].tokenId));
      string memory id2 = string(abi.encodePacked(allThread[threadId].tokenId2));
      return string(abi.encodePacked(id,id2));
  }

    function getThreadOwner(uint256 threadId)
      public view 
      returns (address)
  {
      return allThread[threadId].author;
  }

    function getTotalThreadCount()
      public view 
      returns (uint256)
  {
      return _tokenIds.current();
  }

    function giveThreadOneGood(uint256 threadId)
      public threadExist(threadId)
  {
      allThread[threadId].good += 1;
  }

    function getThreadGoodCount(uint256 threadId) 
      public view threadExist(threadId)
      returns (uint256)
  {
      return allThread[threadId].good;
  }

    modifier threadExist(uint256 threadId) {
      require(threadId <= _tokenIds.current(),"Input threadId not found!");
      _;
    }

}
