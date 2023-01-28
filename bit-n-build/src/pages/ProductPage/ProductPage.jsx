import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
	const navigate = useNavigate();
	const [compData, setCompData] = useState([]);
	const [companyNFTAdd, setCompanyNFTAdd] = useState("");
	const [productDetails, setProductDetails] = useState([]);

	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const {
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		fetchAllProductItemsByProductId,
		fetchProdutById,
	} = useSafeBuyContext();

	const fetchUser = useCallback(async () => {
		try {
			const company = await fetchCompanyByAddress(currentAccount);
			setCompData(company);

			const compNFTAdd = await fetchCompanyNFTAddress();
			setCompanyNFTAdd(compNFTAdd);
		} catch (err) {
			navigate("/registerCompany");
		}
	});

	const fetchProducts = useCallback(async () => {
		const productId = window.location.pathname.split("/")[2];
		const result = await fetchProdutById(companyNFTAdd, productId);
		setProductDetails(result);
		console.log(result);

		const data = await fetchAllProductItemsByProductId(
			companyNFTAdd,
			productId
		);

		console.log(data);
	});
	const productId = window.location.pathname.split("/")[2];

	useEffect(() => {
		if (currentAccount) fetchUser();
		if (companyNFTAdd) fetchProducts();
	}, [currentAccount, companyNFTAdd]);

	const [codesQuantity, setCodesQuantity] = useState(0);
	const [manufDate, setManufDate] = useState();
	const [expiryDate, setExpiryDate] = useState();

	return (
		<div className={styles.productPageContainer}>
			<div className={styles.productPageContent}>
				<div className={styles.detailsBox}>
					<span className={styles.detailsHeading}>
						Product Details
					</span>
					<div className={styles.detailsBoxContent}>
						<span className={styles.key}>Product ID: </span>
						<span className={styles.name}>{productId}</span>
						<span className={styles.key}>Product Name: </span>
						<span className={styles.name}>Airdopes 121 v2</span>
						<span className={styles.key}>MRP: </span>
						<span className={styles.name}>₹3500</span>
						<span className={styles.key}>
							No. of Codes generated:{" "}
						</span>
						<span className={styles.name}>1200</span>
					</div>
				</div>

				<div className={styles.detailsBox}>
					<span className={styles.detailsHeading}>
						Generate New Codes
					</span>
					<div className={styles.genCodeContent}>
						<div className={styles.inputContainer}>
							<label className={styles.inputLabel}>
								Quantity of codes:{" "}
							</label>
							<input
								className={styles.input}
								placeholder="Quantity"
								onChange={(e) =>
									setCodesQuantity(e.target.value)
								}
								value={codesQuantity}
							/>
							<label className={styles.inputLabel}>
								Manufacture Date:{" "}
							</label>
							<input
								className={styles.input}
								type="date"
								onChange={(e) => setManufDate(e.target.value)}
								value={manufDate}
							/>
							<label className={styles.inputLabel}>
								Expiry Date:{" "}
							</label>
							<input
								className={styles.input}
								type="date"
								onChange={(e) => setExpiryDate(e.target.value)}
								value={expiryDate}
							/>
						</div>
						<div>
							<button className={styles.genCodesBtn}>
								Generate Codes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
