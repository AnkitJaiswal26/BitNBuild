import safeBuy from "../artifacts/contracts/SafeBuy.sol/SafeBuy.json";
import companyNFT from "../artifacts/contracts/CompanyNFT.sol/CompanyNFT.json";

export const SafeBuyAddress = "0xf46eCD62aD4D452F394c4b78E4C0e9425d43bC19";
export const SafeBuyABI = safeBuy.abi;
export const CompanyNFTABI = companyNFT.abi;

export const ChainId = {
	MAINNET: 1,
	GOERLI: 5,
	POLYGON_MUMBAI: 80001,
	POLYGON_MAINNET: 137,
};

export let activeChainId = ChainId.POLYGON_MUMBAI;
export const supportedChains = [
	ChainId.GOERLI,
	ChainId.POLYGON_MAINNET,
	ChainId.POLYGON_MUMBAI,
];
