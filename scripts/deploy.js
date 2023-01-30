const hre = require("hardhat");

async function main() {
	const SafeBuy = await hre.ethers.getContractFactory("SafeBuy");
	const safeBuy = await SafeBuy.deploy();

	await safeBuy.deployed();

	console.log(`Contract deployed to ${safeBuy.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
