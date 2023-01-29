import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import styles from "./ProductVerifyPage.module.css";

const ProductVerifyPage = () => {
	const { checkIfWalletConnected, currentAccount } = useAuth();
	const [product, setProduct] = useState([]);
	const [productName, setProductName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [state, setState] = useState(0);

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	useEffect(() => {
		fetchProductItem();
		checkStateOfProductItem();
	}, [currentAccount]);

	const {
		buyProduct,
		fetchProductItemById,
		fetchProductById,
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		checkState,
		fetchProductItemByPublicKey,
	} = useSafeBuyContext();

	const fetchProductItem = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var pubKey = window.location.pathname.split("/")[3];

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);

			const id = await fetchProductItemByPublicKey(
				companyNFTAddress,
				pubKey
			);

			const data = await fetchProductItemById(companyNFTAddress, id);

			const product = await fetchProductById(
				companyNFTAddress,
				data.productId.toNumber()
			);

			const company = await fetchCompanyByAddress(companyAddress);

			var productItem = [
				{
					productName: product.name,
					companyName: company.name,
					cin: company.cin,
					manDate: data.man_date,
					exDate: data.ex_date,
				},
			];
			setProduct(productItem);
			console.log("data", productItem);
		} catch (err) {
			console.log(err);
		}
	});

	const checkStateOfProductItem = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var pubKey = window.location.pathname.split("/")[3];

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);

			const id = await fetchProductItemByPublicKey(
				companyNFTAddress,
				pubKey
			);

			const productItem = await fetchProductItemById(
				companyNFTAddress,
				id
			);

			console.log(productItem);

			const data = await checkState(
				companyNFTAddress,
				productItem.pubKey
			);
			setState(parseInt(data));
			return parseInt(data.toNumber());
		} catch (err) {
			console.log(err);
		}
	});

	// const checkProduct = useCallback(async () => {
	// 	try {
	// 		var companyAddress = window.location.pathname.split("/")[2];
	// 		var privateKey = window.location.pathname.split("/")[3];

	// 		const companyNFTAddress = await fetchCompanyNFTAddress(
	// 			companyAddress
	// 		);

	// 		await buyProduct(
	// 			companyNFTAddress,
	// 			privateKey,
	// 			"0x5506f75ffC8fA955f9A1FF14DD197606e62c8158"
	// 		);
	// 		// (contractAddress, privateKey, tokenURI)
	// 		console.log("Product purchased and Private Key verified");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// });

	return (
		<>
			{state === 0 ? (
				<div className={styles.verifyPageContainer}>
					<div className={styles.verifyContainer}>
						{product.map((item, index) => {
							return (
								<div
									className={styles.verifyContainer}
									key={index}
								>
									<span className={styles.verifyDetails}>
										Product Name:{" "}
										<span className={styles.detailsContent}>
											{item.productName}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Company:{" "}
										<span className={styles.detailsContent}>
											{item.companyName}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Company Identification Number:{" "}
										<span className={styles.detailsContent}>
											{item.cin}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Manufacture Date:{" "}
										<span className={styles.detailsContent}>
											{item.manDate}
										</span>
									</span>
									<span className={styles.verifyDetails}>
										Expiry Date:{" "}
										<span className={styles.detailsContent}>
											{item.exDate}
										</span>
									</span>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<div className={styles.productPurchasedMessage}>The Product is already purchased!</div>
			)}
		</>
	);
};

export default ProductVerifyPage;
