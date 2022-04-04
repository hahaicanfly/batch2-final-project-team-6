//SPDX-License-Identifier: MIT
pragma solidity >=0.7.6;

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4-solc-0.7/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4-solc-0.7/contracts/utils/Counters.sol";

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

    struct UserProfile {
        bytes32 profileJSON;
        bytes32 profileJSON2;
        bytes32 nickName;
        uint256[] threads;
    }

    mapping(uint256 => Thread) public allThread;
    mapping(address => bool) public whiteList;
    mapping(address => UserProfile) public userProfiles;

    event GiveGood(address sender, uint256 threadId);
    event CreatePost(address poster, uint256 id);

    constructor() ERC721("YourCollectible", "YCB") {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    //this marks an item in IPFS as "forsale"
    mapping(bytes32 => bool) public forSale;
    //this lets you look up a token by the uri (assuming there is only one of each uri for now)
    mapping(bytes32 => uint256) public uriToTokenId;

    function postThread(bytes32 ipfsHash, bytes32 ipfsHash2)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        allThread[id] = Thread(ipfsHash, ipfsHash2, 0, msg.sender, 0, 0);

        emit CreatePost(msg.sender, id);
        return id;
    }

    function getThreadById(uint256 threadId)
        public
        view
        returns (string memory)
    {
        string memory id = string(
            abi.encodePacked(allThread[threadId].tokenId)
        );
        string memory id2 = string(
            abi.encodePacked(allThread[threadId].tokenId2)
        );
        return string(abi.encodePacked(id, id2));
    }

    function getThreadOwner(uint256 threadId) public view returns (address) {
        return allThread[threadId].author;
    }

    function getTotalThreadCount() public view returns (uint256) {
        return _tokenIds.current();
    }

    function giveThreadOneGood(uint256 threadId) public threadExist(threadId) {
        allThread[threadId].good += 1;
        GiveGood(msg.sender, threadId);
    }

    function getThreadGoodCount(uint256 threadId)
        public
        view
        threadExist(threadId)
        returns (uint256)
    {
        return allThread[threadId].good;
    }

    modifier threadExist(uint256 threadId) {
        require(threadId <= _tokenIds.current(), "Input threadId not found!");
        _;
    }
}
