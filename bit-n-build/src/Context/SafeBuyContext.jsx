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

  const registerCompany = async (comAdd, name, cin) => {
    const contract = await connectingWithSmartContract();
    if (currentAccount) {
      const company = await contract.registerCompany(comAdd, name, cin);
      console.log(company);
    }
  };

  const acceptCompany = async (comAdd) => {
    const contract = await connectingWithSmartContract();
    if (currentAccount) {
      await contract.acceptCompany(comAdd);
    }
  };
  const rejectCompany = async (comAdd) => {
    const contract = await connectingWithSmartContract();
    if (currentAccount) {
      await contract.rejectCompany(comAdd);
    }
  };

  const fetchUserByAddress = async (userAddress) => {
    const contract = await connectingWithSmartContract();
    const user = await contract.fetchUserByAddress(userAddress);
    console.log(user);
    return user;
  };
  const fetchCompanyByAddress = async (companyAddress) => {
    const contract = await connectingWithSmartContract();
    const company = await contract.fetchCompanyByAddress(companyAddress);
    console.log(company);
    return company;
  };

  const fetchActiveRequests = async () => {
    const contract = await connectingWithSmartContract();
    const requests = await contract.fetchActiveRequests();
    return requests;
  };

  const fetchAllCompanies = async () => {
    const contract = await connectingWithSmartContract();
    const requests = await contract.fetchAllCompanies();
    return requests;
  };

  const fetchCompanyUsingCIN = async (cin) => {
    const contract = await connectingWithSmartContract();
    const company = await contract.fetchCompanyUsingCIN(cin);
    return company;
  };
  const fetchCompanyNFTAddress = async (companyId) => {
    const contract = await connectingWithSmartContract();
    const company = await contract.fetchCompanyNFTAddress(companyId);
    return company;
  };

  return (
    <SafeBuyContext.Provider
      value={{
        connectingWithSmartContract,
        fetchUserByAddress,
        registerUser,
        registerCompany,
        acceptCompany,
        rejectCompany,
        fetchCompanyByAddress,
        fetchActiveRequests,
        fetchAllCompanies,
        fetchCompanyUsingCIN,
        fetchCompanyNFTAddress,
      }}
    >
      {children}
    </SafeBuyContext.Provider>
  );
};
