import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import {
	activeChainId,
	SafeBuyABI,
	SafeBuyAddress,
	CompanyNFTABI,
} from "./constants";
import SmartAccount from "@biconomy/smart-account";
import { ChainId } from "@biconomy/core-types";
import { useAuth } from "./AuthContext";
import { Web3Storage } from "web3.storage";

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(SafeBuyAddress, SafeBuyABI, signerOrProvider);

const fetchCompanyNFT = (contractAddress, signerOrProvider) =>
	new ethers.Contract(contractAddress, CompanyNFTABI, signerOrProvider);

const options = {
	activeNetworkId: ChainId.POLYGON_MUMBAI,
	supportedNetworksIds: [
		ChainId.GOERLI,
		ChainId.POLYGON_MAINNET,
		ChainId.POLYGON_MUMBAI,
	],
	networkConfig: [
		{
			chainId: ChainId.POLYGON_MUMBAI,
			dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
		},
	],
};

export const SafeBuyContext = React.createContext();

export const useSafeBuyContext = () => useContext(SafeBuyContext);

export const SafeBuyProvider = ({ children }) => {
	const web3AccessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFjNjkxYTc1NTFBODU3MzIzMTE2MWZEMzUyMUFEQ0MyNWFEQzIyOWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM2MjY2MzYyMzQsIm5hbWUiOiJWSlRJSGFjayJ9.uy6sLbmvqoxFA6103tzsK-Ga0H_x_M9z_iYDoK4sPp0";
	const web3Storage = new Web3Storage({ token: web3AccessToken });
	const { currentAccount } = useAuth();

	const connectingWithSmartContract = async () => {
		try {
			const web3Modal = new Wenb3Model();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const connectingWithCompanyNFT = async (contractAddress) => {
		try {
			const web3Modal = new Wenb3Model();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchCompanyNFT(contractAddress, signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const registerUser = async (
		userAdd,
		name,
		emailId,
		mobileNo,
		gender,
		age
	) => {
		const contract = await connectingWithSmartContract();
		if (currentAccount) {
			const user = await contract.registerUser(
				userAdd,
				name,
				emailId,
				mobileNo,
				gender,
				age
			);
			console.log(user);
		}
	};

	const fetchUserByAddress = async (userAddress) => {
		const contract = await connectingWithSmartContract();
		const user = await contract.fetchUserByAddress(userAddress);
		console.log(user);
		return user;
	};

	const addProduct = async (contractAddress, name, price) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		await contract.addProduct(name, price);
	};

	const fetchCompanyDetails = async (contractAddress) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchCompanyDetails();
		console.log(data);
		return data;
	};

	const mint = async (
		contractAddress,
		productId,
		manDate,
		exDate,
		pubKey,
		privateKey,
		tokenURI,
		validity
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		await contract.mint(
			productId,
			manDate,
			exDate,
			pubKey,
			privateKey,
			tokenURI,
			validity
		);
	};

	const addBulkProducts = async (
		contractAddress,
		productId,
		pubKeys,
		privateKeys,
		manDate,
		exDate,
		tokenURI,
		validity
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		await contract.addBulkProducts(
			productId,
			pubKeys,
			privateKeys,
			manDate,
			exDate,
			tokenURI,
			validity
		);
	};

	const fetchProdutById = async (contractAddress, productId) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchProdutById(productId);
		return data;
	};

	const fetchAllProductItemsByProductId = async (
		contractAddress,
		productId
	) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchAllProductItemsByProductId(productId);
		return data;
	};

	const fetchProductItemById = async (contractAddress, itemId) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchProductItemById(itemId);
		return data;
	};

	const buyProduct = async (contractAddress, privateKey, tokenURI) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		await contract.fetchProdutById(privateKey, tokenURI);
	};

	const checkState = async (contractAddress, pubKey) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.checkState(pubKey);
		return data;
	};

	const checkIfAlreadyPurchased = async (contractAddress, pubKey) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.checkIfAlreadyPurchased(pubKey);
		return data;
	};

	const fetchUserItems = async (contractAddress) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchUserItems();
		return data;
	};

	const fetchAllItems = async (contractAddress) => {
		const contract = await connectingWithCompanyNFT(contractAddress);
		const data = await contract.fetchAllItems();
		return data;
	};

	return (
		<SafeBuyContext.Provider
			value={{
				connectingWithSmartContract,
				fetchUserByAddress,
				registerUser,
			}}
		>
			{children}
		</SafeBuyContext.Provider>
	);
};
