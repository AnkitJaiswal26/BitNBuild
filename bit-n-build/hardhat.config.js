require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.17",
		settings: { optimizer: { enabled: true, runs: 200 } },
	},
	paths: {
		artifacts: "./src/artifacts",
	},
	networks: {
		hardhat: {
			chainId: 1337,
		},
		polygon_mumbai: {
			url: `https://polygon-mumbai.g.alchemy.com/v2/VU5Z6_VJgdMUgrcfhGsHk2o5tzEfFbhT`,
			accounts: [
				"0x7a62aa11fa06bc5f21ef8819674ce87876b678f7e288b9c8347fdd3eff7faf89",
			],
			allowUnlimitedContractSize: true,
		},
	},
};
