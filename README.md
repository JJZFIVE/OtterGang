# OtterGang

***About:*** OtterGang is an NFT marketplace where users play an on-chain game of rock-paper-scissors "against an Otter" to earn OtterToken, after which they can use the tokens to purchase NFTs of otters from the marketplace. An otter NFT must sold initially for OtterTokens, after which the owner can resell it for Polygon's native token, Matic, to potentially turn a profit. The smart contracts are deployed on the Polygon Mainnet blockchain. The rock-paper-scissors game executes a function on the smart contract that takes your decision, generates a pseudo-random number representing the opposing otter's decision, and returns boolean if you won or lost. Why otters? Well, why not?


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
