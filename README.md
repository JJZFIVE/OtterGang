# OtterGang

***About:*** OtterGang is an NFT marketplace where users play an on-chain game of rock-paper-scissors "against an Otter" to earn OtterToken, after which they can use the tokens to purchase NFTs of otters from the marketplace. An otter NFT must be sold initially for OtterTokens, after which the owner can resell it for Polygon's native token, Matic, to potentially turn a profit. The smart contracts are deployed on the Polygon Mainnet blockchain. The rock-paper-scissors game executes a function on the smart contract that takes your decision, generates a pseudo-random number representing the opposing otter's decision, and returns boolean if you won or lost. Why otters? Well, why not?


For OtterGang, I leaned on my previous experience building [FreeToken](https://github.com/JJZFIVE/FreeToken) and learned the following: NextJS page routing, uploading data on [IPFS](https://ipfs.io/), having multiple smart contracts interact with one another, and ERC721s (NFT token standard).


## Technologies Used

### Frontend
- NextJS
- TailwindCSS
- Axios
- Ethers.js


### Backend
- Solidity
- Hardhat
- Remix (remix.ethereum.org)
- IPFS (decentralized data storage for NFT metadata and image)
- Infura
- Polygon

## Images

<img width="1512" alt="Home" src="https://user-images.githubusercontent.com/23621657/194156036-c445484b-5327-4c06-9b87-cb96f3bf6c03.png">
<img width="1510" alt="Play" src="https://user-images.githubusercontent.com/23621657/194156034-d56e491e-270b-4872-9124-e59c0b9aa58e.png">
<img width="1512" alt="About" src="https://user-images.githubusercontent.com/23621657/194156006-13e25fe0-166f-4729-ba72-cb477bbc1653.png">
### As of September 2022, the Ethereum network underwent an upgrade to ETH 2.0, which wiped my smart contracts off of the test networks. So, the Marketplace and My Items tabs do not work anymore, and I don't have pictures of those pages before the upgrade.

