# SafeBuys
## A secure & efficient solution for Product Counterfeiting
Product Counterfeiting is a major problem where fake and unauthorized replicas of real products are created and sold at cheaper prices and degraded quality.
Items such as Electronics, pharmaceuticals, shoes, etc are big victims of counterfeiting.
To tackle this problem, We created this application where product manufacturers (eg. Dell, boAt, Cipla, etc) can register themselves on the platform and can generate digital codes in terms of QR Codes and put them on the product themselves which can be used to validate the authenticity of the product.

But the problem with QR Codes is that they can be forged. An authentic QR Code can be copied and pasted on a fake product. To solve this problem, when a manufacturer generates a new digital code, they will get 2 QR Codes. One will be a public QR Code and another a private QR Code. This is similar to the concepts of public and private keys.
The public QR code can be displayed on the surface of the product where it can be easily scanned by anyone and will be used to verify the authenticity of the product. Whereas the private QR code will be placed inside the packaging of the product. For someone to be able to reach the private QR they would need to open the packaging and could be done only when someone has purchased the product. 
Scanning the private QR will represent that the product is purchased and now cannot be copied. So even if someone tries to use the same pair of public and private QRs, it won’t be valid.


## 👩‍💻 Team members

- **Ravi Maurya**
- **Nikheel Indanoor**
- **Ankit Jaiswal**
- **Atharva Patil**


## Problems with the current system

- Counterfeiting of products. 
- Managing physical guarantee and warranty cards take a lot of work.
- Selling of refurbished products as new products when defected products are returned back.

## How we aim to solve these problems

- Use of blockchain to maintain integrity and for authentication.
- Use of IPFS storage to store all the documents digitally on a decentralized network.
- Automation of the verification system using QR code.
- Tracking the products using dynamic NFTs.
- Use of polygon network for faster and cheaper transactions.
- Biconomy for gasless transactions.

## Architecture
![Frame 10](https://user-images.githubusercontent.com/59064326/215404635-9ac7fcfd-a8b4-4f0e-aa41-46394854354a.png)


## Features
- Dynamic NFTs
- Gasless Transactions
- QR Code Verification
- IPFS Storage
- Generating Stats

## Tech Stack
- React
- Solidity
- Polygon MATIC
- Biconomy
- IPFS

## Future Scope
- Push protocol to implement Push notifications.
- Mobile Application for students.
- SocialAuth using Biconomy.
- Logistics tracking using dynamic NFT.
- Generating stats.
